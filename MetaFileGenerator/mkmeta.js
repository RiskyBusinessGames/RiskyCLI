#!/usr/bin/env node
const fse = require('fs-extra');
const path = require('path');
const crypto = require("crypto");
const glob = require('glob');
const { stat } = require('fs');

const VALUES = process.argv.slice(2);
console.log(VALUES);
const templateStrings = LoadTemplates();

module.exports=
{
    CreateMetaFile:CreateMetaFile,
    CreateMetaFilesRecursive: function(dirPath)
    {
        var globstring =`${dirPath}/**/*`.replace(/\\/g,"/");
        console.log(globstring);

        glob.sync(globstring).forEach((filePath) => {
            CreateMetaFile(filePath);
        });
    }
}


function CreateMetaFile(filePath)
{
    console.log(`creating meta file for ${filePath}`);
    const stats = fse.lstatSync(filePath);

    if (stats.isDirectory()) {
        var metaFilePath = `${filePath}.meta`;
        // directories can have a trailing slash on the path, so we want to remove this so we create
        // a meta file with the name of the dir, not a .meta file _in_ the dir.
        if (filePath.slice(-1) == "/") {
            metaFilePath = `${filePath.slice(0, -1)}.meta`;
        }

        if (fse.existsSync(metaFilePath)) {
            throw new Error("metafile already exists for this item!");
        }

        MakeDirMetaFile(metaFilePath);
    }

    if (stats.isFile()) {
        const ext = path.extname(filePath);
        const metaFilePath = `${filePath}.meta`;

        if (fse.existsSync(metaFilePath)) {
            throw new Error("metafile already exists for this item!");
        }

        if (ext == ".asmdef") {
            MakeAsmdefMetaFile(metaFilePath);
        }
        else {
            MakeFileMetaFile(metaFilePath, stats);
        }
    }
}


function LoadTemplates() {
    const templatePaths = {
        ASMDEF: `${__dirname}/Templates/{ASMDEF}.meta`,
        DIR: `${__dirname}/Templates/{DIR}.meta`,
        FILE: `${__dirname}/Templates/{FILE}.meta`
    };

    var templateStrings = {};

    Object.keys(templatePaths).forEach(key => {
        const string = fse.readFileSync(templatePaths[key], "Utf8");
        templateStrings[key] = string;
    });

    return templateStrings;
}

function MakeDirMetaFile(filePath) {
    const template = templateStrings["DIR"];

    const fileText = FileTextFromTemplate(template);

    fse.writeFileSync(filePath, fileText);
}

function MakeFileMetaFile(filePath, stats) {

    const createTime = Math.floor(stats.birthtimeMs / 1000);

    const template = templateStrings["FILE"];
    const fileText = FileTextFromTemplate(template, createTime);

    fse.writeFileSync(filePath, fileText);
}

function MakeAsmdefMetaFile(filePath) {
    const template = templateStrings["ASMDEF"];

    const fileText = FileTextFromTemplate(template);

    fse.writeFileSync(filePath, fileText);
}

function MakeGuid() {
    var hexstring = crypto.randomBytes(16).toString("hex"); // 16 bytes generates a 32 character hex string
    return hexstring;
}

function FileTextFromTemplate(template, createTime) {
    const guid = MakeGuid();

    var fileText = template.replace("{GUID}", guid)
        .replace("{UNIXTIME}", createTime);
    return fileText;
}