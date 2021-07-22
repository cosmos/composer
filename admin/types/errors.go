package types

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// admin module sentinel errors
var (
	ErrInvalidProposalContent = sdkerrors.Register(ModuleName, 5, "invalid proposal content")
	ErrInvalidProposalType    = sdkerrors.Register(ModuleName, 6, "invalid proposal type")
)
