package types

// NormalizeProposalType - normalize user specified proposal type
func NormalizeProposalType(proposalType string) string {
	switch proposalType {
	case "Text", "text":
		return ProposalTypeText

	default:
		return ""
	}
}
