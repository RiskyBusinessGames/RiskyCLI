#!/usr/bin/env node

const utilities=require("../utilities");
const installerUtils=require("../installerUtils");
const mkmeta = require("../MetaFileGenerator/mkmeta");

const path=require("path");

const fse = require('fs-extra');
const glob = require('glob');


main();

async function main()
{
    const data=
    {
        args:SetupArgs(),
        templates:SetupTemplates(),
        tempDirs:CreateTempWorkingDirs(),
        paths:SetupPaths(),
        regexs:{
            name: /{NAME}/g, 
            namespace: /{NAMESPACE}/g 
        }
    };
    
    data.values=
    {
        name: data.args[0],
        namespace: data.paths.namespace
    };

    console.log(data);

    console.log('\x1b[33m%s\x1b[0m',"Templating Runtime files...")
    await CreateRuntimeTempDir(data);

    console.log('\x1b[33m%s\x1b[0m',"Templating Installer...")
    await UpdateTempInstaller(data);

    console.log('\x1b[33m%s\x1b[0m',"Templating PlayMode Test files...")
    await CreatePlayModeTempDir(data);

    console.log('\x1b[33m%s\x1b[0m',"Templating PlayMode Test Files...")
    await CreateEditModeTempDir(data);

    console.log('\x1b[33m%s\x1b[0m',"Generating Meta Files...")
    mkmeta.CreateMetaFilesRecursive(data.tempDirs.runtime);
    mkmeta.CreateMetaFilesRecursive(data.tempDirs.playMode);
    mkmeta.CreateMetaFilesRecursive(data.tempDirs.editMode);


    console.log('\x1b[33m%s\x1b[0m',"Copying to target dir..")
    fse.copySync(data.tempDirs.runtime, data.paths.runtimeDir);
    fse.copySync(data.tempDirs.playMode, data.paths.playTestDirectory);
    fse.copySync(data.tempDirs.editMode, data.paths.editTestDirectory);
    
    console.log('\x1b[33m%s\x1b[0m',"DONE!")
}


function SetupArgs()
{
    const VALUES = process.argv.slice(2);

    if (VALUES.length == 0) {
        throw new Error("requires args; 'name'");
    } 

    return VALUES;
}

function SetupTemplates()
{
    const tempaltes = 
    {
        runtime: utilities.join(__dirname, "Template", "Runtime"),
        playMode: utilities.join(__dirname, "Template", "PlayMode"),
        editMode: utilities.join(__dirname, "Template", "EditMode"),
    };

    return tempaltes;
}

function SetupPaths()
{
    var workingDir = "./";
        
    if(path.basename(workingDir) != "Runtime")
    {
        var assemblyName = process.argv.slice(2)[1];
        if(assemblyName == undefined)
        {
            console.warn(path.dirname(workingDir));
            throw new Error("must be run in an Runtime assembly directory");
        }

        var globPath = utilities.join(workingDir, "**", assemblyName, "Runtime");
        var assemblyPath = glob.sync(globPath)[0];

        if(assemblyPath == undefined)
        {
            throw new Error(`Unable to find Assembly path for ${assemblyName}`);
        }

        workingDir = assemblyPath;
    }

    var assemblyFile = glob.sync(utilities.join(workingDir, "*.asmdef"))[0];

    assemblyFile = path.basename(assemblyFile);

    if(assemblyFile == undefined)
    {
        throw new Error("must be run in an directory with an asmdef");
    }

    const paths=
    {
        runtimeDir: workingDir,
        assemblyFile: assemblyFile,
        namespace: assemblyFile.replace(".asmdef", "").replace("./", ""),
        editTestDirectory: utilities.join(workingDir, "../Tests/EditMode"),
        playTestDirectory: utilities.join(workingDir, "../Tests/PlayMode"),
        playModeTestFixturesDirectory: utilities.join(workingDir, "../Tests/PlayMode/TestFixtures"),
        servicesDirectory: `${workingDir}/Services`,
        installerPath: `Installers/${assemblyFile.split(".")[1]}Installer.cs`
    }

    return paths;
}

function CreateTempWorkingDirs()
{
    var tempDir=utilities.createTempDir();

    const tempDirs=
    {
        root: tempDir,
        runtime: utilities.join(tempDir, "Runtime"),
        editMode: utilities.join(tempDir, "Tests", "EditMode"),
        playMode: utilities.join(tempDir, "Tests", "PlayMode")
    }

    console.log(tempDirs);

    return tempDirs;
}

async function CreateRuntimeTempDir(data)
{
    fse.copySync(data.templates.runtime, data.tempDirs.runtime, {overwrite:true});

    await utilities.templateFiles(data.tempDirs.runtime, data.regexs, data.values);
    await utilities.renameFiles(data.tempDirs.runtime, data.regexs, data.values);
}

async function UpdateTempInstaller(data)
{
    var tempPath=utilities.join(data.tempDirs.runtime, data.paths.installerPath);
    var realPath=utilities.join(data.paths.runtimeDir, data.paths.installerPath);
    
    console.log('\x1b[33mTEMP PATH: %s\x1b[0m', tempPath)
    console.log('\x1b[33mREAL PATH: %s\x1b[0m', realPath)

    fse.copySync(realPath, tempPath, {overwrite:true});

    await installerUtils.addServiceToInstaller(tempPath, data.values.name);
}

async function CreatePlayModeTempDir(data)
{
    fse.copySync(data.templates.playMode, data.tempDirs.playMode, {overwrite:true});

    await utilities.templateFiles(data.tempDirs.playMode, data.regexs, data.values);
    await utilities.renameFiles(data.tempDirs.playMode, data.regexs, data.values);
}

async function CreateEditModeTempDir(data)
{
    fse.copySync(data.templates.editMode, data.tempDirs.editMode, {overwrite:true});

    await utilities.templateFiles(data.tempDirs.editMode, data.regexs, data.values);
    await utilities.renameFiles(data.tempDirs.editMode, data.regexs, data.values);
}