package keeper

import (
	"context"

	"github.com/cosmos/admin-module/x/adminmodule/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"fmt"
	"github.com/cosmos/cosmos-sdk/store/prefix"
)

func (k msgServer) DeleteAdmin(goCtx context.Context, msg *types.MsgDeleteAdmin) (*types.MsgDeleteAdminResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.AdminKey))

	storeCreator := store.Get(types.ToAdminKey(msg.Creator))
	if storeCreator == nil {
		return nil, fmt.Errorf("requester %s must be admin to delete admins", msg.Creator)
	}

	storeAdmin := store.Get(types.ToAdminKey(msg.Admin))
	if storeAdmin == nil {
		return nil, fmt.Errorf("couldn't find admin '%s'", msg.Admin)
	}

	store.Delete(types.ToAdminKey(msg.Admin))

	return &types.MsgDeleteAdminResponse{}, nil
}
