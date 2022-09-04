#!/usr/bin/env node

//import templateUtils from "/utilities/templateUtils"
//import mkmeta from "/MetaFileGenerator/mkmeta"
//import * as fse from "fs-extra"
import {GeneratorBase} from "../baseClasses/GeneratorBase.js";
import {TemplateCollection, TemplatePaths} from "../templating/TemplateCollection";

export
{
    ModuleGenerator,
    Module
}

class ModuleGenerator extends GeneratorBase
{
    constructor(unityProject)
    {
        super(unityProject);
        console.log("ModuleGenerator::ctor");
        
        this.Templates = TemplateCollections.Module;
    }

    Generate(moduleName)
    {
        console.log(`Creating Service: ${moduleName}`);
        
        return new Module(this.UnityProject, moduleName);
    }
}

class Module
{
    Services={}
    Components={}
    
    
    constructor(unityProject, moduleName)
    {
        this.UnityProject = unityProject;
        this.Name = moduleName;


        this.TempalateCollection = new TemplateCollection(TemplatePaths.Module);
                
        let regexs = [
            /{PREFIX}/g,
            /{NAME}/g
        ];
        
        let values = [
            this.UnityProject.name,
            this.Name
        ];
        
        this.TempalateCollection.GenerateOutput(regexs, values);
        
        console.log("Module::ctor");
        console.log("\tName=" + this.Name);
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



/*

main();

async function main()
{
    const data=
    {
        args:SetupArgs(),
        templateDir:`${__dirname}/{NAME}`,
        tempDir: templateUtils.createTempDir(),
        regexs:{
            prefix: /{PREFIX}/g,
            name: /{NAME}/g
        }
    };
    
    data.values=
    {
        prefix: data.args[0],
        name:data.args[1],
    };

    await CreateDir(data);
}


function SetupArgs()
{
    const VALUES = process.argv.slice(2);

    if (VALUES.length != 2) {
        throw new Error("requires args; 'name'");
    } 

    return VALUES;
}


async function CreateDir(data) {

    console.log('\x1b[33m%s\x1b[0m',"Copying templates...")
    fse.copySync(`${data.templateDir}`, `${data.tempDir}/{NAME}`);

    console.log('\x1b[33m%s\x1b[0m',"Templating & Renaming Files...")
    await templateUtils.ReplaceInAll(data.tempDir, data.regexs, data.values);
    
    console.log('\x1b[33m%s\x1b[0m',"Generating Meta Files...")
    mkmeta.CreateMetaFilesRecursive(`${data.tempDir}/${data.values.name}`);
    
    console.log('\x1b[33m%s\x1b[0m',"Copying to target dir..")
    fse.copySync(data.tempDir, "./");

    console.log('\x1b[33m%s\x1b[0m',"DONE!")
}*/
