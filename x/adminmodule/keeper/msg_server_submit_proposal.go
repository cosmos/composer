package keeper

import (
	"context"

	"github.com/cosmos/admin-module/x/adminmodule/types"
	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) SubmitProposal(goCtx context.Context, msg *types.MsgSubmitProposal) (*types.MsgSubmitProposalResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	proposal, err := k.Keeper.SubmitProposal(ctx, msg.GetContent())
	if err != nil {
		return nil, err
	}

	defer telemetry.IncrCounter(1, types.ModuleName, "proposal")

	// TODO event?

	return &types.MsgSubmitProposalResponse{
		ProposalId: proposal.ProposalId,
	}, nil
}
