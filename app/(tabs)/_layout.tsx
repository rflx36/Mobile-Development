import TabBar from "@/components/tab_bar";
import { Tabs } from "expo-router";
import { NativeModules, Platform, StatusBar, StyleSheet, Text } from "react-native";




export default function TabLayout() {
    const { StatusBarManager } = NativeModules;

    const header_theme = (true) ? "black" : "white";

    const status_bar_height = Platform.OS === 'android' ? StatusBar.currentHeight : Platform.OS === "ios" ? StatusBarManager.getHeight(({ height }: any) => height) : 0;

    const header = {
        headerStyle: {
            height: status_bar_height,
            backgroundColor: header_theme
        },
        
        
    }
    return (
        <Tabs tabBar={props => <TabBar {...props} />} >
            <Tabs.Screen name="index" options={header} />
            <Tabs.Screen name="search" options={header} />
            <Tabs.Screen name="schedule" options={header} />
            <Tabs.Screen name="widget" options={header} />
        </Tabs>
    )
}
