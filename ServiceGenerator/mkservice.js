#!/usr/bin/env node

const utilities=require("../utilities");
const path=require("path");

const fse = require('fs-extra');
const glob = require('glob');
const shell = require("shelljs");


main();

async function main()
{
    const data=
    {
        args:SetupArgs(),
        templates:SetupTemplates(),
        tempDirs:CreateTempWorkingDirs(),
        paths:SetupPaths(),
        regexs:[ /{NAME}/g, /{NAMESPACE}/g ]
    };
    
    data.values=
    [
        data.args[0],
        data.paths.namespace
    ];

    await CreateRuntimeTempDir(data);
    await CreatePlayModeTempDir(data);
    await CreateEditModeTempDir(data);

    shell.exec(`tree -a "${data.tempDirs}/../"`);
}


function SetupArgs()
{
    const VALUES = process.argv.slice(2);

    if (VALUES.length != 1) {
        throw new Error("requires args; 'name'");
    } 

    return VALUES;
}

function SetupTemplates()
{
    console.log(utilities);

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
    const workingDir = "./";
        
    if(path.basename(path.resolve(workingDir)) != "Runtime")
    {
        console.warn(path.dirname(workingDir));
        throw new Error("must be run in an Runtime assembly directory");
    }

    var assemblyFile = glob.sync(`${workingDir}*.asmdef`)[0];

    if(assemblyFile == undefined)
    {
        throw new Error("must be run in an directory with an asmdef");
    }

    const paths=
    {
        workingDir: workingDir,
        assemblyFile: assemblyFile,
        namespace: assemblyFile.replace(".asmdef", "").replace("./", ""),
        editTestDirectory: utilities.join(workingDir, "../Tests/EditMode"),
        playTestDirectory: utilities.join(workingDir, "../Tests/PlayMode"),
        playModeTestFixturesDirectory: utilities.join(workingDir, "../Tests/PlayMode/TestFixtures"),
        servicesDirectory: utilities.join(workingDir, "Services"),
        installerPath: utilities.join(workingDir, `Installers/${assemblyFile.split(".")[2]}Installer.cs`)
    }

    return paths;
}

function CreateTempWorkingDirs()
{
    var tempDir=utilities.createTempDir();

    const tempDirs=
    {
        runtime: utilities.join(tempDir, "Runtime"),
        editMode: utilities.join(tempDir, "Tests", "EditMode"),
        playMode: utilities.join(tempDir, "Tests", "EditMode")
    }

    console.log(tempDirs);

    return tempDirs;
}

async function CreateRuntimeTempDir(data)
{
    var installerTempPath = utilities.join(data.tempDirs.runtime, data.paths.installerPath);

    fse.copySync(data.paths.installerPath, installerTempPath, {overwrite:true});
    fse.copySync(data.templates.runtime, data.tempDirs.runtime, {overwrite:true});

    await utilities.templateFiles(data.tempDirs.runtime, data.regexs, data.values);
    await utilities.renameFiles(data.tempDirs.runtime, data.regexs, data.values);
    await utilities.addInstallerEntry(installerTempPath, "NOT IMPLEMENTED");
    

    shell.exec(`tree -a "${data.tempDirs.runtime}/../"`);
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

function CreateOutputDirs()
{

}

/*
{
  templates: {
    runtimeServicesDir: 'E:\\git_repos\\RiskyBusiness\\RiskyFiles\\ServiceGenerator/Template/Services',
    runtimeInterfacesDir: 'E:\\git_repos\\RiskyBusiness\\RiskyFiles\\ServiceGenerator/Template/Interfaces',
    playModeDir: 'E:\\git_repos\\RiskyBusiness\\RiskyFiles\\ServiceGenerator/Template/PlayMode',
    editModeDir: 'E:\\git_repos\\RiskyBusiness\\RiskyFiles\\ServiceGenerator/Template/EditMode'
  },
  tempDirs: {
    runtime: 'C:\\Users\\Matt\\AppData\\Local\\Temp\\Runtime',
    editMode: 'C:\\Users\\Matt\\AppData\\Local\\Temp\\Tests\\EditMode',
    playMode: 'C:\\Users\\Matt\\AppData\\Local\\Temp\\Tests\\EditMode'
  },
  paths: {
    workingDir: './',
    templateDir: 'E:\\git_repos\\RiskyBusiness\\RiskyFiles\\ServiceGenerator/Template',
    assemblyFile: './MyAwesomeProject.PotatoSystem.asmdef',
    namespace: 'MyAwesomeProject.PotatoSystem',
    editTestDirectory: '..\\Tests\\EditMode',
    playTestDirectory: '..\\Tests\\PlayMode',
    playModeTestFixturesDirectory: '..\\Tests\\PlayMode\\TestFixtures',
    servicesDirectory: 'Services',
    installerPath: 'Installers\\PotatoSystemInstaller.cs'
  }
}

*/