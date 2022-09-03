# Risky Generators
CLI for generating risky buisiness faster.

## Instalation
(not published yet)

1) pull git repo
2) run `npm install` in root to get deps
3) run `npm link` in root to add symlinks for the commands to your shell.

## Commands

### `mkass`
Creates a standard assembly structure, with runtime, editor and test assemblies

Takes two parameters, a prefix/project name to use, and a assembly name.

See [Template](AssemblyDirGenerator\{NAME}) dir structure for details. 

#### example usage

``` bash
mkass MyAwesomeProject PotatoSystem
```

#### example output
```
│   PotatoSystem.meta
│
└───PotatoSystem
    │   Editor.meta
    │   Runtime.meta
    │   Tests.meta
    │
    ├───Editor
    │       MyAwesomeProject.PotatoSystem.Editor.asmdef
    │       MyAwesomeProject.PotatoSystem.Editor.asmdef.meta
    │
    ├───Runtime
    │   │   AssemblyAttrs.cs
    │   │   AssemblyAttrs.cs.meta
    │   │   Components.meta
    │   │   Installers.meta
    │   │   MyAwesomeProject.PotatoSystem.asmdef
    │   │   MyAwesomeProject.PotatoSystem.asmdef.meta
    │   │   package.json
    │   │   package.json.meta
    │   │   README.md
    │   │   README.md.meta
    │   │   Services.meta
    │   │
    │   ├───Components
    │   ├───Installers
    │   │       PotatoSystemInstaller.cs
    │   │       PotatoSystemInstaller.cs.meta
    │   │
    │   └───Services
    └───Tests
        │   EditMode.meta
        │   PlayMode.meta
        │
        ├───EditMode
        │       MyAwesomeProject.PotatoSystem.Tests.EditMode.asmdef
        │       MyAwesomeProject.PotatoSystem.Tests.EditMode.asmdef.meta
        │
        └───PlayMode
            │   MyAwesomeProject.PotatoSystem.Tests.PlayMode.asmdef
            │   MyAwesomeProject.PotatoSystem.Tests.PlayMode.asmdef.meta
            │   TestFixtures.meta
            │
            └───TestFixtures
```

### `mkmeta`

Generates meta files for Directories, code/text files and .asmdef files. This generates a new GUID, and throws an exception of the metafile already exists.

#### example useage

``` bash
mkmeta Test/
# creates a directory meta file

mkmeta Code.cs
# creates a file meta file

mkmeta package.json
# creates a file meta file

mkmeta myassembly.asmdef
# creates an .asmdef meta file

```