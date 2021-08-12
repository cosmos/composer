package keeper

import (
	"context"
	"fmt"
	"github.com/cosmos/admin-module/x/adminmodule/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) ArchivedProposals(goCtx context.Context, req *types.QueryArchivedProposalsRequest) (*types.QueryArchivedProposalsResponse, error) {
	fmt.Println("~~~in archived proposals req")
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	fmt.Println("~~~~before proposals: ")
	proposals := k.GetArchivedProposals(sdk.UnwrapSDKContext(goCtx))
	fmt.Println("~~~~~got proposals: ", proposals)
	return &types.QueryArchivedProposalsResponse{
		Proposals: proposals,
	}, nil
}
