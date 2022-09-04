#!/usr/bin/env node

import {UnityProject} from "./src/UnityProject.js";

const project = new UnityProject();

const moduleName = "HelloWorldModule";
const serviceName= "GreetingService";
const componentName= "Potato";

project.CreateModule(moduleName);
project.CreateComponent(moduleName, componentName);
project.CreateService(moduleName, serviceName);