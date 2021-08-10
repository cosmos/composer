package keeper_test

import (
	"fmt"
	"testing"

	"github.com/cosmos/admin-module/x/adminmodule/keeper"
	"github.com/cosmos/admin-module/x/adminmodule/types"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/store"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/libs/log"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	tmdb "github.com/tendermint/tm-db"
)

func setupKeeper(t testing.TB) (*keeper.Keeper, sdk.Context) {
	// fmt.Println("In keeper setup")
	storeKey := sdk.NewKVStoreKey(types.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)

	// TODO Add routes, no handlers now
	rtr := types.NewRouter()
	// fmt.Println(storeKey)
	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
	stateStore.MountStoreWithDB(storeKey, sdk.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, sdk.StoreTypeMemory, nil)
	require.NoError(t, stateStore.LoadLatestVersion())

	registry := codectypes.NewInterfaceRegistry()
	k := keeper.NewKeeper(
		codec.NewProtoCodec(registry),
		storeKey,
		memStoreKey,
		rtr,
	)
	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, log.NewNopLogger())
	return k, ctx
}

// Using for setting admins before tests
func InitTestAdmins(k *keeper.Keeper, ctx sdk.Context, genesisAdmins []string) error {
	// Removing old admins
	oldAdmins := k.GetAdmins(ctx)
	for _, admin := range oldAdmins {
		err := k.RemoveAdmin(ctx, admin)
		if err != nil {
			return fmt.Errorf("Error removing admin %s\n, error: %s", admin, err)
		}
	}

	// Setting new admins
	for _, admin := range genesisAdmins {
		k.SetAdmin(ctx, admin)
	}
	return nil
}
