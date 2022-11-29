console.log("RiskyCLI");

const {UnityProject} = require("./src/UnityProject.js");

/*
let projectConfig=
    {
        name: "NFTGames",
        projectPaths: {
            Content: "{projectRoot}/Assets/Content",
            Scenes:  "{projectRoot}/Assets/Scenes",
            Source:  "{projectRoot}/Assets/Plugins",
            Modules: "{projectRoot}/Assets/Plugins/RiskyTools"
        }
    }

let project = new UnityProject(projectConfig);
project.CreateModule("EditorTools");
*/

let projectConfig=
{
    name: "RiskyBusiness.IdleCommander",
    projectPaths: {
        Content: "{projectRoot}/Assets/Content",
        Scenes:  "{projectRoot}/Assets/Scenes",
        Source:  "{projectRoot}/Assets/Source/",
        Modules: "{projectRoot}/Assets/Source/Modules"
    }
}

let project = new UnityProject(projectConfig);

project.CreateModule("Data");
project.CreateService("Data", "AssetData");


