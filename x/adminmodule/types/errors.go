package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/adminmodule module sentinel errors
var (
	ErrInvalidProposalContent  = sdkerrors.Register(ModuleName, 5, "invalid proposal content")
	ErrInvalidProposalType     = sdkerrors.Register(ModuleName, 6, "invalid proposal type")
	ErrNoProposalHandlerExists = sdkerrors.Register(ModuleName, 9, "no handler exists for proposal type")
	ErrInvalidGenesis          = sdkerrors.Register(ModuleName, 8, "invalid genesis state")
	// this line is used by starport scaffolding # ibc/errors
)
