#!/usr/bin/env node

/*import templateUtils from "../utilities/templateUtils"
import installerUtils from "../utilities/installerUtils"
import pathUtils from "../utilities/pathUtils"
import mkmeta from "./MetaFileGenerator"

import * as path from "path"
import * as fse from 'fs-extra'
import * as glob from 'glob'*/
import {GeneratorBase} from "../baseClasses/GeneratorBase.js";

export
{
    ServiceGenerator,
    Service
}

class ServiceGenerator extends GeneratorBase
{
    constructor(unityProject)
    {
        super(unityProject);

        console.log("ServiceGenerator::ctor");
        //console.log(this);
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
    }
}



/*
async function main() {
    const data =
        {
            args: SetupArgs(),
            templates: SetupTemplates(),
            tempDirs: CreateTempWorkingDirs(),
            paths: SetupPaths(),
            regexs: {
                name: /{NAME}/g,
                namespace: /{NAMESPACE}/g
            }
        };

    data.values =
        {
            name: data.args[0],
            namespace: data.paths.namespace
        };

    console.log(data);

    console.log('\x1b[33m%s\x1b[0m', "Templating Runtime files...")
    await CreateRuntimeTempDir(data);

    console.log('\x1b[33m%s\x1b[0m', "Templating Installer...")
    await UpdateTempInstaller(data);

    console.log('\x1b[33m%s\x1b[0m', "Templating PlayMode Test files...")
    await CreatePlayModeTempDir(data);

    console.log('\x1b[33m%s\x1b[0m', "Templating PlayMode Test Files...")
    await CreateEditModeTempDir(data);

    console.log('\x1b[33m%s\x1b[0m', "Generating Meta Files...")
    mkmeta.CreateMetaFilesRecursive(data.tempDirs.runtime);
    mkmeta.CreateMetaFilesRecursive(data.tempDirs.playMode);
    mkmeta.CreateMetaFilesRecursive(data.tempDirs.editMode);


    console.log('\x1b[33m%s\x1b[0m', "Copying to target dir..")
    fse.copySync(data.tempDirs.runtime, data.paths.runtimeDir);
    fse.copySync(data.tempDirs.playMode, data.paths.playTestDirectory);
    fse.copySync(data.tempDirs.editMode, data.paths.editTestDirectory);

    console.log('\x1b[33m%s\x1b[0m', "DONE!")
}


function SetupArgs() {
    const VALUES = process.argv.slice(2);

    if (VALUES.length == 0) {
        throw new Error("requires args; 'name'");
    }

    return VALUES;
}

function SetupTemplates() {
    const tempaltes =
        {
            runtime: pathUtils.Join(__dirname, "Template", "Runtime"),
            playMode: pathUtils.Join(__dirname, "Template", "PlayMode"),
            editMode: pathUtils.Join(__dirname, "Template", "EditMode"),
        };

    return tempaltes;
}

function SetupPaths() {
    var workingDir = "./";

    if (path.basename(workingDir) != "Runtime") {
        console.log(path.basename(workingDir));

        var assemblyName = process.argv.slice(2)[1];
        if (assemblyName == undefined) {
            console.warn(path.dirname(workingDir));
            throw new Error("must be run in an Runtime assembly directory");
        }

        var globPath = pathUtils.Join(workingDir, "**", assemblyName, "Runtime");
        var assemblyPath = glob.sync(globPath)[0];

        console.log(globPath);

        if (assemblyPath == undefined) {
            throw new Error(`Unable to find Assembly path for ${assemblyName}`);
        }

        workingDir = assemblyPath;
    }

    let assemblyFile = pathUtils.GlobSync(pathUtils.Join(workingDir, "*.asmdef"))[0];

    assemblyFile = path.basename(assemblyFile);

    if (assemblyFile == undefined) {
        throw new Error("must be run in an directory with an asmdef");
    }

    const paths =
        {
            runtimeDir: workingDir,
            assemblyFile: assemblyFile,
            namespace: assemblyFile.replace(".asmdef", "").replace("./", ""),
            editTestDirectory: pathUtils.Join(workingDir, "../Tests/EditMode"),
            playTestDirectory: pathUtils.Join(workingDir, "../Tests/PlayMode"),
            playModeTestFixturesDirectory: pathUtils.Join(workingDir, "../Tests/PlayMode/TestFixtures"),
            servicesDirectory: `${workingDir}/Services`,
            installerPath: `Installers/${assemblyFile.split(".")[1]}Installer.cs`
        }

    return paths;
}

function CreateTempWorkingDirs() {
    var tempDir = templateUtils.createTempDir();

    const tempDirs =
        {
            root: tempDir,
            runtime: pathUtils.Join(tempDir, "Runtime"),
            editMode: pathUtils.Join(tempDir, "Tests", "EditMode"),
            playMode: pathUtils.Join(tempDir, "Tests", "PlayMode")
        }

    console.log(tempDirs);

    return tempDirs;
}

async function CreateRuntimeTempDir(data) {
    fse.copySync(data.templates.runtime, data.tempDirs.runtime, {overwrite: true});

    await templateUtils.templateFiles(data.tempDirs.runtime, data.regexs, data.values);
    await templateUtils.renameFiles(data.tempDirs.runtime, data.regexs, data.values);
}

async function UpdateTempInstaller(data) {
    var tempPath = pathUtils.Join(data.tempDirs.runtime, data.paths.installerPath);
    var realPath = pathUtils.Join(data.paths.runtimeDir, data.paths.installerPath);

    console.log('\x1b[33mTEMP PATH: %s\x1b[0m', tempPath)
    console.log('\x1b[33mREAL PATH: %s\x1b[0m', realPath)

    fse.copySync(realPath, tempPath, {overwrite: true});

    await installerUtils.addServiceToInstaller(tempPath, data.values.name);
}

async function CreatePlayModeTempDir(data) {
    fse.copySync(data.templates.playMode, data.tempDirs.playMode, {overwrite: true});

    await templateUtils.templateFiles(data.tempDirs.playMode, data.regexs, data.values);
    await templateUtils.renameFiles(data.tempDirs.playMode, data.regexs, data.values);
}

async function CreateEditModeTempDir(data) {
    fse.copySync(data.templates.editMode, data.tempDirs.editMode, {overwrite: true});

    await templateUtils.templateFiles(data.tempDirs.editMode, data.regexs, data.values);
    await templateUtils.renameFiles(data.tempDirs.editMode, data.regexs, data.values);
}
*/