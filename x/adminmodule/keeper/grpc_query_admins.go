package keeper

import (
	"context"

	"github.com/cosmos/admin-module/x/adminmodule/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"github.com/cosmos/cosmos-sdk/store/prefix"
)

func (k Keeper) Admins(goCtx context.Context, req *types.QueryAdminsRequest) (*types.QueryAdminsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	admins := make([]string, 0)
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.AdminKey))

	iterator := sdk.KVStorePrefixIterator(store, []byte(types.ModuleName))
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		admins = append(admins, string(iterator.Value()))
	}

	return &types.QueryAdminsResponse{
		Admins: admins,
	}, nil
}
