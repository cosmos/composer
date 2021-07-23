package admin

import (
	"github.com/cosmos/cosmos-sdk/types/module"
	//"github.com/cosmos/cosmos-sdk/codec"
	//govclient "github.com/cosmos/cosmos-sdk/x/gov/client"
	//"encoding/json"
	//"github.com/cosmos/cosmos-sdk/client"
	//"fmt"
	//"github.com/gorilla/mux"
	//"github.com/grpc-ecosystem/grpc-gateway/runtime"
	//"github.com/spf13/cobra"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	//sdk "github.com/cosmos/cosmos-sdk/types"
	//abci "github.com/tendermint/tendermint/abci/types"
	//simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"encoding/json"
	"github.com/cosmos/admin-module/admin/client/cli"
	"github.com/cosmos/admin-module/admin/client/rest"
	"github.com/cosmos/admin-module/admin/keeper"
	"github.com/cosmos/admin-module/admin/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gorilla/mux"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/spf13/cobra"
	abci "github.com/tendermint/tendermint/abci/types"
)

//
//// DONTCOVER
//
//import (
//	"context"
//	"encoding/json"
//	"fmt"
//	"math/rand"
//
//	"github.com/grpc-ecosystem/grpc-gateway/runtime"
//
//	"github.com/gorilla/mux"
//	"github.com/spf13/cobra"
//
//	abci "github.com/tendermint/tendermint/abci/types"
//
//	"github.com/cosmos/cosmos-sdk/client"
//	"github.com/cosmos/cosmos-sdk/codec"
//	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
//	sdk "github.com/cosmos/cosmos-sdk/types"
//	"github.com/cosmos/cosmos-sdk/types/module"
//	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
//	govclient "github.com/cosmos/cosmos-sdk/x/gov/client"
//	"github.com/cosmos/cosmos-sdk/x/gov/client/cli"
//	"github.com/cosmos/cosmos-sdk/x/gov/client/rest"
//	"github.com/cosmos/cosmos-sdk/x/gov/keeper"
//	"github.com/cosmos/cosmos-sdk/x/gov/simulation"
//	"github.com/cosmos/cosmos-sdk/x/gov/types"
//)

var (
	_ module.AppModule      = AppModule{}
	_ module.AppModuleBasic = AppModuleBasic{}
	//_ module.AppModuleSimulation = AppModule{} // TODO simulation
)

// AppModuleBasic defines the basic application module used by the gov module.
type AppModuleBasic struct {
	cdc codec.Codec
}

// NewAppModuleBasic creates a new AppModuleBasic object
func NewAppModuleBasic() AppModuleBasic {
	return AppModuleBasic{}
}

// Name returns the gov module's name.
func (AppModuleBasic) Name() string {
	return types.ModuleName
}

// RegisterLegacyAminoCodec registers the gov module's types for the given codec.
func (AppModuleBasic) RegisterLegacyAminoCodec(cdc *codec.LegacyAmino) {
	// TODO - register all module types
	//types.RegisterLegacyAminoCodec(cdc)
}

// DefaultGenesis returns default genesis state as raw bytes for the gov
// module.
func (AppModuleBasic) DefaultGenesis(cdc codec.JSONCodec) json.RawMessage {
	// TODO - what is the default state of admin module?
	//return cdc.MustMarshalJSON(types.DefaultGenesisState())
	return json.RawMessage{}
}

// ValidateGenesis performs genesis state validation for the gov module.
func (AppModuleBasic) ValidateGenesis(cdc codec.JSONCodec, config client.TxEncodingConfig, bz json.RawMessage) error {
	// TODO - what is default state? How to validate it?
	//var data types.GenesisState
	//if err := cdc.UnmarshalJSON(bz, &data); err != nil {
	//	return fmt.Errorf("failed to unmarshal %s genesis state: %w", types.ModuleName, err)
	//}
	//
	//return types.ValidateGenesis(&data)
	return nil
}

// RegisterRESTRoutes registers the REST routes for the gov module.
func (a AppModuleBasic) RegisterRESTRoutes(clientCtx client.Context, rtr *mux.Router) {
	rest.RegisterHandlers(clientCtx, rtr)
}

// RegisterGRPCGatewayRoutes registers the gRPC Gateway routes for the gov module.
func (a AppModuleBasic) RegisterGRPCGatewayRoutes(clientCtx client.Context, mux *runtime.ServeMux) {
	// TODO gen from proto and register
	//types.RegisterQueryHandlerClient(context.Background(), mux, types.NewQueryClient(clientCtx))
}

// GetTxCmd returns the root tx command for the gov module.
func (a AppModuleBasic) GetTxCmd() *cobra.Command {
	return cli.NewTxCmd()
}

// GetQueryCmd returns the root query command for the gov module.
func (AppModuleBasic) GetQueryCmd() *cobra.Command {
	return cli.GetQueryCmd()
}

// RegisterInterfaces implements InterfaceModule.RegisterInterfaces
func (a AppModuleBasic) RegisterInterfaces(registry codectypes.InterfaceRegistry) {
	types.RegisterInterfaces(registry)
}

// ____________________________________________________________________________

// AppModule implements an application module for the gov module.
type AppModule struct {
	AppModuleBasic

	keeper        keeper.Keeper
	accountKeeper types.AccountKeeper
	bankKeeper    types.BankKeeper
}

// NewAppModule creates a new AppModule object
func NewAppModule(cdc codec.Codec, keeper keeper.Keeper, ak types.AccountKeeper, bk types.BankKeeper) AppModule {
	return AppModule{
		AppModuleBasic: AppModuleBasic{cdc: cdc},
		keeper:         keeper,
		accountKeeper:  ak,
		bankKeeper:     bk,
	}
}

// Name returns the gov module's name.
func (AppModule) Name() string {
	return types.ModuleName
}

// RegisterInvariants registers module invariants
func (am AppModule) RegisterInvariants(ir sdk.InvariantRegistry) {
	// TODO register routes
	//keeper.RegisterInvariants(ir, am.keeper, am.bankKeeper)
}

// Route returns the message routing key for the gov module.
func (am AppModule) Route() sdk.Route {
	return sdk.NewRoute(types.RouterKey, NewHandler(am.keeper))
}

// QuerierRoute returns the gov module's querier route name.
func (AppModule) QuerierRoute() string {
	return types.QuerierRoute
}

// LegacyQuerierHandler returns no sdk.Querier.
func (am AppModule) LegacyQuerierHandler(legacyQuerierCdc *codec.LegacyAmino) sdk.Querier {
	return keeper.NewQuerier(am.keeper, legacyQuerierCdc)
}

// RegisterServices registers module services.
func (am AppModule) RegisterServices(cfg module.Configurator) {
	//types.RegisterMsgServer(cfg.MsgServer(), keeper.NewMsgServerImpl(am.keeper))
	// TODO get from proto
	//types.RegisterQueryServer(cfg.QueryServer(), am.keeper)
}

// InitGenesis performs genesis initialization for the gov module. It returns
// no validator updates.
func (am AppModule) InitGenesis(ctx sdk.Context, cdc codec.JSONCodec, data json.RawMessage) []abci.ValidatorUpdate {
	//var genesisState types.GenesisState
	//cdc.MustUnmarshalJSON(data, &genesisState)
	//InitGenesis(ctx, am.accountKeeper, am.bankKeeper, am.keeper, &genesisState)
	// TODO state?
	return []abci.ValidatorUpdate{}
}

// ExportGenesis returns the exported genesis state as raw bytes for the gov
// module.
func (am AppModule) ExportGenesis(ctx sdk.Context, cdc codec.JSONCodec) json.RawMessage {
	//gs := ExportGenesis(ctx, am.keeper)
	//return cdc.MustMarshalJSON(gs)
	// TODO state?
	return json.RawMessage{}
}

// ConsensusVersion implements AppModule/ConsensusVersion.
func (AppModule) ConsensusVersion() uint64 { return 2 }

// BeginBlock performs a no-op.
func (AppModule) BeginBlock(_ sdk.Context, _ abci.RequestBeginBlock) {}

// EndBlock returns the end blocker for the gov module. It returns no validator
// updates.
func (am AppModule) EndBlock(ctx sdk.Context, _ abci.RequestEndBlock) []abci.ValidatorUpdate {
	//EndBlocker(ctx, am.keeper)
	return []abci.ValidatorUpdate{}
}

// ____________________________________________________________________________

// AppModuleSimulation functions
//
//// GenerateGenesisState creates a randomized GenState of the gov module.
//func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
//	simulation.RandomizedGenState(simState)
//}
//
//// ProposalContents returns all the gov content functions used to
//// simulate governance proposals.
//func (AppModule) ProposalContents(simState module.SimulationState) []simtypes.WeightedProposalContent {
//	return simulation.ProposalContents()
//}
//
//// RandomizedParams creates randomized gov param changes for the simulator.
//func (AppModule) RandomizedParams(r *rand.Rand) []simtypes.ParamChange {
//	return simulation.ParamChanges(r)
//}
//
//// RegisterStoreDecoder registers a decoder for gov module's types
//func (am AppModule) RegisterStoreDecoder(sdr sdk.StoreDecoderRegistry) {
//	sdr[types.StoreKey] = simulation.NewDecodeStore(am.cdc)
//}
//
//// WeightedOperations returns the all the gov module operations with their respective weights.
//func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
//	return simulation.WeightedOperations(
//		simState.AppParams, simState.Cdc,
//		am.accountKeeper, am.bankKeeper, am.keeper, simState.Contents,
//	)
//}
