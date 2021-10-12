# User manual for web interface
Web interface features:
1. Connect to any cosmos-sdk-based blockchain.
2. Easily submit proposals to gov and admin modules.
3. Review the history of sent proposals.
4. Review current state of modules' params.
5. Use admin module to submit proposals with instant handling, manage admins list.
6. Use authz interface for granting and revoking permissions.


It has several pages, depending on the modules, that blockchain has connected:

1. Settings - here you can set rest, rpc endpoints, chain id and chain name.
![selection(2)](https://user-images.githubusercontent.com/37986442/136917740-a30fe533-09ff-4985-a142-2bc848618a3b.png)
2. Review state - page where modules params are displayed.
![selection(3)](https://user-images.githubusercontent.com/37986442/136917964-c6ea3ad4-6a98-43d4-ae6e-dfd59b29430e.png)
3. Proposals - page where history of sent proposals are displayed, use the module switch to select module to fetch proposals history.
![selection(9)](https://user-images.githubusercontent.com/37986442/136929467-61eb4ed8-b278-40ba-bbbb-7a66c7704b1e.png)
4. Submit proposal - page for submission proposals to the gov and admin modules, use the switch to select the module for submission.
![selection(7)](https://user-images.githubusercontent.com/37986442/136922335-6ba052a3-4b37-413b-9da5-451d69f167c9.png)
5. Admin list - list of admins in the admin module, displayed only if the admin module is connected.
![selection(6)](https://user-images.githubusercontent.com/37986442/136920566-74603e55-056c-4ed2-8e70-f69033730c30.png)
6. Authz - interface for granting and revoking authz permissions, displayed only if authz is connected.
![selection(5)](https://user-images.githubusercontent.com/37986442/136918389-ec53112e-b203-4130-ae9d-93851dd6e1e6.png)



## How to use admin module
To start using admin module's main feature - proposal submission with instant handling, you need to add your address to the admin list.
1. Use CLI - "tx adminmodule add-admin 'your_address' --from alice"
2. When your address is in the admin list, you can add and delete new admins from web interface and submit proposals.

Web inteface supports Cosmos SDK v0.42 and v0.44
