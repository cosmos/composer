package rest

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/types/rest"
	acutils "github.com/cosmos/admin-module/admin/client/utils"
	"github.com/cosmos/admin-module/admin/types"
)

func registerTxHandlers(clientCtx client.Context, r *mux.Router) {
	r.HandleFunc("/admin/proposals", newPostProposalHandlerFn(clientCtx)).Methods("POST")
	//r.HandleFunc(fmt.Sprintf("/gov/proposals/{%s}/deposits", RestProposalID), newDepositHandlerFn(clientCtx)).Methods("POST")
	//r.HandleFunc(fmt.Sprintf("/gov/proposals/{%s}/votes", RestProposalID), newVoteHandlerFn(clientCtx)).Methods("POST")
}

func newPostProposalHandlerFn(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req PostProposalReq
		if !rest.ReadRESTReq(w, r, clientCtx.LegacyAmino, &req) {
			return
		}

		req.BaseReq = req.BaseReq.Sanitize()
		if !req.BaseReq.ValidateBasic(w) {
			return
		}

		proposalType := acutils.NormalizeProposalType(req.ProposalType)
		content := types.ContentFromProposalType(req.Title, req.Description, proposalType)

		msg, err := types.NewMsgSubmitProposal(content, req.InitialDeposit, req.Proposer)
		if rest.CheckBadRequestError(w, err) {
			return
		}
		if rest.CheckBadRequestError(w, msg.ValidateBasic()) {
			return
		}

		tx.WriteGeneratedTxResponse(clientCtx, w, req.BaseReq, msg)
	}
}
