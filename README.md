# Risky Generators
CLI for generating risky business faster.

## Instalation
(not published yet)

1) pull git repo
2) run `npm install` in root to get deps
3) run `npm link` in root to add symlinks for the commands to your shell.

## Commands

### `mkass` Command
Creates a standard assembly structure, with runtime, editor and test assemblies

* Takes two parameters, a prefix/project name to use, and a assembly name.
* creates the new dir structure in the _current directory_!

See [Template](AssemblyDirGenerator\{NAME}) dir structure for details. 

#### example usage

``` bash
mkass MyAwesomeProject PotatoSystem
```

#### example output
``` yaml
new file:   Editor.meta
new file:   Editor/RiskyTools.PlayerCharacter.Editor.asmdef
new file:   Editor/RiskyTools.PlayerCharacter.Editor.asmdef.meta
new file:   Runtime.meta
new file:   Runtime/AssemblyAttrs.cs
new file:   Runtime/AssemblyAttrs.cs.meta
new file:   Runtime/Components.meta
new file:   Runtime/Installers.meta
new file:   Runtime/Installers/PlayerCharacterInstaller.cs
new file:   Runtime/Installers/PlayerCharacterInstaller.cs.meta
new file:   Runtime/README.md
new file:   Runtime/README.md.meta
new file:   Runtime/RiskyTools.PlayerCharacter.asmdef
new file:   Runtime/RiskyTools.PlayerCharacter.asmdef.meta
new file:   Runtime/Services.meta
new file:   Runtime/package.json
new file:   Runtime/package.json.meta
new file:   Tests.meta
new file:   Tests/EditMode.meta
new file:   Tests/EditMode/RiskyTools.PlayerCharacter.Tests.EditMode.asmdef
new file:   Tests/EditMode/RiskyTools.PlayerCharacter.Tests.EditMode.asmdef.meta
new file:   Tests/PlayMode.meta
new file:   Tests/PlayMode/RiskyTools.PlayerCharacter.Tests.PlayMode.asmdef
new file:   Tests/PlayMode/RiskyTools.PlayerCharacter.Tests.PlayMode.asmdef.meta
new file:   Tests/PlayMode/TestFixtures.meta
```

### `mkservice` Command
Generates a service class, interface, test fixture and stub edit & playmode tests.
It also adds it to the Installer for the 

#### Example Usage
``` bash
# from the Runtime dir of an assembly (PlayerCharacter), creates a service called PlayerStatsService;
mkservice PlayerStatsService

# from any parent directory in the project;
mkservice PlayerStatsService PlayerCharacter
```

#### Example Output

Modification to dir tree, onlu showing new/modified files for brevity
``` bash
|-- Runtime
|   |-- Installers
|   |   |-- PlayerCharacterInstaller.cs
|   |   `-- PlayerCharacterInstaller.cs.meta
|   |-- Interfaces
|   |   |-- IPlayerStatsService.cs
|   |   `-- IPlayerStatsService.cs.meta
|   |-- Interfaces.meta
|   |-- Services
|   |   |-- PlayerStatsService.cs
|   |   `-- PlayerStatsService.cs.meta
|-- Tests
|   |-- EditMode
|   |   |-- Services
|   |   |   |-- PlayerStatsService
|   |   |   |   |-- PlayerStatsServiceTests.cs
|   |   |   |   `-- PlayerStatsServiceTests.cs.meta
|   |   |   `-- PlayerStatsService.meta
|   |-- PlayMode
|   |   |-- Services
|   |   |   |-- PlayerStatsService
|   |   |   |   |-- PlayerStatsServiceTests.cs
|   |   |   |   `-- PlayerStatsServiceTests.cs.meta
|   |   |   `-- PlayerStatsService.meta
|   |   |-- Services.meta
|   |   |-- TestFixtures
|   |   |   |-- PlayerStatsServiceTestFixture.cs
|   |   |   `-- PlayerStatsServiceTestFixture.cs.meta

```

Modification to Installer

``` c#
using Zenject;
using TestProject.PlayerCharacter.Services;
using TestProject.PlayerCharacter.Interfaces;

namespace TestProject.PlayerCharacter.Installers
{
    public class PlayerCharacterInstaller: Installer<PlayerCharacterInstaller>
    {
        public override void InstallBindings()
        {
            // Autogenerated comment, do not remove
            // <RiskyGenerator.Resources>

            // Autogenerated comment, do not remove
            // <RiskyGenerator.Services>
            PlayerStatsService.InstallService(Container);

            // Autogenerated comment, do not remove
            // <RiskyGenerator.Components>
        }
    }
}
```

### `mkmeta` Command

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