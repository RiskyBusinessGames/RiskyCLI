import pathUtils from "../utilities/PathUtils.js";
import {TemplatedFile} from "./TemplatedFile.js";
import {TemplatedDirectory} from "./TemplatedDirectory.js";

const __dirname = pathUtils.GetPackageRoot();

const TemplatePaths = {
	Module: `${__dirname}/templates/module/`,
	Service: `${__dirname}/templates/service/`,
	Component: `${__dirname}/templates/component/`,
	Meta: `${__dirname}/templates/meta/`
}

class TemplateCollection
{
	FileTemplates = [];
	DirectoryTemplates = [];

	constructor(templatePath, destinationRoot)
	{
		console.log("TemplateCollection::ctor");
		console.log(templatePath);
		console.log(destinationRoot);
		
		this.LoadTemplates(templatePath, destinationRoot);
	
		console.log(this.FileTemplates);
		console.log(this.DirectoryTemplates);
	}

	LoadTemplates(templatePath, destinationRoot)
	{
		let globString = `${templatePath}**/*`;
		let globResult = pathUtils.GlobSync(globString);
		for (let i = 0; i < globResult.length; i++)
		{
			let relativePath = pathUtils.GetRelative(templatePath, globResult[i]);
			let absolutePath = pathUtils.Resolve(globResult[i]);
			let outputPath = pathUtils.Resolve(pathUtils.Join(destinationRoot, relativePath));
			
			if (pathUtils.IsFile(absolutePath))
			{
				console.log("Path is File: "+absolutePath);
				this.FileTemplates.push(new TemplatedFile(absolutePath, outputPath));
			}

			if (pathUtils.IsDir(absolutePath))
			{
				console.log("Path is Directory: "+absolutePath);
				this.DirectoryTemplates.push(new TemplatedDirectory(absolutePath, outputPath));
			}
		}
	}

	GenerateOutput(unityProject, regexs, values)
	{
		console.log("TemplateCollection::GenerateOutput");
		console.log(regexs);
		console.log(values);
		
		this.DirectoryTemplates.forEach(template =>
		{
			template.GenerateOutput(regexs, values);
			unityProject.CreateMetaFile(template.DestinationPath);
		});
			
		
		this.FileTemplates.forEach(template =>
		{
			if(pathUtils.Exists(template.DestinationPath))
			{
				console.log("Skipping Already Existing Output: " + template.DestinationPath);
				return;
			}

			template.GenerateOutput(regexs, values);
			unityProject.CreateMetaFile(template.DestinationPath);
		});
	}
}

export
{
	TemplatePaths,
	TemplateCollection
}