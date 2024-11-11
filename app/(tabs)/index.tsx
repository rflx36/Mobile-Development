import GradientText from "@/components/text_gradient";
import ToggleSwitch from "@/components/toggle_switch";
import { useGlobalStore } from "@/hooks/useGlobalStore";
import { simulate_day, simulate_time } from "@/modify";
import { InstructorSessionSchedule, RoomSessionSchedule, TimeType, WeekType, YearSessionSchedule } from "@/types/types";
import { ConvertTimeToValue, ConvertValueToTime } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Dimensions, Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";



export default function Home() {
    const state = useGlobalStore();
    const router = useRouter();


    const [schedule, setSchedule] = useState(state.get.linked_schedule);
    const [linkHovered, setLinkHovered] = useState(false);
    const SetLink = () => {
        setLinkHovered(false)
        router.replace("./search");
    }
    const getWeekday = () => {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const today = new Date();
        const dayName = (simulate_day == null) ? daysOfWeek[today.getDay()] : simulate_day;

        return dayName;
    };

    const [currentDay, setCurrentDay] = useState(getWeekday());

    const getMonth = () => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const today = new Date();
        const monthName = months[today.getMonth()];
        return monthName;
    };

    const today_month = getMonth();
    const today_day = (simulate_day == null) ? ((new Date()).getDate()).toString() : "SIMULATING";
    const today_weekday = getWeekday();


    const [info, setInfo] = useState("");

    const GetCurrentData = () => {
        const schedule = state.get.linked_schedule?.data;
        switch (currentDay) {
            case "Monday":
                return (schedule?.monday_schedule != undefined) ? schedule.monday_schedule : [];
            case "Tuesday":
                return (schedule?.tuesday_schedule != undefined) ? schedule.tuesday_schedule : [];
            case "Wednesday":
                return (schedule?.wednesday_schedule != undefined) ? schedule.wednesday_schedule : [];
            case "Thursday":
                return (schedule?.thursday_schedule != undefined) ? schedule.thursday_schedule : [];
            case "Friday":
                return (schedule?.friday_schedule != undefined) ? schedule.friday_schedule : [];
            case "Saturday":
                return (schedule?.saturday_schedule != undefined) ? schedule.saturday_schedule : [];
            default:
                return [];
        }
    }
    const data = GetCurrentData();


    return (
        <View className="bg-black/95 h-full w-full ">
            <View className="mx-[24] w-auto">

                <View className=" h-[60] justify-center  flex items-end">
                    <Text className="text-grey-400 font-manrope-semibold text-[24px]">Today</Text>
                </View>
                <View className="h-max justify-center flex items-end">
                    <Text className="text-grey-750 text-[12] font-manrope-semibold">{today_month}, {today_day} {today_weekday}</Text>
                </View>
            </View>
            <Text className="text-white">{info}</Text>
            {
                (schedule) ?
                    (
                        <>
                            <View className="flex-row w-auto mx-4 mb-5 justify-evenly">
                                <Pressable className=" h-[30] justify-center flex-1 items-center" onPress={() => setCurrentDay("Monday")}>
                                    <Text className={((currentDay == "Monday") ? "text-grey-400" : "text-grey-750") + "  font-manrope-semibold"}>M</Text>
                                </Pressable>
                                <Pressable className=" h-[30] justify-center flex-1 items-center" onPress={() => setCurrentDay("Tuesday")}>
                                    <Text className={((currentDay == "Tuesday") ? "text-grey-400" : "text-grey-750") + "  font-manrope-semibold"}>T</Text>
                                </Pressable>
                                <Pressable className=" h-[30] justify-center flex-1 items-center" onPress={() => setCurrentDay("Wednesday")}>
                                    <Text className={((currentDay == "Wednesday") ? "text-grey-400" : "text-grey-750") + "  font-manrope-semibold"}>W</Text>
                                </Pressable>
                                <Pressable className=" h-[30] justify-center flex-1 items-center" onPress={() => setCurrentDay("Thursday")}>
                                    <Text className={((currentDay == "Thursday") ? "text-grey-400" : "text-grey-750") + "  font-manrope-semibold"}>T</Text>
                                </Pressable>
                                <Pressable className=" h-[30] justify-center flex-1 items-center" onPress={() => setCurrentDay("Friday")}>
                                    <Text className={((currentDay == "Friday") ? "text-grey-400" : "text-grey-750") + "  font-manrope-semibold"}>F</Text>
                                </Pressable>
                                <Pressable className=" h-[30] justify-center flex-1 items-center" onPress={() => setCurrentDay("Saturday")}>
                                    <Text className={((currentDay == "Saturday") ? "text-grey-400" : "text-grey-750") + "  font-manrope-semibold"}>S</Text>
                                </Pressable>

                            </View>

                            <ScheduledTimeListContainer data={data} is_today={(currentDay == getWeekday())} />
                        </>
                    )
                    :
                    (
                        <View className="w-full justify-center flex-1  items-center  flex">
                            <View className="w-full items-center h-max ">

                                <Image className="w-[220] bg-cover h-[144]" source={require("../../assets/images/schedule-empty.png")} />
                                <View>

                                    <Text className="mt-[45] text-[16] w-[170] text-center font-manrope-semibold text-grey-400">
                                        Oops, looks like your schedule's feeling a {"\n"} little lonely!
                                    </Text>
                                </View>
                                <Pressable onPressIn={() => setLinkHovered(true)} onPress={SetLink} onPressOut={SetLink} className={"h-[50] mt-[65] w-[200] pt-[5] rounded-full justify-center items-center " + ((linkHovered) ? "bg-grey-750/60 scale-95 " : "bg-grey-950 ")}>
                                    <GradientText
                                        text="Let's link up"
                                        fontSize={20}
                                    />

                                </Pressable>
                            </View>

                        </View>

                    )
            }

        </View>
    )
}

function ScheduledTimeListContainer(props: { data: Array<InstructorSessionSchedule | RoomSessionSchedule | YearSessionSchedule>, is_today: boolean }) {
    const [minutes, setMinutes] = useState(new Date().getMinutes());
    const [hours, setHours] = useState(new Date().getHours());
    const state = useGlobalStore();

    useEffect(() => {
        if (!props.is_today) {
            return;
        }
        const interval = setInterval(() => {
            setMinutes(new Date().getMinutes());
            setHours(new Date().getHours());
        }, 30000);
        return () => clearInterval(interval);
    }, [props.is_today])

    function ConvertMinutesToTimeString(minutes: number) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        const hourString = hours > 0 ? `${hours} hr${hours !== 1 ? 's' : ''}` : '';
        const minString = mins > 0 ? `${mins} min${mins !== 1 ? 's' : ''}` : '';

        return [hourString, minString].filter(Boolean).join(' ');
    }
    const ConvertTime = (x: TimeType) => {
        const [hours, minutes] = x.split(":");

        const hours_value = parseInt(hours);

        const ampm = hours_value >= 12 ? "PM" : "AM";

        const hours_format = hours_value % 12 || 12;
        return `${hours_format}:${minutes} ${ampm}`;
    }


    const info_1 = "TEST DATA";
    const info_2 = "TEST DATA";



    let following_initiated = false;
    let current_initiated = false;
    const time_list_data_sorted = props.data.sort((a, b) => ConvertTimeToValue(a.time_start) - ConvertTimeToValue(b.time_start));
    const schedule_height = Dimensions.get("screen").height - 290;

    // console.log(schedule_height);
    let past = 0;
    const scroll_view_ref = useRef<ScrollView | null>(null);

    useEffect(() => {
        scroll_view_ref.current?.scrollTo({ y: ((past - 1) * 71), x: 0 });
    }, [])


    return (
        <View>
            <ScrollView ref={scroll_view_ref} style={{ height: schedule_height }} className="  border-y border-y-grey-900">
                <View className="h-[10]" />
                <View className="" style={{ height: schedule_height + (time_list_data_sorted.length * 71) }}>

                    {
                        time_list_data_sorted.map((x, i) => {

                            const time_start_value = ConvertTimeToValue(x.time_start);
                            const time_end_value = ConvertTimeToValue(x.time_end) + 1;


                            const time_end_text = ConvertValueToTime(time_end_value);
                            // const current_time_value = ((hours * 60) + minutes);
                            const current_time_value = (simulate_time == null) ? ((hours * 60) + minutes) : ConvertTimeToValue(simulate_time);

                            // const current_time_value = 660; 
                            let type = "default";
                            let is_current = false;
                            let time_elapsed = "";
                            let time_remaining = "";
                            let time_following = "";



                            if (props.is_today) {


                                if (!current_initiated) {
                                    is_current = (current_time_value >= time_start_value && time_end_value > current_time_value);
                                    if (is_current) {
                                        current_initiated = true;
                                        type = "active";
                                        time_elapsed = ConvertMinutesToTimeString(current_time_value - time_start_value);
                                        time_remaining = ConvertMinutesToTimeString(time_end_value - current_time_value);
                                    }
                                }

                                if (!is_current && current_time_value < time_start_value && !following_initiated) {
                                    if (!current_initiated) {
                                        is_current = true;

                                    }
                                    time_following = ConvertMinutesToTimeString(time_start_value - current_time_value);
                                    following_initiated = true;
                                    type = "following";
                                }
                            }
                            const dat = props;
                            // console.log(state.get.linked_schedule?.selected);

                            if (!(current_initiated || following_initiated)) {
                                past++;
                            }

                            if ((i + 1) == time_list_data_sorted.length) {
                                scroll_view_ref.current?.scrollTo({ y: ((past - 1) * 71), x: 0 });
                            }
                            return (
                                <ScheduledTimeList
                                    session_start={ConvertTime(x.time_start)}
                                    session_end={ConvertTime(time_end_text)}
                                    is_current={is_current}
                                    key={i}
                                    subject_title={x.subject.title}
                                    subject_code={x.subject.code}
                                    info_1={info_1}
                                    info_2={info_2}
                                    type={type}
                                    time_elapsed={time_elapsed}
                                    time_remaining={time_remaining}
                                    time_following={time_following}
                                    past={current_initiated}
                                />
                            )
                        })
                    }

                </View>
            </ScrollView>
        </View>
    )
}


function ScheduledTimeList(props: { is_current: boolean, session_start: string, session_end: string, subject_title: string, subject_code: string, info_1: string, info_2: string, type: string, time_following: string, time_elapsed: string, time_remaining: string, past: boolean }) {
    const [session_start_time, session_start_period] = props.session_start.split(" ");
    const [session_end_time, session_end_period] = props.session_end.split(" ");


    const GetStyle = () => {
        const container_size = (props.is_current) ? "w-[250] h-[150]" : ((props.past) ? "w-[200] h-[80]" : "w-[200] h-[55]");
        const container_color = (props.type == "active") ? "bg-secondary" : (props.type == "following") ? "bg-primary" : "bg-grey-900";
        const container_radius = (props.is_current) ? "rounded-[24px]" : "rounded-[8px]";
        return `${container_size} ${container_color} ${container_radius}`;
    }
    const container_style = GetStyle();
    return (
        <View className="flex-row mb-4">
            <View className="w-[60] h-auto justify-between">
                <View className="flex-row items-end gap-[2] justify-end">
                    <Text className={((props.is_current) ? "text-grey-500" : "text-grey-750") + " text-[14px] tabular-nums font-manrope-semibold"}>{session_start_time}</Text>
                    <Text className={((props.is_current) ? "text-grey-500" : "text-grey-750") + " text-[8px] -translate-y-[2px] font-manrope-semibold"}>{session_start_period}</Text>
                </View>
                <View className="flex-1 w-full items-end">

                    <ImageBackground source={require("../../assets/images/dot.png")} resizeMode="repeat" className="flex-1 w-[4] mr-2 " />
                </View>
                <View className="flex-row items-end gap-[2] justify-end">
                    <Text className={((props.is_current) ? "text-grey-500" : "text-grey-750") + " text-[14px] tabular-nums font-manrope-semibold"}>{session_end_time}</Text>
                    <Text className={((props.is_current) ? "text-grey-500" : "text-grey-750") + " text-[8px] -translate-y-[2px] font-manrope-semibold"}>{session_end_period}</Text>
                </View>

            </View>
            <View className="ml-4">

                <View className={container_style}>
                    {
                        (props.type == "active") ?
                            (
                                <View className="h-full p-3 pt-2">
                                    <View className="mx-1 ">
                                        <Text className="text-grey-900 font-manrope-bold text-[22px]">{props.subject_code}</Text>
                                        <Text className="text-grey-900 font-manrope-medium text-[14px] -translate-y-1">{props.subject_title}</Text>
                                    </View>
                                    <View className="mb-[8] mt-[2] flex-row">
                                        <View>
                                            <Text className="font-manrope-semibold text-grey-900 text-[12px]">Time Elapsed:</Text>
                                            <Text className="font-manrope-semibold text-grey-900 text-[12px]">Time Remaining:</Text>
                                        </View>
                                        <View className="ml-4 tabular-nums">
                                            <Text className="font-manrope-medium text-grey-900 text-[12px]">{props.time_elapsed}</Text>
                                            <Text className="font-manrope-medium text-grey-900 text-[12px]">{props.time_remaining}</Text>
                                        </View>

                                    </View>
                                    <View className="flex-row gap-3 ">
                                        <View className="px-2 py-1 bg-grey-300 rounded-full">
                                            <Text className="font-manrope-semibold text-grey-900 text-[14px]">{props.info_1}</Text>
                                        </View>
                                        <View className="px-2 py-1 bg-grey-300 rounded-full">
                                            <Text className="font-manrope-semibold text-grey-900 text-[14px]">{props.info_2}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                            :
                            ((props.type == "following") ?
                                (
                                    (props.is_current) ?
                                        (
                                            <View className="flex justify-between h-full p-2 pb-3">
                                                <View className="m-2">
                                                    <View className="flex-row justify-between">
                                                        <Text className="font-manrope-medium text-[14px]">Next Subject In:</Text>
                                                        <Text className="font-manrope-medium text-[14px]">{props.time_following}</Text>
                                                    </View>
                                                    <View className="mt-2">
                                                        <Text className="text-grey-900 font-manrope-bold text-[20px]">{props.subject_code}</Text>
                                                        <Text className="text-grey-900 font-manrope-medium text-[12px]">{props.subject_title}</Text>
                                                    </View>

                                                </View>
                                                <View className="flex-row gap-3 ">
                                                    <View className="px-2 py-1 bg-grey-300 rounded-full">
                                                        <Text className="font-manrope-semibold text-grey-900 text-[14px]">{props.info_1}</Text>
                                                    </View>
                                                    <View className="px-2 py-1 bg-grey-300 rounded-full">
                                                        <Text className="font-manrope-semibold text-grey-900 text-[14px]">{props.info_2}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                        :
                                        (
                                            <View className="flex justify-between h-full p-2 pb-3">
                                                <View className="flex-row justify-between">
                                                    <Text className="font-manrope-medium text-[12px]">Next Subject In:</Text>
                                                    <Text className="font-manrope-medium text-[12px]">{props.time_following}</Text>
                                                </View>
                                                <Text className="text-grey-900 font-manrope-bold text-[14px]">{props.subject_code}</Text>

                                                <View className="flex-row gap-2">
                                                    <Text className="text-grey-900 font-manrope-medium text-[10px]">{props.info_1}</Text>
                                                    <Text className="text-grey-900 font-manrope-medium text-[10px]">{props.info_2}</Text>
                                                </View>
                                            </View>
                                        ))
                                :
                                (
                                    <View className="flex justify-between h-full p-2 pb-3">
                                        <Text className="text-grey-600 font-manrope-bold text-[14px]">{props.subject_code}</Text>
                                        <View className="flex-row gap-2">
                                            <Text className="text-grey-600/75 font-manrope-medium text-[10px]">{props.info_1}</Text>
                                            <Text className="text-grey-600/75 font-manrope-medium text-[10px]">{props.info_2}</Text>
                                        </View>
                                    </View>
                                ))
                    }
                </View>
            </View>
        </View>
    )
}