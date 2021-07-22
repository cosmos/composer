package rest

import (
	"net/http"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/gorilla/mux"
	clientrest "github.com/cosmos/cosmos-sdk/client/rest"
	"github.com/cosmos/cosmos-sdk/types/rest"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// ProposalRESTHandler defines a REST handler implemented in another module. The
// sub-route is mounted on the admin REST handler.
type ProposalRESTHandler struct {
	SubRoute string
	Handler  func(http.ResponseWriter, *http.Request)
}

func RegisterHandlers(clientCtx client.Context, rtr *mux.Router) {
	r := clientrest.WithHTTPDeprecationHeaders(rtr)
	//registerQueryRoutes(clientCtx, r)
	registerTxHandlers(clientCtx, r)
}

// PostProposalReq defines the properties of a proposal request's body.
type PostProposalReq struct {
	BaseReq        rest.BaseReq   `json:"base_req" yaml:"base_req"`
	Title          string         `json:"title" yaml:"title"`                     // Title of the proposal
	Description    string         `json:"description" yaml:"description"`         // Description of the proposal
	ProposalType   string         `json:"proposal_type" yaml:"proposal_type"`     // Type of proposal. Initial set {PlainTextProposal }
	Proposer       sdk.AccAddress `json:"proposer" yaml:"proposer"`               // Address of the proposer
	InitialDeposit sdk.Coins      `json:"initial_deposit" yaml:"initial_deposit"` // Coins to add to the proposal's deposit
}
