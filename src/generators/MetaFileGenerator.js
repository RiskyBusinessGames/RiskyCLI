import * as crypto from "crypto"
import * as path from "path"
import pathUtils from "../utilities/PathUtils.js"
import { GeneratorBase } from "../baseClasses/GeneratorBase.js"
import {TemplateCollection, TemplatePaths} from "../templating/TemplateCollection.js";

const __dirname = pathUtils.GetPackageRoot();

const Templates = new TemplateCollection(TemplatePaths.Meta, TemplatePaths.Meta);

class MetaFileGenerator extends GeneratorBase
{
    constructor(unityProject)
    {
        super(unityProject);
        
        //console.log("MetaFileGenerator::ctor");
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
        this.Regexs =[
            /{GUID}/g,
            /{UNIXTIME}/g
        ];
        
        this.Name = path.basename(filePath);
        this.Values = [
            crypto.randomBytes(16).toString("hex"),
            Math.floor(new Date().getTime() / 1000),
            this.Name
        ];
        
        if(pathUtils.IsDir(filePath))
        {
            this.Template = Templates.FileTemplates[1];
            this.Regexs.push(/{DIR}/g);
        }
        else if(pathUtils.IsFile(filePath))
        {
            if(filePath.includes(".asmdef"))
            {
                this.Template = Templates.FileTemplates[0];
                this.Regexs.push(/{ASMDEF}/g);
            }
            else
            {
                this.Template = Templates.FileTemplates[2];
                this.Regexs.push(/{FILE}/g);
            }
        }
        else
        {
            throw new Error("file path was not file or dir!");
        }


        this.Template.DestinationPath = `${filePath}.meta`
        
        //console.log(Templates);
        //console.log(this);

        this.Template.GenerateOutput(this.Regexs, this.Values);
    }
}

export
{
    MetaFileGenerator,
    MetaFile
}