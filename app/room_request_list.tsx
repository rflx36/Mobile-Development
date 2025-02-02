import { realtime_database } from "@/firebase/firebase_config";
import { simulate_time } from "@/modify";
import { AcceptDBTypes, ActivityType, RejectDBTypes, RequestDBTypes, TimeType } from "@/types/types";
import { ConvertTimeToValue, RevertTime } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { Image, NativeModules, Platform, Pressable, ScrollView, StatusBar, Text, View } from "react-native";










export default function RequestList() {

    const { StatusBarManager } = NativeModules;
    const status_bar_height = Platform.OS === 'android' ? StatusBar.currentHeight : Platform.OS === "ios" ? StatusBarManager.getHeight(({ height }: any) => height) : 0;
    const [requestList, setRequestList] = useState<Array<RequestDBTypes>>([]);
    const [rejectedList, setRejectedList] = useState<Array<RejectDBTypes>>([]);
    const [acceptedList, setAcceptedList] = useState<Array<AcceptDBTypes>>([]);

    const router = useRouter();
    const [selected, setSelected] = useState<ActivityType | null>(null);

    const GoBack = () => {
        router.back();
    }


    const getTodayDate = () => {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = String(today.getFullYear()).slice(-2);
        return `${month}-${day}-${year}`;
    };

    const removeInvalidRequest = async (id: Array<string>, type: string) => {
        for (let i = 0; i < id.length; i++) {
            const invalidRef = ref(realtime_database, `schedule/${type}/${id[i]}`);
            await remove(invalidRef);
        }
    }

    useEffect(() => {
        const RequestInit = async () => {

            const uid = await AsyncStorage.getItem("unique_app_id") || "";
            const ref_ = ref(realtime_database, "schedule/request");
            onValue(ref_, (snapshot) => {
                if (snapshot.val()) {
                    let request = Object.entries(snapshot.val()).map(([id, value]) => ({
                        ...(value as Omit<RequestDBTypes, "id">),
                        id,
                    }));
                    request = request.filter(x => x.uid == uid);
                    const filtered_request = request.filter(x => x.day_validity == getTodayDate());
                    const invalid_request = request.filter(x => x.day_validity != getTodayDate());

                    if (requestList != filtered_request) {
                        setRequestList(filtered_request);
                    }

                    if (invalid_request.length > 0) {
                        removeInvalidRequest(invalid_request.map(x => x.id), "request");
                    }
                }
            })
        }
        RequestInit();
    }, [])

    useEffect(() => {
        const RejectInit = async () => {
            const uid = await AsyncStorage.getItem("unique_app_id") || "";
            const ref_ = ref(realtime_database, "schedule/response");
            onValue(ref_, (snapshot) => {
                if (snapshot.val()) {
                    let request = Object.entries(snapshot.val()).map(([id, value]) => ({
                        ...(value as Omit<RejectDBTypes, "id">),
                        id,
                    }));
                    request = request.filter(x => x.uid == uid);
                    const filtered_request = request.filter(x => x.day_validity == getTodayDate());
                    const invalid_request = request.filter(x => x.day_validity != getTodayDate());
                    if (rejectedList != filtered_request) {
                        setRejectedList(filtered_request);
                    }
                    if (invalid_request.length > 0) {
                        removeInvalidRequest(invalid_request.map(x => x.id), "response");
                    }
                }
            })
        }
        RejectInit();
    }, [])
    useEffect(() => {
        const AcceptInit = async () => {
            const uid = await AsyncStorage.getItem("unique_app_id") || "";
            const ref_ = ref(realtime_database, "schedule/accepted");
            onValue(ref_, (snapshot) => {
                if (snapshot.val()) {

                 
                    let request = Object.entries(snapshot.val()).map(([id, value]) => ({
                        ...(value as Omit<AcceptDBTypes, "id">),
                        id,
                    }));
                    request = request.filter(x => x.uid == uid);
                    const filtered_request = request.filter(x => x.day_validity == getTodayDate());
                    const invalid_request = request.filter(x => x.day_validity != getTodayDate());
                    if (acceptedList != filtered_request) {
                        setAcceptedList(filtered_request);
                    }
                    if (invalid_request.length > 0) {
                        removeInvalidRequest(invalid_request.map(x => x.id), "accepted");
                    }
                }
            })

        }
        AcceptInit();
    }, [])


    const GetRequestlist = () => {
        // const time_list_data_sorted = props.data.sort((a, b) => ConvertTimeToValue(a.time_start) - ConvertTimeToValue(b.time_start));

    }
    const GetActivityList = () => {

        // const Activity = {
        // activity_name : string,
        // room
        // time
        // requested
        // name
        // section
        // }

        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const current_time_value = (simulate_time == null) ? ((hours * 60) + minutes) : ConvertTimeToValue(simulate_time);
        const Activity: Array<ActivityType> = [];
        const request_list_modified: Array<ActivityType> = requestList.map(x => {

            let obj: ActivityType = {
                activity_name: "Requested access for " + x.room_name,
                room: x.room_name,
                time_start: x.time_start,
                time_end: x.time_end,
                time_requested: x.time_requested,
                name: x.name,
                section: x.section,
                message: x.message,
                type: "request",
            }
            if (current_time_value > ConvertTimeToValue(RevertTime(x.time_start))) {
                obj.activity_name = "Request access for " + x.room_name + " Expired"
                obj.time_start = "";
                obj.time_end = "";
            }
            return obj;


        })


        const reject_list_modified: Array<ActivityType> = rejectedList.map(x =>
        ({
            type: "rejected",
            time_requested: x.time_rejected,
            message: x.message,
        })
        )
        const accept_list_modified: Array<ActivityType> = acceptedList.map(x =>
        ({
            type: "accepted",
            time_requested: x.time_accepted,
            message: x.message
        })
        )


        Activity.push(...accept_list_modified);
        Activity.push(...reject_list_modified);
        Activity.push(...request_list_modified);
        return Activity;
    }

    const ConvertTime = (x: TimeType) => {
        const [hours, minutes] = x.split(":");

        const hours_value = parseInt(hours);

        const ampm = hours_value >= 12 ? "PM" : "AM";

        const hours_format = hours_value % 12 || 12;
        return `${hours_format}:${minutes} ${ampm}`;
    }
    const activity_list = GetActivityList().sort((a, b) => ConvertTimeToValue(a.time_requested) - ConvertTimeToValue(b.time_requested)).reverse();

    const ViewActivity = (x: ActivityType) => {
        setSelected(x);
    }
    return (
        <View className=" bg-black/95 h-full w-full">

            <View style={{ marginTop: status_bar_height }} className="  w-auto h-max">
                <View className=" h-[60] justify-start mx-[24] w-auto flex flex-row  items-center">
                    <Pressable onPressIn={GoBack} className="bg-grey-950 rounded-full -translate-x-3 p-3">
                        <Image source={require("../assets/icons/icon-arrow-back.png")} className="w-[24]  h-[15] opacity-75 " />
                    </Pressable>
                    <Text className="text-grey-400 font-manrope-semibold text-[20px]"> Activity</Text>
                </View>
            </View>
            {/* <View className="relative ">

                {
                    selected
                    &&
                    (
                        <View className="absolute bg-grey-950 w-[10] h-[10]">
                            <Text></Text>
                        </View>
                    )
                }
            </View> */}
            <View>

            </View>
            <ScrollView className=" w-auto mx-8 ">
                {
                    activity_list.map((x, i) => {

                        let highlight = (x.type == "request") ? x.activity_name : x.message;
                        return (
                            <Pressable onPress={() => ViewActivity(x)} key={i} className="h-[70] w-full rounded-[12px] my-1 bg-grey-950">
                                <View className="flex-row justify-between mx-3 my-2 items-center">
                                    <Text className="font-manrope-semibold text-grey-400 ">{highlight}</Text>
                                </View>
                                <View className="flex-row mx-3 mt-1 items-end">
                                    <Text className="font-manrope-semibold text-grey-600  w-[130] text-[12px]">{x?.time_start} {(x.type == "request" ? "-" : "")} {x?.time_end}</Text>
                                    <Text className="font-manrope-semibold text-grey-600 w-[100] text-[12px]">{x?.section}</Text>
                                    <Text className="font-manrope-semibold text-grey-750 text-[10px]">{ConvertTime(x?.time_requested || "00:00")}</Text>
                                </View>
                            </Pressable>
                        )
                        // ) <Text key={i} className="text-white">{x.uid} {x.time_requested} {x.time_end}</Text>
                    })
                }
            </ScrollView>
        </View>

    )
}