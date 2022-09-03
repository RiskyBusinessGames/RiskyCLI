#!/usr/bin/env node

const utilities=require("../utilities");
const fse = require('fs-extra');
const shell = require("shelljs");
const mkmeta = require("../MetaFileGenerator/mkmeta");

main();

async function main()
{
    const data=
    {
        args:SetupArgs(),
        templateDir:`${__dirname}/{NAME}`,
        tempDir: utilities.createTempDir(),
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

    console.log('\x1b[33m%s\x1b[0m',"Templating Files...")
    await utilities.templateFiles(data.tempDir, data.regexs, data.values);
    
    console.log('\x1b[33m%s\x1b[0m',"Renaming Files...")
    await utilities.renameFiles(data.tempDir, data.regexs, data.values);

    console.log('\x1b[33m%s\x1b[0m',"Generating Meta Files...")
    mkmeta.CreateMetaFilesRecursive(`${data.tempDir}/${data.values.name}`);
    
    console.log('\x1b[33m%s\x1b[0m',"Copying to target dir..")
    fse.copySync(data.tempDir, "./");

    console.log('\x1b[33m%s\x1b[0m',"DONE!")
}