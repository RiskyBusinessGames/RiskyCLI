const {GeneratorBase} = require("../baseClasses/GeneratorBase.js");
const {TemplateCollection, TemplatePaths} = require( "../templating/TemplateCollection.js");


module.exports.ModuleGenerator = class extends GeneratorBase
{
    constructor(unityProject)
    {
        super(unityProject);
        //console.log("ModuleGenerator::ctor");
    }

    Generate(moduleName)
    {
        console.log(`Creating Module: ${moduleName}`);
                
        return new module.exports.Module(this.UnityProject, moduleName);
    }
}

module.exports.Module = class
{
    Services={}
    Components={}
    
    constructor(unityProject, moduleName)
    {
        if(unityProject === undefined || moduleName === undefined)
        {
            throw new Error("invalid ctor input");
        }
        
        this.UnityProject = unityProject;
        this.Name = moduleName;
        this.ModulePath = `${this.UnityProject.ProjectPaths.Modules}/${this.Name}`;
        this.InstallerPath = `${this.ModulePath}/Runtime/Source/Installers/${this.Name}Installer.cs`;

        console.log("Module::ctor");
        console.log("\tModule=" + this.Name);
        console.log("\tProject=" + this.UnityProject.Name);
        
        
        this.TempalateCollection = new TemplateCollection(
            TemplatePaths.Module,
            unityProject.ProjectPaths.Modules);
                
        let regexs = [
            /{PREFIX}/g,
            /{NAME}/g
        ];
        
        let values = [
            this.UnityProject.Name,
            this.Name
        ];
        
        this.TempalateCollection.GenerateOutput(unityProject, regexs, values);
    }

    AddComponent(component)
    {
        this.Components[component.Name] = component;
    }

    AddService(service)
    {
        this.Services[service.Name] = service;
    }
}