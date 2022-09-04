import fileUtils from "fileUtils"

const regexs =
{
    name: /{NAME}/g,
    namespace: /{NAMESPACE}/g
}

const templates =
{
    usingTemplate: "using {NAMESPACE}.Services",
    serviceInstallerTemplate: "{NAME}.InstallService(Container);",
}

const tags =
{
    resources: "// <RiskyGenerator.Resources>",
    services: "// <RiskyGenerator.Services>",
    components: "// <RiskyGenerator.Components>"
}

export default
{
    addServiceToInstaller: AddServiceToInstaller
}

async function AddServiceToInstaller(installerPath, serviceName) {
    console.log(`addServiceToInstaller:\n\tinstallerPath=${installerPath}\n\tserviceName=${serviceName}`);

    let lines = fileUtils.getFileLines(installerPath);

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(tags.services)) {
            const template = templates.serviceInstallerTemplate;

            const newInstallerLine = lines[i]
                .replace(tags.services, template)
                .replace(regexs.name, serviceName)

            lines.splice(i + 1, 0, newInstallerLine);
            break;
        }
    }

    await fileUtils.writeFileLines(installerPath, lines);
}