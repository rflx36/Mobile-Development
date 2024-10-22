import '@expo/metro-runtime';

import { App } from 'expo-router/build/qualified-entry';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';
// import {registerRootComponent} from "expo";
import { registerWidgetTaskHandler } from "react-native-android-widget";

// import App from "./app/_layout";
import { widgetTaskHandler } from "./widgets/widget_task_handler";

// registerRootComponent(App);

registerWidgetTaskHandler(widgetTaskHandler)
renderRootComponent(App);




// This file should only import and register the root. No components or exports
// should be added here.