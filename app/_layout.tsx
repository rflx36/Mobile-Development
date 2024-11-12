import { Stack } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import useFonts from "@/hooks/useFonts";
import { FetchScheduleMain } from "@/firebase/firebase_fetch_main";
import { useGlobalStore } from "@/hooks/useGlobalStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function generateRandomId(length = 64) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export default function RootLayout() {
    const state = useGlobalStore();
    const [appIsReady, setAppIsReady] = useState(false);


    console.log(appIsReady);
    useEffect(() => {
        async function prepare() {
            try {
                await useFonts();



                const schedule_main = await FetchScheduleMain();
                const schedule_linked = await AsyncStorage.getItem("current-linked-schedule");

                const app_id = await AsyncStorage.getItem("unique_app_id");
                if (app_id == null) {
                    await AsyncStorage.setItem("unique_app_id", generateRandomId());
                }
                state.get.linked_schedule = (schedule_linked != null) ? JSON.parse(schedule_linked) : null;
                state.get.main_schedule = schedule_main;

                state.set();
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }
    return (
        <Stack
            screenOptions={{
                animation: 'fade_from_bottom',
            }}
        >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="schedule_search" options={{ headerShown: false }} />
            <Stack.Screen name="room_request" options={{ headerShown: false }} />
            <Stack.Screen name="room_request_list" options={{headerShown:false}} />
        </Stack>
    )
}