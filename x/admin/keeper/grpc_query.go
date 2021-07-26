package keeper

import (
	"github.com/cosmos/admin-module/x/admin/types"
)

var _ types.QueryServer = Keeper{}
