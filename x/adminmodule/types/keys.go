package types

const (
	// ModuleName defines the module name
	ModuleName = "adminmodule"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey is the message route for slashing
	RouterKey = ModuleName

	// QuerierRoute defines the module's query routing key
	QuerierRoute = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_adminmodule"

	AdminKey = "Admin-"
)

// this line is used by starport scaffolding # ibc/keys/port

// ProposalKey gets a specific proposal from the store
func ToAdminKey(admin string) []byte {
	return append([]byte(AdminKey), []byte(admin)...)
}