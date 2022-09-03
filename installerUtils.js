const fileUtils = require("./fileUtils");

const regexs=
{
    name: /{NAME}/g, 
    namespace: /{NAMESPACE}/g 
}

const templates =
{
    usingTemplate: "using {NAMESPACE}.Services",
    serviceInstallerTemplate: "{NAME}.InstallService(Container);",
}

const tags=
{
    resources: "// <RiskyGenerator.Resources>",
    services: "// <RiskyGenerator.Services>",
    components: "// <RiskyGenerator.Components>"
}

module.exports=
{
    addServiceToInstaller: async function (installerPath, serviceName, namespace) {
        console.log(`addServiceToInstaller:\n\tinstallerPath=${installerPath}\n\tserviceName=${serviceName}`);

        var lines = fileUtils.getFileLines(installerPath);

        for(var i = 0; i < lines.length; i++)
        {
            if(lines[i].includes(tags.services))
            {
                const template = templates.serviceInstallerTemplate;

                const newInstallerLine=lines[i]
                    .replace(tags.services, template)
                    .replace(regexs.name, serviceName)

                lines.splice(i+1, 0, newInstallerLine);
                break;
            }
        }
        
        await fileUtils.writeFileLines(installerPath, lines);
    }
}

