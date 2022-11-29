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
    name: "NFTGames",
    projectPaths: {
        Content: "{projectRoot}/Assets/Content",
        Scenes:  "{projectRoot}/Assets/Scenes",
        Source:  "{projectRoot}/Assets/NFTGames",
        Modules: "{projectRoot}/Assets/NFTGames/Common"
    }
}

let project = new UnityProject(projectConfig);

project.CreateModule("Services");
project.CreateService("Services", "SessionService");
project.CreateService("Services", "ScoreService");

project.CreateModule("Messaging");

project.CreateModule("UI");
project.CreateComponent("UI", "ScoreUI");
project.CreateComponent("UI", "AvatarSelectUI");
project.CreateComponent("UI", "GameStartScreenUI");
project.CreateComponent("UI", "GameOverScreenUI");

project.CreateModule("Components");
project.CreateComponent("Components", "Coin");
project.CreateComponent("Components", "Player");
project.CreateComponent("Components", "Level");
project.CreateComponent("Components", "Obstacle");
project.CreateComponent("Components", "EventZone");

project.CreateModule("Input");
project.CreateService("Input", "MouseInputService");
project.CreateService("Input", "TouchInputService");
project.CreateService("Input", "KeyboardInputService");

project.CreateModule("NFTAPI");
project.CreateModule("Ads");


projectConfig=
    {
        name: "NFTGames",
        projectPaths: {
            Content: "{projectRoot}/Assets/Content",
            Scenes:  "{projectRoot}/Assets/Scenes",
            Source:  "{projectRoot}/Assets/NFTGames/MiniGames",
            Modules: "{projectRoot}/Assets/NFTGames/MiniGames"
        }
    }

project = new UnityProject(projectConfig);

project.CreateModule("EndlessRunner");
project.CreateModule("DoodleJump");
project.CreateModule("MiniMatch");
project.CreateModule("FlappyBird");
