#!/usr/bin/env node

import {UnityProject} from "./src/UnityProject.js";

const project = new UnityProject();

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