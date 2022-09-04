//import * as fse from 'fs-extra'
//import fileUtils from 'utilities/fileUtils.js'
import pathUtils from './utilities/pathUtils.js'
import {ModuleGenerator} from './generators/ModuleGenerator.js'
import {MetaFileGenerator} from './generators/MetaFileGenerator.js'
import {ServiceGenerator} from './generators/ServiceGenerator.js'
import {ComponentGenerator} from "./generators/ComponentGenerator.js";

//import * as shell from 'shelljs'

export {
    UnityProject
}

class UnityProject 
{
    Modules={}
    
    constructor() {
        this.WorkingDir = "./";

        let root = FindProjectRoot(this.WorkingDir);

        if (root.err) {
            throw new Error("Error while finding project root");
        }

        this.Name = pathUtils.Resolve(root.filePath).split("/").slice(-1)[0];
        
        console.log(this.Name);
        
        let projectRoot = pathUtils.GetRelative(this.WorkingDir, root.filePath);

        this.UnityPaths =
            {
                Root: projectRoot,
                Assets: `${projectRoot}/Assets`,
                ProjectSettings: `${projectRoot}/ProjectSettings`,
                UserSettings: `${projectRoot}/UserSettings`,
                Packages: `${projectRoot}/Packages`,
                Library: `${projectRoot}/Library`,
                Temp: `${projectRoot}/Temp`,
                obj: `${projectRoot}/obj`
            }

        this.ProjectPaths =
            {
                Content: `${projectRoot}/Assets/Content`,
                Scenes: `${projectRoot}/Assets/Scenes`,
                Source: `${projectRoot}/Assets/Source`,
                Modules: `${projectRoot}/Assets/Source/Modules`
            }

        this.ResourcePaths = FindResourcesPaths(this.UnityPaths.Assets);

        this.ModuleGenerator = new ModuleGenerator(this);
        this.ServiceGenerator = new ServiceGenerator(this);
        //this.ComponentGenerator = new ComponentGenerator(this);
        this.MetaFileGenerator = new MetaFileGenerator(this);

    }

    CreateProjectDirs()
    {
        console.log("Creating Project Dirs");
        
        let keys = Object.keys(this.ProjectPaths);
        
        for(let i = 0; i < keys.length; i++)
        {
            let filePath = this.ProjectPaths[keys[i]];
            if(!pathUtils.Exists(filePath))
            {
                console.log("\tCreating Dir: " + filePath);
                pathUtils.CreateDir(filePath);
                MetaFileGenerator.CreateMetaFile(filePath);
            }
            else
            {
                console.log("\tSkipping Existing Dir: " + filePath);
            }
        }
    }
    
    CreateModule(moduleName)
    {
        this.Modules[moduleName] = this.ModuleGenerator.Generate(moduleName);
    }

    CreateComponent(moduleName, componentName)
    {
        let module = this.Modules[moduleName];

        if(module === undefined)
        {
            throw new Error(`Module ${moduleName} does not exist in this project!`);
        }
        
        module.AddComponent(this.ComponentGenerator.Generate(componentName));
        
    }

    CreateService(moduleName, serviceName)
    {
        let module = this.Modules[moduleName];

        if(module === undefined)
        {
            throw new Error(`Module ${moduleName} does not exist in this project!`);
        }

        module.AddService(this.ServiceGenerator.Generate(module, serviceName));
    }
    
    CreateMetaFile(filePath)
    {
        this.MetaFileGenerator.Generate(filePath);
    }

    LogInfo()
    {
        console.log(this.ProjectPaths);
        console.log(this.Modules);
    }
}

function FindProjectRoot(filePath)
{
    filePath = pathUtils.Resolve(filePath);
    
    let result = {
        err: false,
        filePath: ""
    };

    let counter = 0;
    while(counter !== 10)
    {
        console.log(filePath);
        
        if(pathUtils.IsFileSystemRoot(filePath))
        {
            console.error("filesystem root reached while moving up directory hierarchy");
            result.err = true;
            return result;
        }
        else 
        {
            //console.log("checking if current dir is project root:\n\tdir="+filePath);
            if(IsUnityProjectRootDir(filePath))
            {
                result.filePath = filePath;
                result.err = false;
                return result;
            }

            filePath = pathUtils.Resolve(`${filePath}/../`);
        }
        
        counter++;
    }
    
    console.error("Watchdog Hit while moving up directory hierarchy");
    result.err = true;
    return result;
}

function IsUnityProjectRootDir(filePath)
{
    let files = pathUtils.GetDirs(filePath);

    return files.includes("Assets") &&
        files.includes("ProjectSettings") &&
        files.includes("Packages");
}

function FindResourcesPaths(projectRoot)
{
    return pathUtils.GlobSync(`${projectRoot}/**/Resources`);
}

