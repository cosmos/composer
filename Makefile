MONIKER=adminmoduletest1
CHAIN_ID=adminmodule
CHAIN_HOME=~/.admin-module
STARPORT_VERSION=0.17.1

.PHONY: .get-starport
.get-starport:
	[ -f bin/starport ] || $$(curl -LO https://github.com/tendermint/starport/releases/download/v0.17.1/starport_$(STARPORT_VERSION)_linux_amd64.tar.gz && tar -xzf starport_$(STARPORT_VERSION)_linux_amd64.tar.gz starport && mv starport bin/ && chmod +x bin/starport && rm starport_$(STARPORT_VERSION)_linux_amd64.tar.gz)

.PHONY: build
build:
	go build -o bin/admin-moduled cmd/admin-moduled/main.go

.PHONY: generate
generate: .get-starport
	bin/starport generate proto-go && bin/starport generate openapi

.PHONY: test
test:
	go test ./...

.PHONY: local-clean
local-clean:
	rm -rf $(CHAIN_HOME)

.PHONY: local-init
local-init:
	bin/admin-moduled init $(MONIKER) --chain-id $(CHAIN_ID) --home $(CHAIN_HOME)
	bin/admin-moduled keys add alice --home $(CHAIN_HOME)
	bin/admin-moduled keys add bob --home $(CHAIN_HOME)
	bin/admin-moduled add-genesis-account alice 10000000000000000000000001stake --home $(CHAIN_HOME)
	bin/admin-moduled gentx alice 1000000000stake --chain-id $(CHAIN_ID) --home $(CHAIN_HOME)
	bin/admin-moduled collect-gentxs --home $(CHAIN_HOME)
	sed -i "s/prometheus = false/prometheus = true/" $(CHAIN_HOME)/config/config.toml
	cat $(CHAIN_HOME)/config/app.toml | tr '\n' '\r' | sed "s/# Enable defines if the API server should be enabled.\renable = false/# Enable defines if the API server should be enabled.\renable = true/" | tr '\r' '\n' > /tmp/app.toml.tmp && mv /tmp/app.toml.tmp $(CHAIN_HOME)/config/app.toml
	sed -i "s/swagger = false/swagger = true/" $(CHAIN_HOME)/config/app.toml
	jq '.app_state.adminmodule.admins[0] = .app_state.auth.accounts[0].address' $(CHAIN_HOME)/config/genesis.json > /tmp/genesis.json.tmp && mv /tmp/genesis.json.tmp $(CHAIN_HOME)/config/genesis.json

.PHONY: local-start
local-start:
	bin/admin-moduled start --home $(CHAIN_HOME)