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
	// this line is used by starport scaffolding # 3
}

// RegisterProposalTypeCodec registers an external proposal content type defined
// in another module for the internal ModuleCdc. This allows the MsgSubmitProposal
// to be correctly Amino encoded and decoded.
//
// NOTE: This should only be used for applications that are still using a concrete
// Amino codec for serialization.
func RegisterProposalTypeCodec(o interface{}, name string) {
	amino.RegisterConcrete(o, name, nil)
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
