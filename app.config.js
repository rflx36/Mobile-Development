export default{
  "expo": {
    "name": "Smartsched",
    "slug": "Mobile-Development",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/main_splash_screen.png",
      "resizeMode": "contain",
      "backgroundColor": "#0D0D0D"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/icons/icon-smartsched.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.smartsched.mobile",
      "googleServicesFile": "./google-services.json"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-font",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ],
      "@react-native-firebase/app"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "eas": {
        "projectId": "e9b74d5d-3cc1-443f-ad0c-4a9f0e003811"
      }
    },
    "owner": "rflx3608"
  },
  
}