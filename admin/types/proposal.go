package types

import "gopkg.in/yaml.v2"

// ContentFromProposalType returns a Content object based on the proposal type.
func ContentFromProposalType(title, desc, ty string) Content {
	switch ty {
	case ProposalTypeText:
		return NewTextProposal(title, desc)

	default:
		return nil
	}
}

var validProposalTypes = map[string]struct{}{
	ProposalTypeText: {},
}

// IsValidProposalType returns a boolean determining if the proposal type is
// valid.
//
// NOTE: Modules with their own proposal types must register them.
func IsValidProposalType(ty string) bool {
	_, ok := validProposalTypes[ty]
	return ok
}

// Proposal types
const (
	ProposalTypeText string = "Text"
)

// Implements Content Interface
var _ Content = &TextProposal{}

// NewTextProposal creates a text proposal Content
func NewTextProposal(title, description string) Content {
	return &TextProposal{title, description}
}

// GetTitle returns the proposal title
func (tp *TextProposal) GetTitle() string { return tp.Title }

// GetDescription returns the proposal description
func (tp *TextProposal) GetDescription() string { return tp.Description }

// ProposalRoute returns the proposal router key
func (tp *TextProposal) ProposalRoute() string { return RouterKey }

// ProposalType is "Text"
func (tp *TextProposal) ProposalType() string { return ProposalTypeText }

// ValidateBasic validates the content's title and description of the proposal
func (tp *TextProposal) ValidateBasic() error { return ValidateAbstract(tp) }

// String implements Stringer interface
func (tp TextProposal) String() string {
	out, _ := yaml.Marshal(tp)
	return string(out)
}
