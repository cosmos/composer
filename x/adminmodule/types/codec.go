package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	// this line is used by starport scaffolding # 2
	cdc.RegisterConcrete(&MsgDeleteAdmin{}, "adminmodule/DeleteAdmin", nil)

	cdc.RegisterConcrete(&MsgAddAdmin{}, "adminmodule/AddAdmin", nil)

	cdc.RegisterConcrete(&MsgSubmitProposal{}, "adminmodule/SubmitProposal", nil)
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgDeleteAdmin{},
		&MsgAddAdmin{},
		&MsgSubmitProposal{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
	// this line is used by starport scaffolding # 3
}

var (
	//amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
	//ModuleCdc = codec.NewAminoCodec(amino)
)

//func init() {
//	RegisterCodec(amino)
//	cryptocodec.RegisterCrypto(amino)
//}
