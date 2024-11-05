import { Stack, Tabs } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import useFonts from "@/hooks/useFonts";
import { FetchScheduleMain } from "@/firebase/firebase_fetch_main";
import { useGlobalStore } from "@/hooks/useGlobalStore";


export default function RootLayout() {
    const state = useGlobalStore();
    const [appIsReady, setAppIsReady] = useState(false);
   

    console.log(appIsReady);
    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                await useFonts();
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                // await new Promise(resolve => setTimeout(resolve, 2000));

                const schedule_main = await FetchScheduleMain();
                state.get.main_schedule = schedule_main;
                state.set();
                // console.log(temp);
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
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
        <Stack >
            <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        </Stack>
    )
}