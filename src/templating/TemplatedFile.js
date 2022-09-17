const fs = require( "fs");
const FileUtils = require( "../utilities/FileUtils.js");
const pathUtils = require("../utilities/PathUtils.js");



module.exports.TemplatedFile=class TemplatedFile
{
	constructor(templatePath, destinationPath)
	{
		this.TemplatePath = templatePath;

		this.TemplateText = fs.readFileSync(this.TemplatePath, { encoding: 'UTF8' });
		this.DestinationPath = destinationPath;
		
		//console.log("TemplatedFile::CTOR");
		//console.log("TemplatePath= "+this.TemplatePath);
		//console.log("DestinationPath= "+this.DestinationPath);
	}
	
	GenerateOutput(regexs, values)
	{
		this.DestinationText = this.TemplateText;

		//console.log("TemplatedFile::GenerateOutput");
		//console.log("TemplatePath= "+this.TemplatePath);
		//console.log("DestinationPath= "+this.DestinationPath);
		
		for(let i = 0; i < regexs.length; i++)
		{
			let regex = regexs[i];
			let value = values[i];

			this.DestinationPath = this.DestinationPath.replace(regex, value);
			this.DestinationText = this.DestinationText.replace(regex, value);
		}
		
		//console.log(this.DestinationText);
		
		if(pathUtils.Exists(this.DestinationPath))
		{
			console.log("Skipping Already Existing Output: " + this.DestinationPath);
		}
		else
		{
			//console.log("Writing Output: " + this.DestinationPath);
			FileUtils.WriteFile(this.DestinationPath, this.DestinationText);
		}
	}
}