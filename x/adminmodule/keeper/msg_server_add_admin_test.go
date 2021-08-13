package keeper_test

import (
	"testing"

	"github.com/cosmos/admin-module/x/adminmodule/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

func TestAddAdmin(t *testing.T) {
	msgServer, ctx, keeper := setupMsgServer(t)

	var (
		req          *types.QueryAdminsRequest
		initialAdmin = "cosmos1zwlgx3kxcykszdxrk2gvrrfzchlqzfc59kx3p0"
	)

	testCases := []struct {
		msg     string
		test    func()
		expPass bool
		expRes  []string
	}{
		{
			"empty admin address",
			func() {
				req = &types.QueryAdminsRequest{}

				initErr := InitTestAdmins(keeper, sdk.UnwrapSDKContext(ctx), []string{initialAdmin})
				if initErr != nil {
					t.Errorf("Error initializing admins: %s\n", initErr)
				}

				newAdmin := ""
				newAdminMsg := &types.MsgAddAdmin{Creator: initialAdmin, Admin: newAdmin}
				err := newAdminMsg.ValidateBasic()
				require.Error(t, err)
			},
			false,
			[]string{"cosmos1zwlgx3kxcykszdxrk2gvrrfzchlqzfc59kx3p0"},
		},
		{
			"invalid admin address",
			func() {
				req = &types.QueryAdminsRequest{}

				initErr := InitTestAdmins(keeper, sdk.UnwrapSDKContext(ctx), []string{initialAdmin})
				if initErr != nil {
					t.Errorf("Error initializing admins: %s\n", initErr)
				}

				newAdmin := "invalid admin"
				newAdminMsg := &types.MsgAddAdmin{Creator: initialAdmin, Admin: newAdmin}
				err := newAdminMsg.ValidateBasic()
				require.Error(t, err)
			},
			false,
			[]string{"cosmos1zwlgx3kxcykszdxrk2gvrrfzchlqzfc59kx3p0"},
		},
		{
			"valid request",
			func() {
				req = &types.QueryAdminsRequest{}

				initErr := InitTestAdmins(keeper, sdk.UnwrapSDKContext(ctx), []string{initialAdmin})
				if initErr != nil {
					t.Errorf("Error initializing admins: %s\n", initErr)
				}

				newAdmin := "cosmos103laf9z2fv69r0q30pf2swfr09nfdszy88sm87"
				newAdminMsg := &types.MsgAddAdmin{Creator: initialAdmin, Admin: newAdmin}
				err := newAdminMsg.ValidateBasic()
				require.NoError(t, err)

				// Actual add admin msg function
				_, err = msgServer.AddAdmin(ctx, newAdminMsg)
				require.NoError(t, err)
			},
			true,
			[]string{"cosmos103laf9z2fv69r0q30pf2swfr09nfdszy88sm87", "cosmos1zwlgx3kxcykszdxrk2gvrrfzchlqzfc59kx3p0"},
		},
	}

	for _, testCase := range testCases {
		testCase.test()

		admins, _ := keeper.Admins(ctx, req)
		require.Equal(t, testCase.expRes, admins.GetAdmins())
	}
}
