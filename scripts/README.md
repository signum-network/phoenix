# Phoenix Development Scripts

This project provides useful scripts for development

> Work in progress

---

- [build](#build) - Build for different targets
- [version](#version) - Bump version

---

## <a name="build"></a> build

This script helps to build the wallet for different targets

_Example_

`node build --target desktop` or
`node build --t desktop` 

Valid targets are:

- web (default)
- desktop
- ios (not implemented yet)
- android (not implemented yet)


For more information call:

`node build --help`


## <a name="version"></a> version

This script bumps the version number into the code for different targets

_Example_

`node version --target ng` or
`node version --t desktop` 

Valid targets are:

- ng (default)
- ios (not implemented yet)
- android (not implemented yet)


For more information call:

`node version --help`

