import {inspect} from "util";


export
{
	GeneratorBase
}

class GeneratorBase
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