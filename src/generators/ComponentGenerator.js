import {GeneratorBase} from "../baseClasses/GeneratorBase.js";
import {TemplateCollection, TemplatePaths} from "../templating/TemplateCollection.js";
import { AddComponentToInstaller} from "../utilities/InstallerUtils.js";

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
		//console.log("ComponentGenerator::ctor");
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
		
		// console.log("Component::ctor");
		// console.log("\tModule=" + this.Module.Name);
		// console.log("\tName=" + this.Name);
		// console.log("\tProject=" + this.UnityProject.Name);


		this.TempalateCollection = new TemplateCollection(
			TemplatePaths.Component,
			this.Module.ModulePath);

		this.NameSpace = `${this.UnityProject.Name}.${this.Module.Name}.Components.${this.Name}`;
		
		let regexs = [
			/{NAMESPACE}/g,
			/{NAME}/g
		];

		let values = [
			this.NameSpace,
			this.Name
		];

		this.TempalateCollection.GenerateOutput(unityProject, regexs, values);

		AddComponentToInstaller(this.Module.InstallerPath, this);
	}
}