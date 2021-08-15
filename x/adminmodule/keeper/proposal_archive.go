package keeper

import (
	"github.com/cosmos/admin-module/x/adminmodule/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) GetArchivedProposals(ctx sdk.Context) []*types.Proposal {
	proposals := make([]*types.Proposal, 0)

	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.ArchiveKey))

	iterator := store.Iterator(nil, nil)
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var proposal types.Proposal

		k.MustUnmarshalProposal(iterator.Value(), &proposal)
		proposals = append(proposals, &proposal)
	}

	return proposals
}

func (k Keeper) AddToArchive(ctx sdk.Context, proposal types.Proposal) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.ArchiveKey))

	bz := k.MustMarshalProposal(proposal)

	store.Set(types.ProposalKey(proposal.ProposalId), bz)
}
