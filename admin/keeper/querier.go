package keeper

import (
	abci "github.com/tendermint/tendermint/abci/types"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// NewQuerier creates a new gov Querier instance
func NewQuerier(keeper Keeper, legacyQuerierCdc *codec.LegacyAmino) sdk.Querier {
	return func(ctx sdk.Context, path []string, req abci.RequestQuery) ([]byte, error) {
		switch path[0] {

		//case types.QueryProposals:
		//	return queryProposals(ctx, path[1:], req, keeper, legacyQuerierCdc)
		//
		//case types.QueryProposal:
		//	return queryProposal(ctx, path[1:], req, keeper, legacyQuerierCdc)

		default:
			return nil, sdkerrors.Wrapf(sdkerrors.ErrUnknownRequest, "unknown query path: %s", path[0])
		}
	}
}

//
//// nolint: unparam
//func queryProposal(ctx sdk.Context, path []string, req abci.RequestQuery, keeper Keeper, legacyQuerierCdc *codec.LegacyAmino) ([]byte, error) {
//	var params types.QueryProposalParams
//	err := legacyQuerierCdc.UnmarshalJSON(req.Data, &params)
//	if err != nil {
//		return nil, sdkerrors.Wrap(sdkerrors.ErrJSONUnmarshal, err.Error())
//	}
//
//	proposal, ok := keeper.GetProposal(ctx, params.ProposalID)
//	if !ok {
//		return nil, sdkerrors.Wrapf(types.ErrUnknownProposal, "%d", params.ProposalID)
//	}
//
//	bz, err := codec.MarshalJSONIndent(legacyQuerierCdc, proposal)
//	if err != nil {
//		return nil, sdkerrors.Wrap(sdkerrors.ErrJSONMarshal, err.Error())
//	}
//
//	return bz, nil
//}
//
//func queryProposals(ctx sdk.Context, _ []string, req abci.RequestQuery, keeper Keeper, legacyQuerierCdc *codec.LegacyAmino) ([]byte, error) {
//	var params types.QueryProposalsParams
//	err := legacyQuerierCdc.UnmarshalJSON(req.Data, &params)
//	if err != nil {
//		return nil, sdkerrors.Wrap(sdkerrors.ErrJSONUnmarshal, err.Error())
//	}
//
//	proposals := keeper.GetProposalsFiltered(ctx, params)
//	if proposals == nil {
//		proposals = types.Proposals{}
//	}
//
//	bz, err := codec.MarshalJSONIndent(legacyQuerierCdc, proposals)
//	if err != nil {
//		return nil, sdkerrors.Wrap(sdkerrors.ErrJSONMarshal, err.Error())
//	}
//
//	return bz, nil
//}
