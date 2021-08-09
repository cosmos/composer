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

	cdc.RegisterConcrete(&TextProposal{}, "adminmodule/TextProposal", nil)

}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	// this line is used by starport scaffolding # 3
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgDeleteAdmin{},
		&MsgAddAdmin{},
		&MsgSubmitProposal{},
	)

	registry.RegisterInterface(
		"cosmos.adminmodule.adminmodule.Content",
		(*Content)(nil),
		&TextProposal{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
	//ModuleCdc = codec.NewAminoCodec(amino)
)

//func init() {
//	RegisterCodec(amino)
//	cryptocodec.RegisterCrypto(amino)
//}
