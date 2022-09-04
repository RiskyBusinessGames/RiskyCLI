#!/usr/bin/env node

import templateUtils from "/utilities/templateUtils"
import mkmeta from "/MetaFileGenerator/mkmeta"

import * as fse from "fs-extra"

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
}