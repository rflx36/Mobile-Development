import React from "react";
import { Image, Pressable, Text, View } from "react-native";



interface ITabBarButton {
    onPress: () => void,
    onLongPress: () => void,
    isFocused: boolean,
    routeName: string,
}

export default function TabBarButton(props: ITabBarButton) {

    return (
        <Pressable
            onPressIn={props.onPress}
            onLongPress={props.onLongPress}
            className=" flex items-center flex-grow h-full "
        >
            <View className="h-[10]"></View>
            {(props.routeName == "index") ?
                (props.isFocused) ?
                    <Image source={require("../assets/icons/icon-home-active.png")} className="w-[24] h-[25] " /> :
                    <Image source={require("../assets/icons/icon-home.png")} className="w-[24] h-[25] " />
                : <></>}


            {(props.routeName == "search") ?
                (props.isFocused) ?
                    <Image source={require("../assets/icons/icon-search-active.png")} className="w-[24] h-[24] " /> :
                    <Image source={require("../assets/icons/icon-search.png")} className="w-[24] h-[24] " />
                : <></>}
            {(props.routeName == "schedule") ?
                (props.isFocused) ?
                    <Image source={require("../assets/icons/icon-timetable-active.png")} className="w-[24] h-[24] " /> :
                    <Image source={require("../assets/icons/icon-timetable.png")} className="w-[24] h-[24] " />
                : <></>}
            {(props.routeName == "widget") ?
                (props.isFocused) ?
                    <Image source={require("../assets/icons/icon-widget-active.png")} className="w-[24] h-[24] " /> :
                    <Image source={require("../assets/icons/icon-widget.png")} className="w-[24] h-[24] " />
                : <></>}
            {(props.isFocused) ?
                <Image source={require("../assets/icons/icon-tab-active.png")} className="w-[6] h-[6] mt-[5]"/>
                :
                <></>
            }
        </Pressable>
    )
}