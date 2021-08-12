package keeper_test

import (
	"errors"
	"strings"
	"testing"

	"github.com/cosmos/admin-module/x/adminmodule/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

var TestProposal = types.NewTextProposal("Test", "description")

type invalidProposalRoute struct{ types.TextProposal }

func (invalidProposalRoute) ProposalRoute() string { return "nonexistingroute" }

func TestGetSetProposal(t *testing.T) {
	_, ctx, keeper := setupMsgServer(t)

	// Init genesis ProposalID
	keeper.SetProposalID(sdk.UnwrapSDKContext(ctx), 1)

	tp := TestProposal
	proposal, err := keeper.SubmitProposal(sdk.UnwrapSDKContext(ctx), tp)
	require.NoError(t, err)
	proposalID := proposal.ProposalId
	keeper.SetProposal(sdk.UnwrapSDKContext(ctx), proposal)

	gotProposal, ok := keeper.GetProposal(sdk.UnwrapSDKContext(ctx), proposalID)
	require.True(t, ok)
	require.True(t, proposal.Equal(gotProposal))
}

func TestSubmitProposal(t *testing.T) {
	_, ctx, keeper := setupMsgServer(t)

	// Init genesis ProposalID
	keeper.SetProposalID(sdk.UnwrapSDKContext(ctx), 1)

	testCases := []struct {
		content     types.Content
		expectedErr error
	}{
		{&types.TextProposal{Title: "title", Description: "description"}, nil},
		// Keeper does not check the validity of title and description, no error
		{&types.TextProposal{Title: "", Description: "description"}, nil},
		{&types.TextProposal{Title: strings.Repeat("1234567890", 100), Description: "description"}, nil},
		{&types.TextProposal{Title: "title", Description: ""}, nil},
		{&types.TextProposal{Title: "title", Description: strings.Repeat("1234567890", 1000)}, nil},
		// error only when invalid route
		{&invalidProposalRoute{}, types.ErrNoProposalHandlerExists},
	}

	for i, tc := range testCases {
		_, err := keeper.SubmitProposal(sdk.UnwrapSDKContext(ctx), tc.content)
		require.True(t, errors.Is(tc.expectedErr, err), "tc #%d; got: %v, expected: %v", i, err, tc.expectedErr)
	}
}
