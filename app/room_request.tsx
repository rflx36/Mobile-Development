import Dropdown from "@/components/dropdown";
import { realtime_database } from "@/firebase/firebase_config";
import { useGlobalStore } from "@/hooks/useGlobalStore";
import { simulate_time } from "@/modify";
import { TimeType } from "@/types/types";
import { ConvertTimeToValue, ConvertValueToTime, RevertTime } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { push, ref } from "firebase/database";
import React, { useState } from "react";
import { Image, NativeModules, Platform, Pressable, StatusBar, Text, TextInput, ToastAndroid, View } from "react-native";
import { generateRandomId } from "./_layout";








export default function Request() {
    const state = useGlobalStore();

    const room_name = state.get.view_room?.room_name;
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [section, setSection] = useState("");

    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [timeDropdownActive, setTimeDropdownActive] = useState(false);

    const { StatusBarManager } = NativeModules;
    const status_bar_height = Platform.OS === 'android' ? StatusBar.currentHeight : Platform.OS === "ios" ? StatusBarManager.getHeight(({ height }: any) => height) : 0;
    const router = useRouter();

    const time_start_value = ConvertTimeToValue(RevertTime(timeStart));
    const time_end_value = ConvertTimeToValue(RevertTime(timeEnd));

    let time_text_warn = "";

    const CheckTimeValidity = () => {
        if (timeEnd == "" || timeStart == "") {
            return false;
        }

        const list = state.get.view_room?.allocated_list || [];
        let available = true;
        for (let i = 0; i < list.length; i++) {
            const [time_start, time_end] = list[i].time.split(" - ");

            const time_start_v = ConvertTimeToValue(RevertTime(time_start));
            const time_end_v = ConvertTimeToValue(RevertTime(time_end));

            if ((time_start_value >= time_start_v && time_start_value < time_end_v) ||
                (time_end_value >= time_end_v && time_end_value < time_end_v) ||
                (time_start_value < time_start_v && time_end_value > time_start_v)
            ) {
                available = false;
                time_text_warn = "Overlaps to scheduled " + time_start + " - " + time_end;
                break;
            }
        }
        return available
    }

    if (timeStart != "" && timeEnd != "" && !(time_start_value < time_end_value)) {
        time_text_warn = (time_start_value == time_end_value) ? "End time cannot be the same as start time" : "End time cannot be earlier than start time";
    }
    const time_overlaps_scheduled = CheckTimeValidity();
    const time_valid = time_start_value < time_end_value && timeStart != "" && timeEnd != "" && time_overlaps_scheduled;
    const valid = section != "" && name != "" && time_valid;
    const SendRequest = async () => {
        if (!valid) {
            return;
        }


        let app_id = await AsyncStorage.getItem("unique_app_id");
        if (app_id == null) {
            app_id = generateRandomId();
            await AsyncStorage.setItem("unique_app_id", app_id);
        }
        const getTodayDate = () => {
            const today = new Date();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const year = String(today.getFullYear()).slice(-2);
            return `${month}-${day}-${year}`;
        };
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const request_info = {
            uid: app_id,
            room_name: room_name,
            time_start: timeStart,
            time_end: timeEnd,
            section: section,
            name: name,
            message: message,
            day_validity: getTodayDate(),
            time_requested: ConvertValueToTime(((hours * 60) + minutes))
        }
        try {
            await push(ref(realtime_database, "schedule/request"), {
                ...request_info
            })
        }
        catch (e) {
            console.log(e);
        }
        finally {
            state.get.view_room = null;
            state.set();
            router.back();
            ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);
            
        }
    }

    const GoBack = () => {
        router.back();
    }


    const GetSections = () => {
        if (!state.get.main_schedule) {
            return [];
        }
        const sections = state.get.main_schedule.inputs.map(x => ({ course: x.course, year: x.year, sections: x.sections })).flat();
        const sections_list: Array<string> = [];

        for (let i = 0; i < sections.length; i++) {

            for (let j = 0; j < sections[i].sections; j++) {
                sections_list.push(sections[i].course + " - " + sections[i].year + String.fromCharCode(96 + j + 1).toUpperCase());
            }
        }
        return sections_list;
    }


    const GetTimes = () => {
        const ConvertTime = (x: string) => {
            const [hours, minutes] = x.split(":");

            const hours_value = parseInt(hours);

            const ampm = hours_value >= 12 ? "PM" : "AM";

            const hours_format = hours_value % 12 || 12;
            return `${hours_format}:${minutes} ${ampm}`;
        }
        const TimeList = () => {
            const hours = new Date().getHours();
            const minutes = new Date().getMinutes();
            const current_time_value = (simulate_time == null) ? ((hours * 60) + minutes) : ConvertTimeToValue(simulate_time);
            const current_multiplier = Math.ceil(current_time_value / 30);
            const main_time_start = ConvertTimeToValue(state.get.main_schedule?.time_start || "00:00");
            const time_start_value = (main_time_start > current_time_value )?main_time_start: ( 30 * current_multiplier);
        
            const time_end_value = ConvertTimeToValue(state.get.main_schedule?.time_end || "00:00");
            const time_list = [];
            const total_minutes = time_end_value - time_start_value;
            const increments = 30;
            
            for (let i = 0; i <= total_minutes; i += increments) {

                const hours = Math.floor((time_start_value + i) / 60);
                const minutes = (time_start_value + i) % 60;
                const time = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

                time_list.push(ConvertTime(time));
            }
            console.log(time_end_value);
            return time_list;
        }

        return TimeList();
    }


    return (
        <View className="bg-black/95 h-full w-full">

            <View style={{ marginTop: status_bar_height }} className="  w-auto h-max">
                <View className=" h-[60] justify-start mx-[24] w-auto flex flex-row  items-center">
                    <Pressable onPressIn={GoBack} className="bg-grey-950 rounded-full -translate-x-3 p-3">
                        <Image source={require("../assets/icons/icon-arrow-back.png")} className="w-[24]  h-[15] opacity-75 " />
                    </Pressable>
                    <Text className="text-grey-400 font-manrope-semibold text-[20px]">REQUEST {room_name} </Text>
                </View>
            </View>

            <View className="w-auto mx-8">
                <View className="w-full flex-row ">
                    <View className="flex-1 mr-1" >
                        <Text className="font-manrope-semibold text-grey-600 m-1"> Start Time:</Text>
                        <Dropdown valid={time_valid} value={timeStart} onChange={x => setTimeStart(x)} options={GetTimes()} isActive={x => setTimeDropdownActive(x)} text="Set Time" />
                    </View>
                    <View className="flex-1 ml-1" >
                        <Text className="font-manrope-semibold text-grey-600 m-1"> End Time:</Text>
                        <Dropdown valid={time_valid} value={timeEnd} onChange={x => setTimeEnd(x)} options={GetTimes()} isActive={x => setTimeDropdownActive(x)} text="Set Time" />

                    </View>
                </View>
                {
                    (time_text_warn != "")
                    && (
                        <View className="w-full justify-center items-center mt-2">

                            <Text className="text-[#F57272]">{time_text_warn}</Text>
                        </View>

                    )
                }

                <Text className="font-manrope-semibold text-grey-600 m-1 mt-4">Section</Text>

                <Dropdown value={section} onChange={x => setSection(x)} options={GetSections()} isActive={() => { }} text="Select Section" valid={true} />

                <Text className="font-manrope-semibold text-grey-600 m-1 mt-4">Name</Text>
                <TextInput placeholder="Last name, first name" placeholderTextColor={"#363636"} className="text-grey-300 w-full px-3 py-2 bg-grey-900 rounded-[12px]" value={name} onChangeText={setName} />
                <Text className="font-manrope-semibold text-grey-600 m-1 mt-4">Message <Text className="text-grey-600/60 text-[12px]">(optional)</Text>  </Text>
                <TextInput style={{ textAlignVertical: "top" }} multiline={true} className="text-grey-300 w-full p-3 bg-grey-900 rounded-[12px] min-h-[150] " value={message} onChangeText={setMessage} />

                <Pressable onPress={SendRequest}>
                    <View className={((valid) ? "bg-primary" : "bg-grey-950") + "  w-full mt-4 h-[60]  rounded-[24px] items-center justify-center"}>
                        <View className="w-max flex-row items-center gap-1">

                            <Text className={"text-grey-750 text-[16px] font-manrope-bold"}>
                                Send Request
                            </Text>
                            <Image source={require("../assets/icons/icon-send-request.png")} className="w-[24] translate-y-[1px] h-[24]" />
                        </View>
                    </View>
                </Pressable>
            </View>



        </View>
    )
}