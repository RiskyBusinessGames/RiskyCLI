import fileUtils from "./fileUtils.js"
import PathUtils from "./PathUtils.js";

const regexs =
{
    name: /{NAME}/g,
    namespace: /{NAMESPACE}/g
}

const templates =
{
    service: "{NAME}.InstallService(Container);",
    component: "{NAME}Installer.Install(Container);",
    using: "using {NAME};",
}

const tags =
{
    usings: "// <RiskyCLI.Usings>",
    resources: "// <RiskyCLI.Resources>",
    services: "// <RiskyCLI.Services>",
    components: "// <RiskyCLI.Components>"
}

export
{
    AddServiceToInstaller,
    AddComponentToInstaller
}

function AddToInstaller(installerPath, template, tag, name)
{
    installerPath = PathUtils.Resolve(installerPath);
    
    console.log(installerPath);

    let newInstallerLine = `\n${template.replace(regexs.name, name)}\n`
    
    let fileText = fileUtils.ReadFile(installerPath);
    
    let i = fileText.indexOf(tag) + tag.length;

    let resultText = fileText.slice(0, i) + newInstallerLine + fileText.slice(i);
    
    fileUtils.WriteFile(installerPath, resultText);
    
    // let lines = fileUtils.GetFileLines(installerPath);
    //
    // for (let i = 0; i < lines.length; i++) {
    //     if (lines[i].includes(tag)) {
    //         const newInstallerLine = lines[i]
    //             .replace(tag, template)
    //             .replace(regexs.name, name)
    //
    //         lines.splice(i + 1, 0, newInstallerLine);
    //         break;
    //     }
    // }
    //
    // fileUtils.WriteFileLines(installerPath, lines);
}

function AddServiceToInstaller(installerPath, service) {
    AddToInstaller(installerPath, templates.service, tags.services, service.Name);
}

function AddComponentToInstaller(installerPath, component) {
    AddToInstaller(installerPath, templates.component, tags.components, component.Name);
    AddToInstaller(installerPath, templates.using, tags.usings, component.NameSpace);
}