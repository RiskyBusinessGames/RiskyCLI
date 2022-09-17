const pathUtils = require("../utilities/PathUtils.js");
const {TemplatedFile} = require("./TemplatedFile.js");
const {TemplatedDirectory} = require("./TemplatedDirectory.js");

const TemplatePaths= {
	Module: pathUtils.Join(__dirname, "../../templates/module/"),
	Service: pathUtils.Join(__dirname, "../../templates/service/"),
	Component: pathUtils.Join(__dirname, "../../templates/component/"),
	Meta: pathUtils.Join(__dirname, "../../templates/meta/")
}

module.exports.TemplatePaths = TemplatePaths;

module.exports.TemplateCollection = class
{
	FileTemplates = [];
	DirectoryTemplates = [];

	constructor(templatePath, destinationRoot)
	{
		
		console.log("TemplateCollection::ctor");
		console.log("templatePath " + templatePath);
		console.log("destinationRoot " + destinationRoot);
		console.log("TemplatePaths " + TemplatePaths)
		
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