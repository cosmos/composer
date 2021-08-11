package keeper

import (
	"fmt"
	"github.com/cosmos/admin-module/x/adminmodule/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"time"
)

// SubmitProposal create new proposal given a content
func (k Keeper) SubmitProposal(ctx sdk.Context, content types.Content) (types.Proposal, error) {
	if !k.rtr.HasRoute(content.ProposalRoute()) {
		return types.Proposal{}, sdkerrors.Wrap(types.ErrNoProposalHandlerExists, content.ProposalRoute())
	}

	cacheCtx, _ := ctx.CacheContext()
	handler := k.rtr.GetRoute(content.ProposalRoute())
	if err := handler(cacheCtx, content); err != nil {
		return types.Proposal{}, sdkerrors.Wrap(types.ErrInvalidProposalContent, err.Error())
	}

	proposalID, err := k.GetProposalID(ctx)
	if err != nil {
		return types.Proposal{}, err
	}

	submitTime := ctx.BlockHeader().Time

	proposal, err := types.NewProposal(content, proposalID, submitTime)
	if err != nil {
		return types.Proposal{}, err
	}

	k.SetProposal(ctx, proposal)
	k.InsertActiveProposalQueue(ctx, proposalID, submitTime.Add(2*time.Hour)) // TODO hardcode
	k.SetProposalID(ctx, proposalID+1)

	// TODO submit event?

	return proposal, nil
}

// GetProposalID gets the highest proposal ID
func (k Keeper) GetProposalID(ctx sdk.Context) (proposalID uint64, err error) {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get(types.ProposalIDKey)
	if bz == nil {
		return 0, sdkerrors.Wrap(types.ErrInvalidGenesis, "initial proposal ID hasn't been set")
	}

	proposalID = types.GetProposalIDFromBytes(bz)
	return proposalID, nil
}

// SetProposalID sets the new proposal ID to the store
func (k Keeper) SetProposalID(ctx sdk.Context, proposalID uint64) {
	store := ctx.KVStore(k.storeKey)
	store.Set(types.ProposalIDKey, types.GetProposalIDBytes(proposalID))
}

// SetProposal set a proposal to store
func (k Keeper) SetProposal(ctx sdk.Context, proposal types.Proposal) {
	store := ctx.KVStore(k.storeKey)

	bz := k.MustMarshalProposal(proposal)

	store.Set(types.ProposalKey(proposal.ProposalId), bz)
}

// GetProposal get proposal from store by ProposalID
func (k Keeper) GetProposal(ctx sdk.Context, proposalID uint64) (types.Proposal, bool) {
	store := ctx.KVStore(k.storeKey)

	bz := store.Get(types.ProposalKey(proposalID))
	if bz == nil {
		return types.Proposal{}, false
	}

	var proposal types.Proposal
	k.MustUnmarshalProposal(bz, &proposal)

	return proposal, true
}

// InsertActiveProposalQueue inserts a ProposalID into the active proposal queue at endTime
func (k Keeper) InsertActiveProposalQueue(ctx sdk.Context, proposalID uint64, endTime time.Time) {
	store := ctx.KVStore(k.storeKey)
	store.Set(types.ActiveProposalQueueKey(proposalID, endTime), types.GetProposalIDBytes(proposalID))
}

// RemoveFromActiveProposalQueue removes a proposalID from the Active Proposal Queue
func (k Keeper) RemoveFromActiveProposalQueue(ctx sdk.Context, proposalID uint64, endTime time.Time) {
	store := ctx.KVStore(k.storeKey)
	store.Delete(types.ActiveProposalQueueKey(proposalID, endTime))
}

// IterateActiveProposalsQueue iterates over the proposals in the active proposal queue
// and performs a callback function
func (k Keeper) IterateActiveProposalsQueue(ctx sdk.Context, endTime time.Time, cb func(proposal types.Proposal) (stop bool)) {
	iterator := k.ActiveProposalQueueIterator(ctx, endTime)

	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		proposalID, _ := types.SplitActiveProposalQueueKey(iterator.Key())
		proposal, found := k.GetProposal(ctx, proposalID)
		if !found {
			panic(fmt.Sprintf("proposal %d does not exist", proposalID))
		}

		if cb(proposal) {
			break
		}
	}
}

// ActiveProposalQueueIterator returns an sdk.Iterator for all the proposals in the Active Queue that expire by endTime
func (k Keeper) ActiveProposalQueueIterator(ctx sdk.Context, endTime time.Time) sdk.Iterator {
	store := ctx.KVStore(k.storeKey)
	return store.Iterator(types.ActiveProposalQueuePrefix, sdk.PrefixEndBytes(types.ActiveProposalByTimeKey(endTime)))
}

func (k Keeper) MarshalProposal(proposal types.Proposal) ([]byte, error) {
	bz, err := k.cdc.MarshalBinaryBare(&proposal)
	if err != nil {
		return nil, err
	}
	return bz, nil
}

func (k Keeper) UnmarshalProposal(bz []byte, proposal *types.Proposal) error {
	err := k.cdc.UnmarshalBinaryBare(bz, proposal)
	if err != nil {
		return err
	}
	return nil
}

func (k Keeper) MustMarshalProposal(proposal types.Proposal) []byte {
	bz, err := k.MarshalProposal(proposal)
	if err != nil {
		panic(err)
	}
	return bz
}

func (k Keeper) MustUnmarshalProposal(bz []byte, proposal *types.Proposal) {
	err := k.UnmarshalProposal(bz, proposal)
	if err != nil {
		panic(err)
	}
}