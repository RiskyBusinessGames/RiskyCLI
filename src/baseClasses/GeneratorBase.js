
module.exports.GeneratorBase = class
{
	Templates=[];
	
	constructor(unityProject)
	{
		this.UnityProject = unityProject;
	}

	Generate()
	{
		throw new Error("Method not implemented!");
	}
}