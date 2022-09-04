import {GeneratorBase} from "../baseClasses/GeneratorBase.js";

export
{
	ComponentGenerator,
	Component
}

class ComponentGenerator extends GeneratorBase
{
	Templates=[];
	
	constructor(unityProject)
	{
		super(unityProject);
		console.log("ComponentGenerator::ctor");
		//console.log(this);
	}

	Generate(module, componentName)
	{
		return new Component(this.UnityProject, module, componentName);
	}
}

class Component
{
	constructor(unityProject, module, componentName)
	{
		this.UnityProject = unityProject;
		this.Module = module;
		this.Name = componentName;

		console.log("Component::ctor");
		console.log(this);
	}
}