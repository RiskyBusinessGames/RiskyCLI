console.log("RiskyCLI");

const {UnityProject} = require("./src/UnityProject.js");

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

//const moduleName="Database";

//project.CreateModule(moduleName);

project.CreateModule("Services");
project.CreateService("Services", "SessionService");
project.CreateService("Services", "ScoreService");

project.CreateModule("Messaging");

project.CreateModule("UI");
project.CreateComponent("UI", "CoinsScoreUI");
project.CreateComponent("UI", "DistanceScoreUI");
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

/*

project.CreateModule("Plugins");

project.CreateModule("Core");
project.CreateService("Core", "ServiceProvider");

project.CreateModule("Tracking");
project.CreateService("Tracking", "TrackingService");
project.CreateService("Tracking", "OptitrackTrackingService");
project.CreateService("Tracking", "ViconTrackingService");
project.CreateComponent("Tracking", "PlayerTrackingComponent");

project.CreateModule("Touch");
project.CreateService("Touch", "TrackingService");
project.CreateComponent("Touch", "UGUITouchComponent");
project.CreateComponent("Touch", "2DTouchComponent");
project.CreateComponent("Touch", "3DTouchComponent");

project.CreateModule("Pcc");
project.CreateService("Pcc", "PccService");

project.CreateModule("Control");
project.CreateService("Control", "ControlService");
project.CreateComponent("Control", "RuntimeControlUIComponent");
project.CreateComponent("Control", "EditorControlUIComponent");

project.CreateModule("Communication");
project.CreateService("Communication", "FileIOService");
project.CreateService("Communication", "JsonRPCService");
project.CreateService("Communication", "WebSocketsService");

project.CreateModule("Configuration");
project.CreateService("Configuration", "PodConfigurationService");
project.CreateService("Configuration", "GameConfigurationService");
project.CreateService("Configuration", "SceneConfigurationService");

project.CreateModule("ModLoader");
project.CreateService("ModLoader", "ModLoaderService");

project.CreateModule("Messaging");
project.CreateService("Messaging", "MessageBroker");
project.CreateComponent("Messaging", "MessageTriggerComponent");

project.CreateModule("Session");
project.CreateService("Session", "SessionService");
project.CreateService("Session", "PlayerQueueService");
project.CreateService("Session", "PlayerIdentificationService");
project.CreateComponent("Session", "PlayerIdentifierComponent");

project.CreateModule("Persistence");
project.CreateService("Persistence", "PersistenceService");
project.CreateComponent("Persistence", "PersistenceComponent");

project.CreateModule("Audio");
project.CreateService("Audio", "MusicPlayerService");
project.CreateService("Audio", "UnityAudioService");
project.CreateService("Audio", "FmodAudioService");

project.CreateModule("Video");
project.CreateComponent("Video", "VideoPlayerComponent");

project.CreateModule("Content");
project.CreateService("Content", "ContentProviderService");
project.CreateService("Content", "StringContentService");
project.CreateService("Content", "AudioContentService");
project.CreateService("Content", "VideoContentService");
project.CreateService("Content", "ImageContentService");

project.CreateModule("Localization");
project.CreateService("Localization", "LocalizationService");
project.CreateService("Localization", "StringDataService");
project.CreateService("Localization", "AudioDataService");
project.CreateService("Localization", "VideoDataService");
project.CreateService("Localization", "ImageDataService");
project.CreateComponent("Localization", "LocalizedTMPComponent");
project.CreateComponent("Localization", "LocalizedAudioSourceComponent");
project.CreateComponent("Localization", "LocalizedSpriteRendererComponent");
project.CreateComponent("Localization", "LocalizedUGUIImageComponent");
project.CreateComponent("Localization", "LocalizedVideoComponent");


project.CreateModule("DataCapture");
project.CreateService("DataCapture", "DataCaptureService");
project.CreateService("DataCapture", "ScoreDataCaptureService");
project.CreateService("DataCapture", "TrackingDataCaptureService");
project.CreateService("DataCapture", "TouchDataCaptureService");


project.CreateModule("Logging");
project.CreateService("Logging", "LoggingService");

project.CreateModule("Notification");
project.CreateService("Notification", "NotificationService");
project.CreateComponent("Notification", "NotificationBarComponent");
project.CreateComponent("Notification", "NotificationPopUpComponent");


project.CreateModule("UI");
project.CreateService("UI", "UGUIManagerService");
project.CreateComponent("UI", "LayeredCanvasComponent");


project.CreateModule("Build");
project.CreateService("Build", "UnityPlayerBuildService");
project.CreateService("Build", "UMod2BuildService");
*/