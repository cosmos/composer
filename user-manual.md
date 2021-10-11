# User manual for web interface
Web interface features:
1. Connect to any cosmos sdk based blockchain.
2. Easily submit proposals to gov and admin module.
3. Review the history of sent proposals.
4. Review current state of modules params.
5. Use admin module to submit proposals with instant handling, manage admins list.
6. Use authz interface for granting and revoking permissions.


It has several pages, depending on the modules, that blockchain has connected:
1. Settings - here you can set rest, rpc endpoints, chain id and chain name.
2. Review state - page where modules params are displayed.
3. Proposals - page where history of sent proposals are displayed.
4. Submit proposal - page for the submission of proposals to the gov and admin module.
5. Admin list - list of admins in the admin module, shows only if admin module is connected.
6. Authz - interface for granting and revoking authz permissions, displayed only if authz is connected.


## How to use admin module
To start using admin module's main feature - proposal submission with instant handling, you need to add your address to the admin list.
1. Use CLI - "tx adminmodule add-admin 'your_address' --from alice"
2. Now that your address is in the admin list, you can add and delete new admins from web interface and submit proposals.

Web inteface supports cosmos sdk v0.42 and v0.44
