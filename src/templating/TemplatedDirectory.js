const pathUtils = require("../utilities/PathUtils.js");


module.exports.TemplatedDirectory=class TemplatedDirectory
{
	constructor(templatePath, destinationPath)
	{
		this.TemplatePath = templatePath;
		this.DestinationPath = destinationPath;
		
		//console.log("TemplatedDirectory::ctor");
		//console.log(this);
	}

	GenerateOutput(regexs, values)
	{
		for(let i = 0; i < regexs.length; i++)
		{
			let regex = regexs[i];
			let value = values[i];
			
			this.DestinationPath = this.DestinationPath.replace(regex, value);
		}


		if(pathUtils.Exists(this.DestinationPath))
		{
			console.log("Skipping Already Existing Output: " + this.DestinationPath);
			return;
		}

		pathUtils.CreateDir(this.DestinationPath);
	}
}