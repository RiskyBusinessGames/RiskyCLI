#!/usr/bin/env node

import {UnityProject} from "./src/UnityProject.js";

const project = new UnityProject();

project.CreateModule("HelloWorldModule");