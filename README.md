# admin
**admin** is a blockchain built using Cosmos SDK and Tendermint and created with [Starport](https://github.com/tendermint/starport/releases/tag/v0.17.0) `v0.17.0`.

## Development, features
### start (variant 1)
- `make build`
- `make local-clean`  
- `make local-init`
- `make local-start`

### start (variant 2)
- `make .get-starport`
- `make local-clean`
- `make local-keys`
- `bin/starport chain serve -v -c config.yml`

### scenarios
- `curl -X GET "http://localhost:1317/cosmos/adminmodule/adminmodule/admins" -H  "accept: application/json"`
- `bin/admin-moduled keys list --home ~/.adminmodule` - list of local users
- `bin/admin-moduled tx adminmodule add-admin cosmos13juzz4zxk9l7ajp7ns7vgg2n02fgmue7sz8mty --from cosmos17grwgm99ervyntfq2hva3s02760c5m6qjdzga6 --chain-id adminmoduleteshchain1 --home ~/.adminmodule`
- `bin/admin-moduled tx adminmodule delete-admin cosmos13juzz4zxk9l7ajp7ns7vgg2n02fgmue7sz8mty --from cosmos17grwgm99ervyntfq2hva3s02760c5m6qjdzga6 --chain-id adminmoduleteshchain1 --home ~/.adminmodule`

## Get started

```
cp config_local.yml.example config_local.yml
starport chain serve --home ~/.adminmodule --config config_local.yml 
```

`serve` command installs dependencies, builds, initializes, and starts your blockchain in development.

### Configure

Your blockchain in development can be configured with `config.yml`. To learn more, see the [Starport docs](https://docs.starport.network).

### Launch

To launch your blockchain live on multiple nodes, use `starport network` commands. Learn more about [Starport Network](https://github.com/tendermint/spn).

### Web Frontend

Starport has scaffolded a Vue.js-based web app in the `vue` directory. Run the following commands to install dependencies and start the app:

```
cd vue
npm install
npm run serve
```

The frontend app is built using the `@starport/vue` and `@starport/vuex` packages. For details, see the [monorepo for Starport front-end development](https://github.com/tendermint/vue).

## Release
To release a new version of your blockchain, create and push a new tag with `v` prefix. A new draft release with the configured targets will be created.

```
git tag v0.1
git push origin v0.1
```

After a draft release is created, make your final changes from the release page and publish it.

### Install
To install the latest version of your blockchain node's binary, execute the following command on your machine:

```
curl https://get.starport.network/cosmos/admin-module@latest! | sudo bash
```
`cosmos/admin-module` should match the `username` and `repo_name` of the Github repository to which the source code was pushed. Learn more about [the install process](https://github.com/allinbits/starport-installer).

## Learn more

- [Starport](https://github.com/tendermint/starport)
- [Starport Docs](https://docs.starport.network)
- [Cosmos SDK documentation](https://docs.cosmos.network)
- [Cosmos SDK Tutorials](https://tutorials.cosmos.network)
- [Discord](https://discord.gg/W8trcGV)
