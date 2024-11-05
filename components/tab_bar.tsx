import { SafeAreaView, Text, View } from 'react-native';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from './tab_bar_button';
import React from 'react';

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {


    return (
        <>
            <View className='bg-grey-900 absolute z-50 bottom-[55] h-[1] w-full' />
            <View className='absolute justify-evenly z-50 items-center w-full h-[55]  bg-grey-950  flex flex-row bottom-[0]'>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TabBarButton
                            key={route.name}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            isFocused={isFocused}
                            routeName={route.name}
                        />
                    );
                })}
            </View>
        </>
    );
}
