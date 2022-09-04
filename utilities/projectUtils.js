//import * as fse from 'fs-extra'
//import fileUtils from 'utilities/fileUtils.js'
import pathUtils from '../utilities/pathUtils.js'
//import * as shell from 'shelljs'

export {
    UnityProject
}

class UnityProject 
{
    constructor() {
        this.WorkingDir = "./";

        let root = FindProjectRoot(this.WorkingDir);

        if (root.err) {
            throw new Error("Error while finding project root");
        }

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

    }

    CreateProjectDirs()
    {
        let keys = Object.keys(this.ProjectPaths);
        
        for(let i = 0; i < keys.length; i++)
        {
            let filePath = this.ProjectPaths[keys[i]];
            if(!pathUtils.Exists(filePath))
            {
                pathUtils.CreateDir(filePath);
            }
        }
    }
    
    CreateModule(moduleName)
    {
        console.log("Creating Module: " + moduleName);
    }

    CreateComponent(moduleName, componentName)
    {
        console.log(`Creating Component: ${componentName} on module ${moduleName}`);
    }

    CreateService(moduleName, serviceName)
    {
        console.log(`Creating Service: ${serviceName} on module ${moduleName}`);
    }

    LogInfo()
    {
        console.log(this);
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

let project = new UnityProject();
project.LogInfo();
