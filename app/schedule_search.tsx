import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useRouter } from "expo-router";
import { Dimensions, Image, NativeModules, NativeScrollEvent, NativeSyntheticEvent, Platform, Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DataFiltered, InstructorSessionSchedule, RoomSessionSchedule, ScheduleFilterType, TimeType, WeekType, YearSessionSchedule } from "@/types/types";
import { ConvertTimeToValue, ConvertValueToTime } from "@/utils";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";







export default function ViewSchedule() {
    const state = useGlobalStore();
    const router = useRouter();
    const { StatusBarManager } = NativeModules;
    const status_bar_height = Platform.OS === 'android' ? StatusBar.currentHeight : Platform.OS === "ios" ? StatusBarManager.getHeight(({ height }: any) => height) : 0;
    const schedule_search_title = state.get.view_schedule!.selected;
    const { height, width } = Dimensions.get('window');
    const bottom_sheet_ref_schedule = useRef<BottomSheet>(null);

    useEffect(() => {
        const highlighted = state.get.view_schedule?.highlighted_id != "";
        if (highlighted) {
            bottom_sheet_ref_schedule.current?.collapse()
        }
        else {
            bottom_sheet_ref_schedule.current?.close()

        }
    }, [state.get.view_schedule?.highlighted_id])

    const GoBack = () => {
        router.back();
    }

    const Getinfo = async () => {
        const log = await AsyncStorage.getItem("current-linked-schedule") || "";

    }

    Getinfo();
    const LinkSchedule = () => {
        if (!state.get.view_schedule) {
            return;
        }

        const storeData = async (value: any) => {
            try {
                await AsyncStorage.setItem("current-linked-schedule", value);
            }
            catch (e) {
                console.log(e);
            }
        }
        const linked_schedule = {
            selected: state.get.view_schedule.selected,
            data: state.get.view_schedule.data
        }
        storeData(JSON.stringify(linked_schedule));
        state.get.linked_schedule = linked_schedule;
        state.set();
        router.replace("/schedule");

    }
    const ConvertTime = (x: string) => {
        const [hours, minutes] = x.split(":");

        const hours_value = parseInt(hours);

        const ampm = hours_value >= 12 ? "PM" : "AM";

        const hours_format = hours_value % 12 || 12;
        return `${hours_format}:${minutes} ${ampm}`;
    }
    const TimeList = () => {

        const time_start_value = ConvertTimeToValue(state.get.view_schedule?.time_start || "00:00");
        const time_end_value = ConvertTimeToValue(state.get.view_schedule?.time_end || "00:00");
        const time_list = [];
        const total_hours = Math.floor((time_end_value - time_start_value) / 60);
        for (let i = 0; i <= total_hours; i++) {
            const time = Math.ceil(time_start_value / 60);
            time_list.push(ConvertTime(`${String(i + time).padStart(2, '0')}:00`));
        }
        return time_list;
    }
    const time_list = TimeList();
    const screenWidth = Dimensions.get('window').width;
    const calculatedWidth = (screenWidth - 50) * 2;


    const content_height = time_list.length * 50;

    let combined: Array<InstructorSessionSchedule | RoomSessionSchedule | YearSessionSchedule> = [];
    const x = state.get.view_schedule!.data;
    if (x.monday_schedule) {
        combined = [...combined, ...x.monday_schedule];
    }
    if (x.tuesday_schedule) {
        combined = [...combined, ...x.tuesday_schedule];
    }
    if (x.wednesday_schedule) {
        combined = [...combined, ...x.wednesday_schedule];
    }
    if (x.thursday_schedule) {
        combined = [...combined, ...x.thursday_schedule];
    }
    if (x.friday_schedule) {
        combined = [...combined, ...x.friday_schedule];
    }
    if (x.saturday_schedule) {
        combined = [...combined, ...x.saturday_schedule];
    }
    const filter_type = state.get.view_schedule!.filter_type;
    const show_availability = state.get.view_schedule!.view_availability;
    // const show_availability = true;
    const filtered_sections = [... new Set(combined.map(day => (filter_type == "section") ? (day.subject.code) : (day.course.code + " - " + day.section)))];


    return (
        <GestureHandlerRootView className="bg-black/95 h-full w-full  ">

            <View style={{ marginTop: status_bar_height }} className="  w-auto h-max">
                <View className=" h-[60] justify-start mx-[24] w-auto flex flex-row  items-center">
                    <Pressable onPressIn={GoBack} className="bg-grey-950 rounded-full -translate-x-3 p-3">
                        <Image source={require("../assets/icons/icon-arrow-back.png")} className="w-[24]  h-[15] opacity-75 " />
                    </Pressable>
                    <Text className="text-grey-400 font-manrope-semibold text-[24px]">{schedule_search_title}</Text>
                </View>

                <ScrollView style={{ maxHeight: (height - 194) }} className=" flex overflow-scroll mt-[20]">
                    <RenderSchedule
                    time_list={TimeList()}
                    filtered_sections={filtered_sections}
                    width={calculatedWidth}
                    height={content_height}
                    data={state.get.view_schedule!.data}
                    availability={false}
                    filter_type={filter_type}
                    />
                </ScrollView>


                <Pressable onPress={LinkSchedule} className="my-[12] mx-[24] mb-[42] bg-primary w-auto flex items-center justify-center rounded-[24px] h-[60]" >
                    <View className="w-max flex-row items-center gap-2">

                        <Text className="text-grey-900 text-[16px] font-manrope-bold">
                            Link Schedule
                        </Text>
                        <Image source={require("../assets/icons/icon-link-schedule.png")} className="w-[17] translate-y-[2px] h-[17]" />
                    </View>
                </Pressable>


                <BottomSheet index={-1} snapPoints={["30%", "50%"]} enablePanDownToClose={true} ref={bottom_sheet_ref_schedule} handleIndicatorStyle={{ backgroundColor: "#A3A3A3" }} backgroundStyle={{ backgroundColor: '#1A1A1A' }}>
                    <BottomSheetView >
                        <View className="border border-grey-750/50 h-max w-auto mx-4 rounded-lg">
                            <View className="m-1 flex-row justify-between ">
                                <View className="flex-1 ">
                                    <Text className="text-grey-500 font-manrope-semibold m-1">Section:</Text>
                                    <Text className="text-grey-500 font-manrope-semibold m-1">Subject:</Text>
                                    <Text className="text-grey-500 font-manrope-semibold m-1">Instructor:</Text>
                                    <Text className="text-grey-500 font-manrope-semibold m-1">Time:</Text>
                                    <Text className="text-grey-500 font-manrope-semibold m-1">Room:</Text>

                                </View>
                                <View className="flex-1 ">
                                    <Text className="text-grey-300 font-manrope-semibold m-1">{state.get.view_schedule?.highlighted_info?.section}</Text>
                                    <Text className="text-grey-300 font-manrope-semibold m-1">{state.get.view_schedule?.highlighted_info?.subject}</Text>
                                    <Text className="text-grey-300 font-manrope-semibold m-1">{state.get.view_schedule?.highlighted_info?.instructor}</Text>
                                    <Text className="text-grey-300 font-manrope-semibold m-1">{state.get.view_schedule?.highlighted_info?.time}</Text>
                                    <Text className="text-grey-300 font-manrope-semibold m-1">{state.get.view_schedule?.highlighted_info?.room}</Text>
                                </View>
                            </View>

                        </View>
                    </BottomSheetView>
                </BottomSheet>
            </View>

        </GestureHandlerRootView>
    )
}



const RenderSchedule = React.memo((props: { time_list: Array<string>, filtered_sections: Array<string>, width: number, height: number, data: DataFiltered, availability: boolean, filter_type: ScheduleFilterType }) => {
    //height = content height
    // width =  calculatedWidth
    return (

        <View className="h-max w-full flex-row">
            <View className="w-[60] ">
                <View className="h-[30]" />
                <View className="h-max border-r border-r-[#252525]">

                    {
                        props.time_list.map((x, i) => {
                            return (
                                <View key={i} className="w-full relative" >

                                    <View className=" w-[50] flex flex-col items-end justify-center h-[50]  " >
                                        <Text className=" text-grey-750 text-right font-manrope-bold text-[10px] ">{x}</Text>
                                    </View>
                                    <View className={"bg-grey-900 w-[16] h-[2] rounded-full -bottom-[1] right-[8] absolute"} />
                                </View>
                            )
                        })
                    }
                </View>
                <View className="h-[30]" />
            </View>
            <ScrollView horizontal={true}  >

                <View className=" h-full flex-row" style={{ width: props.width }}>
                    <View className="flex-1 justify-between   ">
                        <View className="w-full h-[30] flex justify-center ">
                            <Text className="text-center self-center font-manrope-bold text-grey-600">Monday</Text>
                        </View>
                        <View className="w-full border border-l-0 border-white/10" style={{ height: props.height }}>
                            {props.data.monday_schedule?.map((indicator_x, indicator_i) => <TimeAllocatedIndicator filter={props.filter_type} availability={props.availability} key={indicator_i} id={"m" + indicator_i} info={indicator_x} type={props.filtered_sections.indexOf((props.filter_type == "section") ? indicator_x.subject.code : indicator_x.course.code + " - " + indicator_x.section)} />)}
                        </View>
                        <View className="w-full h-[30]  flex justify-center">
                            <Text className="text-center self-center font-manrope-bold text-grey-600">Monday</Text>
                        </View>
                    </View>
                    <View className="flex-1 justify-between">
                        <View className="w-full h-[30] flex justify-center">
                            <Text className="text-center self-center font-manrope-bold text-grey-600">Tuesday</Text>
                        </View>
                        <View className="w-full border border-l-0 border-white/10" style={{ height: props.height }}>
                            {props.data.tuesday_schedule?.map((indicator_x, indicator_i) => <TimeAllocatedIndicator filter={props.filter_type} availability={props.availability} key={indicator_i} id={"t" + indicator_i} info={indicator_x} type={props.filtered_sections.indexOf((props.filter_type == "section") ? indicator_x.subject.code : indicator_x.course.code + " - " + indicator_x.section)} />)}

                        </View>
                        <View className="w-full h-[30] flex justify-center">
                            <Text className="text-center self-center font-manrope-bold text-grey-600">Tuesday</Text>
                        </View>
                    </View>
                    <View className="flex-1 justify-between">
                        <View className="w-full h-[30] flex justify-center">
                            <Text className="text-center self-center font-manrope-bold text-grey-600">Wednesday</Text>
                        </View>
                        <View className="w-full border border-l-0 border-white/10" style={{ height: props.height }}>
                            {props.data.wednesday_schedule?.map((indicator_x, indicator_i) => <TimeAllocatedIndicator filter={props.filter_type} availability={props.availability} key={indicator_i} id={"w" + indicator_i} info={indicator_x} type={props.filtered_sections.indexOf((props.filter_type == "section") ? indicator_x.subject.code : indicator_x.course.code + " - " + indicator_x.section)} />)}

                        </View>
                        <View className="w-full h-[30] flex justify-center">
                            <Text className="text-center self-center font-manrope-bold text-grey-600">Wednesday</Text>
                        </View>
                    </View>
                    <View className="flex-1 justify-between">
                        <View className="w-full h-[30] flex justify-center">
                            <Text className="text-center self-center font-manrope-bold text-grey-600">Thursday</Text>
                        </View>
                        <View className="w-full border border-l-0 border-white/10" style={{ height: props.height }}>
                            {props.data.thursday_schedule?.map((indicator_x, indicator_i) => <TimeAllocatedIndicator filter={props.filter_type} availability={props.availability} key={indicator_i} id={"th" + indicator_i} info={indicator_x} type={props.filtered_sections.indexOf((props.filter_type == "section") ? indicator_x.subject.code : indicator_x.course.code + " - " + indicator_x.section)} />)}

                        </View>
                        <View className="w-full h-[30] flex justify-center">
                            <Text className="text-center self-center font-manrope-bold text-grey-600">Thursday</Text>
                        </View>
                    </View>
                    <View className="flex-1 justify-between">
                        <View className="w-full h-[30] flex justify-center">
                            <Text className="text-center self-center font-manrope-bold text-grey-600">Friday</Text>
                        </View>
                        <View className="w-full border border-l-0 border-white/10" style={{ height: props.height }}>
                            {props.data.friday_schedule?.map((indicator_x, indicator_i) => <TimeAllocatedIndicator filter={props.filter_type} availability={props.availability} key={indicator_i} id={"f" + indicator_i} info={indicator_x} type={props.filtered_sections.indexOf((props.filter_type == "section") ? indicator_x.subject.code : indicator_x.course.code + " - " + indicator_x.section)} />)}

                        </View>
                        <View className="w-full h-[30] flex justify-center">
                            <Text className="text-center self-center font-manrope-bold text-grey-600">Friday</Text>
                        </View>
                    </View>
                    <View className="flex-1 justify-between">
                        <View className="w-full h-[30] flex justify-center">
                            <Text className="text-center self-center font-manrope-bold text-grey-600">Saturday</Text>
                        </View>
                        <View className="w-full border border-l-0 border-white/10" style={{ height: props.height }}>
                            {props.data.saturday_schedule?.map((indicator_x, indicator_i) => <TimeAllocatedIndicator filter={props.filter_type} availability={props.availability} key={indicator_i} id={"s" + indicator_i} info={indicator_x} type={props.filtered_sections.indexOf((props.filter_type == "section") ? indicator_x.subject.code : indicator_x.course.code + " - " + indicator_x.section)} />)}

                        </View>
                        <View className="w-full h-[30] flex justify-center">
                            <Text className="text-center self-center font-manrope-bold text-grey-600">Saturday</Text>
                        </View>
                    </View>
                    <View className="w-[20]" />
                </View>
            </ScrollView>
        </View>
    )
})




function TimeAllocatedIndicator(props: { info: InstructorSessionSchedule | RoomSessionSchedule | YearSessionSchedule, type: number, id: string, availability: boolean, filter: ScheduleFilterType }) {
    const state = useGlobalStore();
    const time_start = props.info.time_start;
    const time_end = props.info.time_end;
    let info_text = "";
    let sub_text = "";
    let sub_info_1 = "";
    let sub_info_2 = "";
    const schedule = state.get.view_schedule;
    switch (props.filter) {
        case "room":
            const data_room = props.info as RoomSessionSchedule;
            info_text = data_room.subject.code;
            sub_text = data_room.instructor.first_name + " " + data_room.instructor.last_name;
            sub_info_1 = data_room.instructor.first_name + " " + data_room.instructor.last_name;
            sub_info_2 = schedule!.selected;
            break;
        case "instructor":
            const data_instructor = props.info as InstructorSessionSchedule;
            info_text = data_instructor.subject.code;
            sub_text = data_instructor.room;
            sub_info_1 = schedule!.selected;
            sub_info_2 = data_instructor.room;
            break;
        case "section":
            const data_section = props.info as YearSessionSchedule;
            info_text = data_section.subject.code;
            sub_text = data_section.instructor.first_name + " " + data_section.instructor.last_name;
            sub_info_1 = data_section.instructor.first_name + " " + data_section.instructor.last_name;
            sub_info_2 = data_section.room;
            break;
    }



    const session_time_start = ConvertTimeToValue(schedule!.time_start)
    const style_time_length = ((ConvertTimeToValue(time_end)) + 1) - (ConvertTimeToValue(time_start));
    const style_length = (style_time_length / 30) * 25;
    const style_start = ((ConvertTimeToValue(time_start) - session_time_start) / 30) * 25;



    const ConvertTime = (x: TimeType, add?: number) => {
        let time = x;
        if (add != undefined) {
            const time_value = ConvertTimeToValue(x) + add;
            time = ConvertValueToTime(time_value);
        }
        const [hours, minutes] = time.split(":");

        const hours_value = parseInt(hours);
        const ampm = hours_value >= 12 ? "PM" : "AM";

        const hours_format = hours_value % 12 || 12;
        return `${hours_format}:${minutes} ${ampm}`;
    }
    const GetStyle = () => {
        let style_bg = "bg-[#E9AA96]";
        switch (props.type) {
            case 1:
                style_bg = "bg-[#C185A2]";
                break;
            case 2:
                style_bg = "bg-[#6962AD]";
                break;
            case 3:
                style_bg = "bg-[#3B48DC]";
                break;
            case 4:
                style_bg = "bg-[#258EFF]";
                break;
            case 5:
                style_bg = "bg-[#37C9E7]";
                break;
            case 6:
                style_bg = "bg-[#45E4A6]";

        }
        return `${style_bg}`;
    }
    const GetLayout = () => {
        return "";
        // return (props.availability) ? "" : "bg-grey-100 border-b border-b-grey-300 ";
    }

    const ViewInfo = () => {
        state.get.view_schedule!.highlighted_id = (schedule!.highlighted_id == props.id) ? "" : props.id;
        state.get.view_schedule!.highlighted_info = {
            section: props.info.course.code + " " + props.info.section,
            subject: props.info.subject.code,
            instructor: sub_info_1,
            time: ConvertTime(props.info.time_start) + " - " + ConvertTime(props.info.time_end, 1),
            room: sub_info_2
        }
        state.set();
    }
    const highlighted = state.get.view_schedule?.highlighted_id == props.id;
    return (
        <View style={{ height: style_length, top: style_start }} className={GetLayout() + "  absolute w-full h-full  rounded-[3px] flex items-center justify-center"}>
            <Pressable onPress={ViewInfo} className={" flex-1 flex-row m-1 relative  text-center"}>
                <View className={GetStyle() + " absolute w-full h-full rounded-lg " + ((highlighted) ? "opacity-75" : "opacity-50 ")} />
                <View className="w-full items-center justify-center">

                    <Text className={" text-[12px] font-manrope-bold text-center "}>{info_text}</Text>
                    <Text className={"text-[10px] font-manrope-medium text-center "}>{sub_text}</Text>
                </View>

            </Pressable>
        </View >
    )
}
