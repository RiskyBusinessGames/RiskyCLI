import fs from "fs"
import * as crypto from "crypto"
import * as path from "path"
import pathUtils from "../utilities/PathUtils.js"
import { GeneratorBase } from "../baseClasses/GeneratorBase.js"
import {TemplatedFile} from "../templating/TemplatedFile.js";
import {TemplateCollection, TemplatePaths} from "../templating/TemplateCollection.js";

const __dirname = pathUtils.GetPackageRoot();

export 
{
    MetaFileGenerator,
    MetaFile
}

const Templates = new TemplateCollection(TemplatePaths.Meta);



class MetaFileGenerator extends GeneratorBase
{
    constructor(unityProject)
    {
        super(unityProject);
        
        console.log("MetaFileGenerator::ctor");
    }
    
    Generate(filePath)
    {
        return new MetaFile(filePath);
    }

    GenerateRecursive(filePath)
    {
        let metaFiles = [];
        
        pathUtils.GlobSync(`${dirPath}/**/*`).forEach((filePath) => {
            metaFiles += new MetaFile(filePath);
        });
    }
}


class MetaFile 
{
    constructor(filePath)
    {        
        if(pathUtils.IsDir(filePath))
        {
            this.Template = Templates.FileTemplates[1];
        }
        if(pathUtils.IsFile(filePath))
        {
            if(filePath.includes(".asmdef"))
            {
                this.Template = Templates.FileTemplates[0];
            }
            else
            {
                this.Template = Templates.FileTemplates[2];
            }
            
        }
        
        console.log("MetaFile::ctor");
        console.log(JSON.stringify(this));
    }
}

const VALUES = process.argv.slice(2);
console.log(VALUES);
const templateStrings = LoadTemplates();

export default {
    CreateMetaFile,
    CreateMetaFilesRecursive
}

function CreateMetaFilesRecursive(dirPath) {
    pathUtils.GlobSync(`${dirPath}/**/*`).forEach((filePath) => {
        CreateMetaFile(filePath);
    });
}

function CreateMetaFile(filePath) {
    console.log(`creating meta file for ${filePath}`);
    const stats = fs.lstatSync(filePath);

    if (stats.isDirectory()) {
        let metaFilePath = `${filePath}.meta`;
        // directories can have a trailing slash on the path, so we want to remove this so we create
        // a meta file with the name of the dir, not a .meta file _in_ the dir.
        if (filePath.slice(-1) === "/") {
            metaFilePath = `${filePath.slice(0, -1)}.meta`;
        }

        if (fs.existsSync(metaFilePath)) {
            throw new Error("metafile already exists for this item!");
        }

        MakeDirMetaFile(metaFilePath);
    }

    if (stats.isFile()) {
        const ext = path.extname(filePath);
        const metaFilePath = `${filePath}.meta`;

        if (fs.existsSync(metaFilePath)) {
            throw new Error("metafile already exists for this item!");
        }

        if (ext === ".asmdef") {
            MakeAsmdefMetaFile(metaFilePath);
        } else {
            MakeFileMetaFile(metaFilePath, stats);
        }
    }
}


function LoadTemplates() {
    const templatePaths = {
        asmdef: `${__dirname}/templates/meta/{ASMDEF}.meta`,
        dir: `${__dirname}/templates/meta/{DIR}.meta`,
        file: `${__dirname}/templates/meta/{FILE}.meta`
    };

    let templateStrings = {};

    Object.keys(templatePaths).forEach(key => {
        templateStrings[key] = fs.readFileSync(templatePaths[key], {encoding: 'Utf8'});
    });

    return templateStrings;
}

function MakeDirMetaFile(filePath) {
    const template = templateStrings.dir;

    const fileText = FileTextFromTemplate(template);

    fs.writeFileSync(filePath, fileText);
}

function MakeFileMetaFile(filePath, stats) {

    const createTime = Math.floor(stats.birthtimeMs / 1000);

    const template = templateStrings.file;
    const fileText = FileTextFromTemplate(template, createTime);

    fs.writeFileSync(filePath, fileText);
}

function MakeAsmdefMetaFile(filePath) {
    const template = templateStrings.asmdef;

    const fileText = FileTextFromTemplate(template);

    fs.writeFileSync(filePath, fileText);
}

function MakeGuid() {
     // 16 bytes generates a 32 character hex string
    return crypto.randomBytes(16).toString("hex");
}

function FileTextFromTemplate(template, createTime) {
    const guid = MakeGuid();

    return template.replace("{GUID}", guid)
        .replace("{UNIXTIME}", createTime);
}