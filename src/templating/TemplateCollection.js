import pathUtils from "../utilities/PathUtils.js";
import {TemplatedFile} from "./TemplatedFile.js";
import {TemplatedDirectory} from "./TemplatedDirectory.js";

const __dirname = pathUtils.GetPackageRoot();

export 
{
	TemplatePaths,
	TemplateCollection
}

const TemplatePaths={
	Module:`${__dirname}/templates/module/`,
	Service:`${__dirname}/templates/service/`,
	Component: `${__dirname}/templates/module/`,
	Meta: `${__dirname}/templates/meta/`
}

class TemplateCollection
{
	FileTemplates=[];
	DirectoryTemplates=[];
	
	constructor(templatePath, destinationPath)
	{		
		if(destinationPath !== undefined)
		{
			this.LoadTemplatesAndDestination(templatePath, destinationPath);
		}
		else 
		{
			this.LoadTemplates(templatePath);
		}

		console.log("TemplateCollection::ctor");
		console.log(this.FileTemplates);
		console.log(this.DirectoryTemplates);
	}
		
	LoadTemplates(templatePath)
	{
		let globString = `${templatePath}**/*`;
		let globResult = pathUtils.GlobSync(globString);
				
		for(let i = 0; i < globResult.length; i++)
		{
			let filePath = globResult[i];
			
			if(pathUtils.IsFile(filePath))
			{
				this.FileTemplates.push(new TemplatedFile(filePath));
			}
		}
	}
	
	GenerateOutput(regexs, values)
	{
		this.FileTemplates.forEach(fileTemplate =>{
			fileTemplate.GenerateOutput(regexs, values);
		});
		this.DirectoryTemplates.forEach(fileTemplate =>{
			fileTemplate.GenerateOutput(regexs, values);
		});
	}
	
	
	LoadTemplatesAndDestination(templatePath, destinationPath)
	{
		let globString = `${templatePath}**/*`;
		let globResult = pathUtils.GlobSync(globString);
		for(let i = 0; i < globResult.length; i++)
		{
			let filePath = globResult[i];

			if(pathUtils.IsFile(filePath))
			{
				this.FileTemplates.push(new TemplatedFile(filePath, destinationPath));
			}
			
			if(pathUtils.IsDir(filePath))
			{
				this.DirectoryTemplates.push(new TemplatedDirectory(filePath, destinationPath));
			}
		}
	}
}