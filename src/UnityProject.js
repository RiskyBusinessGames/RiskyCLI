const pathUtils = require('./utilities/pathUtils.js');
const {ModuleGenerator} = require('./generators/ModuleGenerator.js');
const {MetaFileGenerator} = require('./generators/MetaFileGenerator.js');
const {ServiceGenerator} = require('./generators/ServiceGenerator.js');
const {ComponentGenerator} = require("./generators/ComponentGenerator.js");

module.exports.UnityProject = class UnityProject {
    Modules = {}

    constructor(config = null) {
        this.WorkingDir = "./";

        this.Root = FindProjectRoot(this.WorkingDir);
        this.RootPath = pathUtils.GetRelative(this.WorkingDir, this.Root.filePath);

        if (this.Root.err) {
            throw new Error("Error while finding project root");
        }

        if (config != null) 
        {
            this.InitFromConfig(config);
        } 
        else 
        {
            this.InitFromNull();
        }

        console.log(this.Name);
        
        this.UnityPaths =
            {
                Root: this.RootPath,
                Assets: `${this.RootPath}/Assets`,
                ProjectSettings: `${this.RootPath}/ProjectSettings`,
                UserSettings: `${this.RootPath}/UserSettings`,
                Packages: `${this.RootPath}/Packages`,
                Library: `${this.RootPath}/Library`,
                Temp: `${this.RootPath}/Temp`,
                obj: `${this.RootPath}/obj`
            }

        this.ResourcePaths = FindResourcesPaths(this.UnityPaths.Assets);

        this.ModuleGenerator = new ModuleGenerator(this);
        this.ServiceGenerator = new ServiceGenerator(this);
        this.ComponentGenerator = new ComponentGenerator(this);
        this.MetaFileGenerator = new MetaFileGenerator(this);

        this.CreateProjectDirs();
    }
    
    InitFromNull()
    {
        this.Name = pathUtils.Resolve(this.Root.filePath).split("/").slice(-1)[0];
        
        this.ProjectPaths =
            {
                Content: `${this.RootPath}/Assets/Content`,
                Scenes: `${this.RootPath}/Assets/Scenes`,
                Source: `${this.RootPath}/Assets/Source`,
                Modules: `${this.RootPath}/Assets/Source/Modules`
            }
    }
    
    InitFromConfig(config)
    {
        this.Name = config.name;
        this.ProjectPaths ={};

        this.ProjectPaths.Content = config.projectPaths.Content.replace("{projectRoot}", this.RootPath);
        this.ProjectPaths.Scenes = config.projectPaths.Scenes.replace("{projectRoot}", this.RootPath);
        this.ProjectPaths.Source = config.projectPaths.Source.replace("{projectRoot}", this.RootPath);
        this.ProjectPaths.Modules = config.projectPaths.Modules.replace("{projectRoot}", this.RootPath);
    }

    CreateProjectDirs() {
        console.log("Creating Project Dirs");

        let keys = Object.keys(this.ProjectPaths);

        for (let i = 0; i < keys.length; i++) {
            let filePath = this.ProjectPaths[keys[i]];
            if (!pathUtils.Exists(filePath)) {
                console.log("\tCreating Dir: " + filePath);
                pathUtils.CreateDir(filePath);
                this.CreateMetaFile(filePath);
            } else {
                console.log("\tSkipping Existing Dir: " + filePath);
            }
        }
    }

    CreateModule(moduleName) {
        this.Modules[moduleName] = this.ModuleGenerator.Generate(moduleName);
    }

    CreateComponent(moduleName, componentName) {
        let module = this.Modules[moduleName];

        if (module === undefined) {
            throw new Error(`Module ${moduleName} does not exist in this project!`);
        }

        module.AddComponent(this.ComponentGenerator.Generate(module, componentName));
    }

    CreateService(moduleName, serviceName) {
        let module = this.Modules[moduleName];

        if (module === undefined) {
            throw new Error(`Module ${moduleName} does not exist in this project!`);
        }

        module.AddService(this.ServiceGenerator.Generate(module, serviceName));
    }

    CreateMetaFile(filePath) {
        this.MetaFileGenerator.Generate(filePath);
    }

    LogInfo() {
        console.log(this.ProjectPaths);
        console.log(this.Modules);
    }
}

function FindProjectRoot(filePath) {
    filePath = pathUtils.Resolve(filePath);

    let result = {
        err: false,
        filePath: ""
    };

    let counter = 0;
    while (counter !== 10) {
        //console.log(filePath);

        if (pathUtils.IsFileSystemRoot(filePath)) {
            console.error("filesystem root reached while moving up directory hierarchy");
            result.err = true;
            return result;
        } else {
            //console.log("checking if current dir is project root:\n\tdir="+filePath);
            if (IsUnityProjectRootDir(filePath)) {
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

function IsUnityProjectRootDir(filePath) {
    let files = pathUtils.GetDirs(filePath);

    return files.includes("Assets") &&
        files.includes("ProjectSettings") &&
        files.includes("Packages");
}

function FindResourcesPaths(projectRoot) {
    return pathUtils.GlobSync(`${projectRoot}/**/Resources`);
}

