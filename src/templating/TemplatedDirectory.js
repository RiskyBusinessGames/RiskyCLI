export class TemplatedDirectory
{
	constructor(templatePath, destinationPath)
	{
		this.TemplatePath = templatePath;
		
		if(destinationPath !== undefined)
		{
			this.DestinationPath = destinationPath;
		}

		console.log("TemplatedDirectory::ctor");
		//console.log(this);
	}
}