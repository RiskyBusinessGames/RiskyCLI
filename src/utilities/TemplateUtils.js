const path = require('path');
const fs = require( 'fs');
const fileUtils = require( './fileUtils.js');
const pathUtils = require( './pathUtils.js');

module.exports= 
{
    ReplaceInAll,
    TemplateFiles,
    RenameFiles,
    CreateTempDir
}

async function ReplaceInAll(filePath, regexs, values) {
    await TemplateFiles(filePath, regexs, values);
    await RenameFiles(filePath, regexs, values);
}

async function TemplateFiles(filePath, regexs, values) {

    filePath = path.relative("./", filePath).replace(/\\/g, "/");

    await ForEachRegex(filePath, regexs, values, fileUtils.replaceInFileContent);
}

async function RenameFiles(filePath, regexs, values) {
    filePath = path.relative("./", filePath).replace(/\\/g, "/");
    
    await ForEachRegex(filePath, regexs, values, fileUtils.replaceInFileNames);
}

function CreateTempDir() {
    console.log(`utilities.createTempDir():`);


    let tempDir = pathUtils.Join(__dirname, "temp");
    console.log(`\n\tpath=${tempDir}`);

    if (fs.existsSync(tempDir)) {
        console.log("\talready exists, deleting...");
        fs.rmSync(tempDir, {recursive: true, force: true});
    }

    console.log("\tcreated temp dir");
    fs.mkdirSync(tempDir, {recursive: true});

    return tempDir;
}

async function ForEachRegex(filepath, regexs, values, func) {
    let keys = Object.keys(regexs);

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        await func(filepath, regexs[key], values[key])
    }
}
