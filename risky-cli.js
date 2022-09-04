#!/usr/bin/env node

import {UnityProject} from "./src/UnityProject.js";

const project = new UnityProject();

const moduleName = "HelloWorldModule";
const serviceName= "GreetingService";

project.CreateModule(moduleName);
project.CreateService(moduleName, serviceName);