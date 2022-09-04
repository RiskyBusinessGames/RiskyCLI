import fs from "fs"

export class TemplatedFile
{
	constructor(templatePath, destinationPath)
	{
		this.TemplatePath = templatePath;
		this.TemplateText = fs.readFileSync(this.TemplatePath, { encoding: 'UTF8' });
		
		if(destinationPath !== undefined)
		{
			this.DestinationPath = destinationPath;
			this.DestinationText = fs.readFileSync(this.DestinationPath, { encoding: 'UTF8' });
		}

		console.log("TemplatedFile::ctor");
		//console.log(this);
	}
	
	GenerateOutput(regexs, values)
	{
		this.DestinationText = this.TemplateText;
		
		for(let i = 0; i < regexs.length; i++)
		{
			let regex = regexs[i];
			let value = values[i];
			
			this.DestinationText.replace(regex, value);
		}
		
		console.log(this.DestinationText);
	}
}