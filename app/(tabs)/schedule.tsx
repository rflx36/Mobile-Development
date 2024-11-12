import GradientText from "@/components/text_gradient";
import { realtime_database } from "@/firebase/firebase_config";
import { useGlobalStore } from "@/hooks/useGlobalStore";
import { simulate_day, simulate_time } from "@/modify";
import { AcceptDBTypes, AllocatedListType, FloorType, InstructorSessionSchedule, RoomSessionSchedule, TimeType, ViewRoomType, YearSessionSchedule, YearType } from "@/types/types";
import FilterResult, { ConvertTimeToValue, ConvertValueToTime, RevertTime } from "@/utils";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { onValue, ref } from "firebase/database";
import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Dimensions, Image, Pressable, ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function Schedule() {
    const [realtimes, setRealtimes] = useState(null);
    const [accepted, setAccepted] = useState<Array<AcceptDBTypes>>([]);
    const router = useRouter();

    useEffect(() => {


        const ref_ = ref(realtime_database, "schedule/rooms");
        onValue(ref_, (snapshot) => {
            const snap = snapshot.val();
            if (realtimes != snap && snap) {
                setRealtimes(snapshot.val());
            }
        })


        const GetAccepted = async () => {
            const uid = await AsyncStorage.getItem("unique_app_id") || "";
            const ref_ = ref(realtime_database, "schedule/accepted");
            onValue(ref_, (snapshot) => {
                if (snapshot.val()) {
                    let dat = Object.values(snapshot.val()) as Array<AcceptDBTypes>;
                    dat = dat.filter(x => x.uid == uid);
                    if (accepted != dat) {
                        setAccepted(dat);
                    }
                }
            })

            //

        }
        GetAccepted();
    }, [])





    const [floor, setFloor] = useState(1);
    const building_height = Dimensions.get("screen").height - 244;


    const RoomList = () => {
        router.push("/room_request_list");
    }

    return (

        <GestureHandlerRootView className="bg-black/95 h-full w-full ">
            <View className="mx-[24] w-auto h-auto">
                <View className="h-[60] flex flex-row items-center justify-between">
                    <Pressable onPress={RoomList}>
                        <View className="h-[40] w-[40] bg-grey-950 justify-center items-center rounded-full translate-y-1 -translate-x-1">

                            <Image source={require("../../assets/icons/icon-request-list.png")} className="w-[22] h-[22] opacity-50" />
                        </View>
                    </Pressable>
                    <Text className="text-grey-400 font-manrope-semibold text-[24px]">Rooms</Text>
                </View>
            </View>


            <View className=" w-full h-full">
                <View className="w-full items-center mb-4 ">
                    <View className="flex flex-row bg-grey-950 h-[30] items-center gap-x-2 w-[220] justify-evenly rounded-full">
                        <Pressable onPress={() => setFloor(1)}>
                            <Text className={(floor == 1 ? "text-grey-500" : "text-grey-750") + " font-manrope-semibold"}>Floor 1</Text>
                        </Pressable>
                        <Pressable onPress={() => setFloor(2)}>
                            <Text className={(floor == 2 ? "text-grey-500" : "text-grey-750") + " font-manrope-semibold"}>Floor 2</Text>
                        </Pressable>
                        <Pressable onPress={() => setFloor(3)}>
                            <Text className={(floor == 3 ? "text-grey-500" : "text-grey-750") + " font-manrope-semibold"}>Floor 3</Text>
                        </Pressable>
                    </View>
                </View>
                <View className="border-t border-t-grey-900 ">

                    <ScrollView style={{ height: building_height }} className="relative" showsVerticalScrollIndicator={false}>
                        <View className="absolute h-full w-full z-10">
                            <SetInteractiveFloorsContainer floor={floor} realtimes={realtimes} accepted={accepted} />
                        </View>
                        <View className="h-[10]" />
                        <View className="w-full h-full flex justify-center items-center ">
                            {
                                (floor == 1) &&
                                <Image source={require("../../assets/images/old_building_floor_1.png")} className="w-[275] h-[605]" />
                            }
                            {
                                (floor == 2) &&
                                <Image source={require("../../assets/images/old_building_floor_2.png")} className="w-[275] h-[605]" />
                            }

                            {
                                (floor == 3) &&
                                <Image source={require("../../assets/images/old_building_floor_3.png")} className="w-[275] h-[605]" />
                            }

                        </View>
                        <View className="h-[20]" />

                    </ScrollView>
                    <SheetContainer />
                </View>
            </View>

        </GestureHandlerRootView>
    )
}


function SheetContainer() {
    const state = useGlobalStore();
    const bottom_sheet_ref_schedule = useRef<BottomSheet>(null);
    const sheet_mounted = useRef(false);
    const router = useRouter();
    const [sheetHeight, setSheetHeight] = useState(180);
    // const OnSheetChanged = useCallback((index: number) => {
    //     if (index == -1) {
    //         state.get.view_room = null;
    //         state.set();
    //     }



    // }, [])

    const OnSheetClose = () => {
        if (state.get.view_room != null) {

            state.get.view_room = null;
            state.set();
        }
    }
    useEffect(() => {
        if (!sheet_mounted.current) {
            sheet_mounted.current = true;
            state.get.view_room = null;
            return;
        }

        if (state.get.view_room == null) {

            bottom_sheet_ref_schedule.current?.close();
        }
        else {

            bottom_sheet_ref_schedule.current?.snapToPosition(220);
        }

        // if (state.get.view_room != null) {
        // }
        // else {
        // }

    }, [state.get.view_room])

    const room_info = state.get.view_room;
    const name = room_info?.room_name || "";
    const status = room_info?.is_available || false;

    const RoomRequestAccess = () => {
        router.push("/room_request");
    }

    const current = room_info?.allocated_list.find(x => x.time == room_info.time_display.slice(10));

    return (
        <BottomSheet index={-1} snapPoints={[220]} onClose={OnSheetClose} enablePanDownToClose={true} ref={bottom_sheet_ref_schedule} handleIndicatorStyle={{ opacity: 0 }} backgroundStyle={{ backgroundColor: 'transparent' }}>
            <BottomSheetView >
                <View style={{ height: sheetHeight }} className="mx-4 w-auto bg-[#0A0A0A]/95 border border-grey-750 rounded-[16px] py-2">
                    {(room_info) &&
                        (
                            <>
                                <View className=" h-max w-auto mx-2  rounded-lg">
                                    <View className="m-1 flex-row items-center justify-between">
                                        <View className="flex-1 items-center">
                                            <Text className="font-manrope-semibold text-grey-300 ">{name}</Text>
                                        </View>
                                        <View className="flex-1 items-center">
                                            <Text className={(status ? "text-[#96E99E]" : "text-[#F57272]") + " font-manrope-semibold"}>{status ? "Available" : "Not Available"}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View className="my-2 min-h-[40] flex-1 border border-grey-750/50 w-auto mx-4 rounded-lg">
                                    <Pressable className="h-full overflow-hidden">
                                        {/* {room_info.allocated_list.map((x, i) => {
                                            return (
                                                <View key={i} className="bg-red-500 my-2">
                                                    <Text className="text-white">{x.time}</Text>
                                                </View>
                                            )
                                        })} */}
                                        <View className="w-auto mx-2 my-[9px]">
                                            <Text className="text-grey-500 font-manrope-semibold text-[12px] ">{room_info.time_display}</Text>
                                            {
                                                ((!room_info.is_available && room_info.time_display != "") &&
                                                    (
                                                        <>
                                                            <Text className="text-grey-500">section: {current?.section}</Text>
                                                            <Text className="text-grey-500">{(current?.instructor.slice(0, 9) != "requested") ? "instructor: " + current?.instructor : "Name: " + current.instructor.slice(9)+" (Requested)"}</Text>
                                                            <Text className="text-grey-500">{(current?.subject != "requested") ? "subject:" + current?.subject : ""}</Text>

                                                        </>
                                                    )
                                                )
                                            }
                                        </View>
                                    </Pressable>
                                </View>

                                {
                                    (room_info.is_available)
                                    &&
                                    (
                                        <Pressable onPress={RoomRequestAccess}>
                                            <View className="my-2 rounded-[24px] h-[60] justify-center w-auto mx-4 bg-secondary">
                                                <Text className="text-center text-[16px] font-manrope-semibold ">Request Room Access</Text>
                                            </View>
                                        </Pressable>

                                    )
                                }

                            </>
                        )

                    }
                </View>
            </BottomSheetView>
        </BottomSheet>
    )
}


function SetInteractiveFloorsContainer(props: { floor: number, realtimes: any, accepted: Array<AcceptDBTypes> }) {
    const state = useGlobalStore();


    const getWeekday = () => {
        const daysOfWeek: Array<"Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"> = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const today = new Date();
        const dayName = (simulate_day == null) ? daysOfWeek[today.getDay()] : simulate_day;
        // const dayName = "Thursday";
        return dayName;
    };
    const ConvertTime = (x: TimeType) => {
        const [hours, minutes] = x.split(":");

        const hours_value = parseInt(hours);

        const ampm = hours_value >= 12 ? "PM" : "AM";

        const hours_format = hours_value % 12 || 12;
        return `${hours_format}:${minutes} ${ampm}`;
    }

    const GetFloorsData = () => {

        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const day = getWeekday();
        const current_time_value = (simulate_time == null) ? ((hours * 60) + minutes) : ConvertTimeToValue(simulate_time);

        let data = FilterResult(1, state.get.main_schedule!.data, state.get.main_schedule!.rooms.map(x => x.room_name));



        const GetDayAvailability = (time: Array<{ start: TimeType, end: TimeType }>) => {
            let available = true;
            let text = "";
            for (let i = 0; i < time.length; i++) {
                if (current_time_value >= ConvertTimeToValue(time[i].start) && ConvertTimeToValue(time[i].end) >= current_time_value) {
                    available = false;
                    text = ConvertTime(time[i].start) + " - " + ConvertTime(time[i].end);
                    break;
                }
            }


            return { available: available, text: text };
        }

        const GetDayInfo = (room_data: Array<RoomSessionSchedule>, room_name: string) => {
            let room_dat = room_data;
            const accepteds = props.accepted.find(x => room_name == x.room);


            if (accepteds) {
                // const dat = { start: RevertTime(accepteds.time_start), end: RevertTime(accepteds.time_end) }
                room_dat.push({
                    time_start: RevertTime(accepteds.time_start),
                    time_end: RevertTime(accepteds.time_end),
                    duration: 0,
                    section: accepteds.section,
                    year: 1 as YearType,
                    course: {
                        code: "",
                        title: "",
                    },
                    instructor: {
                        first_name: "requested" + accepteds.name,
                        last_name: ""
                    },
                    subject: {
                        code: "requested",
                        title: ""
                    }
                })

            }

            const times = room_dat.map(x => ({ start: x.time_start, end: x.time_end }));


            const current_availability = GetDayAvailability(times);
            let time_display = "Room is available until end of the day";
            //implement current time if occupied or next subject if unoocipied
            let added = false;
            const allocation = room_dat.map(x => {
                const time = ConvertTime(x.time_start) + " - " + ConvertTime(x.time_end);
                const instructor = x.instructor.first_name + " " + x.instructor.last_name

                if (current_time_value >= ConvertTimeToValue(x.time_start) && ConvertTimeToValue(x.time_end) >= current_time_value) {
                    time_display = "Current : " + time;
                    added = true;
                }
                else if (!added && ConvertTimeToValue(x.time_start) > current_time_value) {
                    added = true;
                    time_display = "Next Session in: " + time;
                }
                return { time: time, section: x.section, subject: x.subject.code, instructor: instructor }
            })


            return {
                available: current_availability.available,
                text: current_availability.text,
                allocation: allocation,
                time_display: time_display
            }
        }

        const result: Array<FloorType> = data.map(x => {
            let available = true;
            let text = "";
            let allocation: Array<AllocatedListType> = [];
            let time_display = "";
            if (day == "Monday" && x.monday_schedule) {
                const day_info = GetDayInfo(x.monday_schedule as Array<RoomSessionSchedule>, x.filter);
                available = day_info.available;
                text = day_info.text;
                allocation = day_info.allocation;
                time_display = day_info.time_display;
            }
            else if (day == "Tuesday" && x.tuesday_schedule) {
                const day_info = GetDayInfo(x.tuesday_schedule as Array<RoomSessionSchedule>, x.filter);
                available = day_info.available;
                text = day_info.text;
                allocation = day_info.allocation;
                time_display = day_info.time_display;
            }
            else if (day == "Wednesday" && x.wednesday_schedule) {
                const day_info = GetDayInfo(x.wednesday_schedule as Array<RoomSessionSchedule>, x.filter);
                available = day_info.available;
                text = day_info.text;
                allocation = day_info.allocation;
                time_display = day_info.time_display;
            }
            else if (day == "Thursday" && x.thursday_schedule) {
                const day_info = GetDayInfo(x.thursday_schedule as Array<RoomSessionSchedule>, x.filter);
                available = day_info.available;
                text = day_info.text;
                allocation = day_info.allocation;
                time_display = day_info.time_display;
            }
            else if (day == "Friday" && x.friday_schedule) {
                const day_info = GetDayInfo(x.friday_schedule as Array<RoomSessionSchedule>, x.filter);
                available = day_info.available;
                text = day_info.text;
                allocation = day_info.allocation;
                time_display = day_info.time_display;
            }
            else if (day == "Saturday" && x.saturday_schedule) {
                const day_info = GetDayInfo(x.saturday_schedule as Array<RoomSessionSchedule>, x.filter);
                available = day_info.available;
                text = day_info.text;
                allocation = day_info.allocation;
                time_display = day_info.time_display;
            }
            else if (day == "Sunday") {
                available = false;

            }

            // if (available){
            state.get.main_schedule!.rooms.map(x => x.room_name)

            const match_name = state.get.main_schedule?.rooms.find(y => x.filter == y.room_name && y.is_realtime);
            if (match_name) {
                if (props.realtimes != null) {
                    if (match_name.realtime_id && props.realtimes.hasOwnProperty(match_name.realtime_id)) {
                        const value = props.realtimes[match_name.realtime_id];
                        available = !value.occupied;

                    }

                }
            }

            console.log(allocation);
            return { is_available: available, name: x.filter, text: text, allocation: allocation, time_display: time_display }
        })

        return result;
    }



    const test_arr: Array<FloorType> = GetFloorsData();

    const AssignFloors = (InputArray: Array<FloorType>) => {
        let floors: Array<FloorType> = [];
        const saved_floors =
            [
                "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8",
                "r9", "r10", "r11", "r12", "r13", "r14", "PRRC202", "r15",
                "r16", "r17", "r18", "r19", "r20", "r21", "r22", "r23"
            ]
        const input_buffer: Array<FloorType> = [];
        InputArray.forEach(x => {

            if (saved_floors.includes(x.name)) {
                const index = saved_floors.findIndex(y => y == x.name);
                floors[index] = x;
                input_buffer.push(x);
            }
        })

        InputArray.forEach(x => {
            if (!input_buffer.includes(x)) {
                for (let i = 0; i < saved_floors.length; i++) {
                    if (!floors[i]) {
                        floors[i] = x;
                        break;
                    }
                }
            }
        })
        let dat: Array<FloorType> = [];
        switch (props.floor) {
            case 1:
                dat = floors.slice(0, 8);
                break;
            case 2:
                dat = floors.slice(8, 16);
                break;
            case 3:
                dat = floors.slice(16, 24);
                break;
        }

        return dat;
    }

    const floors = AssignFloors(test_arr);


    {
        return (
            <View className=" items-center">
                <View className="w-[276] m-[71] justify-between flex-row">
                    <View>

                        {(floors[0]) ? <InteractiveRoom time_display={floors[0].time_display} allocation_list={floors[0].allocation} is_available={floors[0].is_available} room_name={floors[0].name} text={floors[0].text} /> : <UnAllocatedRoom />}
                        {(floors[1]) ? <InteractiveRoom time_display={floors[1].time_display} allocation_list={floors[1].allocation} is_available={floors[1].is_available} room_name={floors[1].name} text={floors[1].text} /> : <UnAllocatedRoom />}
                        <View className="h-[72]" />

                        {(floors[2]) ? <InteractiveRoom time_display={floors[2].time_display} allocation_list={floors[2].allocation} is_available={floors[2].is_available} room_name={floors[2].name} text={floors[2].text} /> : <UnAllocatedRoom />}
                        {(floors[3]) ? <InteractiveRoom time_display={floors[3].time_display} allocation_list={floors[3].allocation} is_available={floors[3].is_available} room_name={floors[3].name} text={floors[3].text} /> : <UnAllocatedRoom />}
                    </View>
                    <View>
                        {(floors[4]) ? <InteractiveRoom time_display={floors[4].time_display} allocation_list={floors[4].allocation} is_available={floors[4].is_available} room_name={floors[4].name} text={floors[4].text} /> : <UnAllocatedRoom />}
                        {(floors[5]) ? <InteractiveRoom time_display={floors[5].time_display} allocation_list={floors[5].allocation} is_available={floors[5].is_available} room_name={floors[5].name} text={floors[5].text} /> : <UnAllocatedRoom />}
                        <View className="h-[72]" />

                        {(floors[6]) ? <InteractiveRoom time_display={floors[6].time_display} allocation_list={floors[6].allocation} is_available={floors[6].is_available} room_name={floors[6].name} text={floors[6].text} /> : <UnAllocatedRoom />}
                        {(floors[7]) ? <InteractiveRoom time_display={floors[7].time_display} allocation_list={floors[7].allocation} is_available={floors[7].is_available} room_name={floors[7].name} text={floors[7].text} /> : <UnAllocatedRoom />}
                    </View>
                </View>

            </View>
        )
    }




}

function UnAllocatedRoom() {
    return (
        <View className="w-[110] mx-[2] h-[110]" />
    )
}

function InteractiveRoom(props: { is_available: boolean, room_name: string, text: string, allocation_list: Array<AllocatedListType>, time_display: string }) {
    const state = useGlobalStore();



    const ViewInfo = () => {

        const view_room: ViewRoomType = {
            room_name: props.room_name,
            is_available: props.is_available,
            allocated_list: props.allocation_list,
            time_display: props.time_display
        }

        state.get.view_room = (state.get.view_room?.room_name == view_room.room_name) ? null : view_room;
        state.set();
    }




    return (
        <Pressable onPress={ViewInfo}>
            <View className="w-[110] mx-[2] h-[110]  justify-center items-center">
                <Text className={((props.is_available) ? "text-grey-150" : "text-grey-150/50") + " font-manrope-semibold text-[16px]"}>{props.room_name.toUpperCase()}</Text>
                <Text className={((props.is_available) ? "text-[#96E99E]" : "text-[#F57272]") + " font-manrope-semibold text-[12px]"}>{(props.is_available) ? "Available" : "Unavailable"}</Text>
                <Text className="text-[#F57272] font-manrope-semibold text-[8px] opacity-50">{props.text}</Text>
            </View>

        </Pressable >
    )
}