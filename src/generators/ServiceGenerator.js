const {GeneratorBase} = require("../baseClasses/GeneratorBase.js");
const {TemplateCollection, TemplatePaths} = require( "../templating/TemplateCollection.js");
const { AddServiceToInstaller } = require( "../utilities/InstallerUtils.js");



class ServiceGenerator extends GeneratorBase
{
    constructor(unityProject)
    {
        super(unityProject);

        //console.log("ServiceGenerator::ctor");
    }

    Generate(module, serviceName)
    {
        console.log(`Creating Service: ${serviceName} on module ${module}`);

        return new Service(this.UnityProject, module, serviceName);
    }
}

class Service
{
    constructor(unityProject, module, serviceName)
    {
        this.UnityProject = unityProject;
        this.Module = module;
        this.Name = serviceName;

        console.log("Service::ctor");
        console.log("\tModule=" + this.Module.Name);
        console.log("\tName=" + this.Name);

        console.log("\tProject=" + this.UnityProject.Name);


        this.TempalateCollection = new TemplateCollection(
            TemplatePaths.Service,
            this.Module.ModulePath);

        this.NameSpace=`${this.UnityProject.Name}.${this.Module.Name}`;

        let regexs = [
            /{NAMESPACE}/g,
            /{NAME}/g
        ];

        let values = [
            this.NameSpace,
            this.Name
        ];

        this.TempalateCollection.GenerateOutput(unityProject, regexs, values);

        AddServiceToInstaller(this.Module.InstallerPath, this);
    }
}

module.exports.Service = Service;
module.exports.ServiceGenerator = ServiceGenerator;