import {GeneratorBase} from "../baseClasses/GeneratorBase.js";
import {TemplateCollection, TemplatePaths} from "../templating/TemplateCollection.js";

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
		console.log("\tModule=" + this.Module.Name);
		console.log("\tName=" + this.Name);
		console.log("\tProject=" + this.UnityProject.Name);


		this.TempalateCollection = new TemplateCollection(
			TemplatePaths.Component,
			this.Module.ModulePath);

		let regexs = [
			/{NAMESPACE}/g,
			/{NAME}/g
		];

		let values = [
			`${this.UnityProject.Name}.${this.Module.Name}`,
			this.Name
		];

		this.TempalateCollection.GenerateOutput(unityProject, regexs, values);
	}
}