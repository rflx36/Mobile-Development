import IconRemove from "@/assets/icons/icon_add";
import IconFilter from "@/assets/icons/icon_filter";
import IconSearch from "@/assets/icons/icon_search";
import { useGlobalStore } from "@/hooks/useGlobalStore";
import { DataFiltered, ScheduleFilterType, TimeType, ViewScheduleType } from "@/types/types";
import FilterResult, { ConvertTimeToValue, SearchResultType } from "@/utils";
import { useRouter } from "expo-router";
import React from "react";
import { useState } from "react";
import { KeyboardAvoidingView, Pressable, ScrollView, Text, TextInput, View } from "react-native";


export default function Search() {
    const state = useGlobalStore();
    const [searchValue, setSearchValue] = useState("");
    const [searchFocus, setSearchFocus] = useState(false);
    const [filter, setFilter] = useState(0);

    const [resultAmount, setResultAmount] = useState(10);

    const val = state.get.main_schedule?.data;
    const SearchAction = () => {

        // if (toggleFilter)
    }

    const ChangeFilter = (x: number) => {
        setFilter(x);
        setResultAmount(10);
    }
    const AddMaxResult = () => {
        setResultAmount(resultAmount + 10);
    }

    // const instructors = val?.map(x => x.instructor).filter((x, i, s) => s.indexOf(x) === i);
    // const filtered_instructor_index = val?.filter(x => x.instructor == instructors[0]);


    const Get = () => {
        if (state.get.main_schedule == undefined) {
            return;
        }
        else {
            // const value = FilterResult(1, state.get.main_schedule.data, state.get.main_schedule?.rooms.map(x => x.room_name));
            const value = SearchResultType(state.get.main_schedule.data, state.get.main_schedule.rooms.map(x => x.room_name));
            // console.log("length:" + value.length);
            return value;
        }
    }
    const toPrint = Get();
    return (
        <View className="bg-black/95 h-full w-full ">

            <View className="w-auto mx-[24] h-max">

                <View className=" h-[60] justify-center  flex items-end">
                    <Text className="text-grey-400 font-manrope-semibold text-[24px]">Search</Text>
                </View>

                <View className="rounded-[20px] h-max w-max flex items-center flex-row overflow-hidden bg-grey-900">

                    <IconSearch className=" mx-[16]" />

                    <TextInput
                        value={searchValue}
                        onChangeText={setSearchValue}
                        className={((searchValue != "") ? "font-manrope-bold" : "font-manrope-regular") + " rounded-[20] flex-1  h-[40] text-[16] text-grey-300"}
                        placeholderTextColor={"#363636"}
                        placeholder={(searchFocus) ? "" : "Search"}
                        onFocus={() => setSearchFocus(true)}
                        onBlur={() => setSearchFocus(false)}

                    />
                    <Pressable className="mr-[16]" onPress={SearchAction}>
                        {
                            (searchValue != "") ?
                                (

                                    <Pressable onPress={() => setSearchValue("")}>
                                        <IconRemove />
                                    </Pressable>
                                )
                                :
                                (
                                    <></>
                                )
                        }
                    </Pressable>
                </View>

            </View>

            <View className="h-[50] ">
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View className="h-[40] mt-[10] items-center flex-row  ">
                        <Pressable onPress={() => ChangeFilter(0)} className={((filter == 0) ? "bg-grey-900" : "bg-grey-950") + " ml-4 mr-1 px-4 rounded-full w-max justify-center h-[30] "}>
                            <Text className={(filter == 0) ? "text-grey-300 font-manrope-semibold" : "text-grey-600 font-manrope-semibold"}>All</Text>
                        </Pressable>
                        <Pressable onPress={() => ChangeFilter(1)} className={((filter == 1) ? "bg-grey-900" : "bg-grey-950") + " mx-1 px-4 rounded-full w-max justify-center h-[30] "}>
                            <Text className={(filter == 1) ? "text-grey-300 font-manrope-semibold" : "text-grey-600 font-manrope-semibold"}>Rooms</Text>
                        </Pressable>
                        <Pressable onPress={() => ChangeFilter(2)} className={((filter == 2) ? "bg-grey-900" : "bg-grey-950") + " mx-1 px-4 rounded-full w-max justify-center h-[30] "}>
                            <Text className={(filter == 2) ? "text-grey-300 font-manrope-semibold" : "text-grey-600 font-manrope-semibold"}>Instructors</Text>
                        </Pressable>
                        <Pressable onPress={() => ChangeFilter(3)} className={((filter == 3) ? "bg-grey-900" : "bg-grey-950") + " mx-1 px-4 rounded-full w-max justify-center h-[30] "}>
                            <Text className={(filter == 3) ? "text-grey-300 font-manrope-semibold" : "text-grey-600 font-manrope-semibold"}>1st Year</Text>
                        </Pressable>
                        <Pressable onPress={() => ChangeFilter(4)} className={((filter == 4) ? "bg-grey-900" : "bg-grey-950") + " mx-1 px-4 rounded-full w-max justify-center h-[30] "}>
                            <Text className={(filter == 4) ? "text-grey-300 font-manrope-semibold" : "text-grey-600 font-manrope-semibold"}>2nd Year</Text>
                        </Pressable>
                        <Pressable onPress={() => ChangeFilter(5)} className={((filter == 5) ? "bg-grey-900" : "bg-grey-950") + " mx-1 px-4 rounded-full w-max justify-center h-[30] "}>
                            <Text className={(filter == 5) ? "text-grey-300 font-manrope-semibold" : "text-grey-600 font-manrope-semibold"}>3rd Year</Text>
                        </Pressable>
                        <Pressable onPress={() => ChangeFilter(6)} className={((filter == 6) ? "bg-grey-900" : "bg-grey-950") + " mx-1 px-4 rounded-full w-max justify-center h-[30] "}>
                            <Text className={(filter == 6) ? "text-grey-300 font-manrope-semibold" : "text-grey-600 font-manrope-semibold"}>4th Year</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>

            <View className="w-auto mx-[24] h-max">
                <ScrollView showsVerticalScrollIndicator={true}>
                    <ScheduleContainer filter={filter} case={searchValue} add_max={AddMaxResult} result_amount={resultAmount} />

                </ScrollView>
            </View>

        </View>
    )
}








function ScheduleContainer(props: { filter: number, case: string, result_amount: number, add_max: () => void }) {
    const state = useGlobalStore();
    const [pressed, setPressed] = useState(false);
    const router = useRouter();

    let isMaxed = false;


    const filtered_data = () => {
        if (!state.get.main_schedule) {
            return [];
        }

        let filtered_: Array<DataFiltered> = [];

        if (props.filter == 0) {
            if (props.case == "") {
                isMaxed = true;
                return [];
            }
            const data_1 = FilterResult(1, state.get.main_schedule.data, state.get.main_schedule.rooms.map(x => x.room_name)).map(x => ({ ...x, filter_type: 1 }));
            const data_2 = FilterResult(2, state.get.main_schedule.data, state.get.main_schedule.rooms.map(x => x.room_name)).map(x => ({ ...x, filter_type: 2 }));
            const data_3 = FilterResult(3, state.get.main_schedule.data, state.get.main_schedule.rooms.map(x => x.room_name)).map(x => ({ ...x, filter_type: 3 }));
            const data_4 = FilterResult(4, state.get.main_schedule.data, state.get.main_schedule.rooms.map(x => x.room_name)).map(x => ({ ...x, filter_type: 4 }));
            const data_5 = FilterResult(5, state.get.main_schedule.data, state.get.main_schedule.rooms.map(x => x.room_name)).map(x => ({ ...x, filter_type: 5 }));
            const data_6 = FilterResult(6, state.get.main_schedule.data, state.get.main_schedule.rooms.map(x => x.room_name)).map(x => ({ ...x, filter_type: 6 }));


            filtered_ = data_1.concat(data_2.concat(data_3.concat(data_4.concat(data_5.concat(data_6)))));
        }
        else {
            filtered_ = FilterResult(props.filter, state.get.main_schedule.data, state.get.main_schedule.rooms.map(x => x.room_name));


        }

        const amount = filtered_.filter(item => item.filter.toLowerCase().includes(props.case.toLowerCase()));
        if (amount.length <= props.result_amount) {
            isMaxed = true;
            return amount;

        }
        return amount.slice(0, props.result_amount);

    }


    const ViewSchedule = (x: DataFiltered, current_filter: number) => {
        if (pressed) {
            return;
        }
        setPressed(true);
        setTimeout(() => {
            setPressed(false);
        }, 1000);

        const view_schedule_state: ViewScheduleType = {
            selected: x.filter,
            data: x,
            highlighted_id: "",
            highlighted_info: null,
            filter_type: GetFilterType(current_filter),
            view_availability: (current_filter == 2),
            time_start: state.get.main_schedule!.time_start,
            time_end: state.get.main_schedule!.time_end
        }
        state.get.view_schedule = view_schedule_state;
        state.set();
        router.push("/schedule_search");

    }
    // console.log(filtered_data);
    const GetFilterType = (current_filter: number): ScheduleFilterType => {
        switch (current_filter) {
            case 1:
                return "room";
            case 2:
                return "instructor";
            case 3:
                return "section";
            default:
                return "room";
        }
    }
    const h = (200 + (162 * Math.ceil((filtered_data()?.length || 0) / 2)));
    return (

        <View className="mt-5 h-max inline-block " style={{ flexWrap: "wrap", flexDirection: "row", gap: 8, height: h }}>
            {
                (filtered_data != undefined) && (
                    filtered_data()!.map((x, i) => {
                        let combined: Array<any> = [];

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

                        const filtered_sections = [... new Set(combined.map(day => (props.filter > 2) ? (day.subject.code) : (day.section)))];

                        const current_filter = (props.filter == 0) ? x.filter_type : props.filter;

                        return (
                            <Pressable key={i} onPress={() => ViewSchedule(x, current_filter)} className=" relative w-[152] h-[152] rounded-[16px] bg-grey-900">
                                <View className="w-full h-full flex flex-col items-center">
                                    <View className="w-[115px] h-[120px] mt-2  gap-1 flex-row">


                                        <View className="relative w-[15px] h-full ">
                                            {x.monday_schedule?.map((indicator_x, indicator_i) => <TimeAllocatedIndicator key={indicator_i} time_start={indicator_x.time_start} time_end={indicator_x.time_end} type={filtered_sections.indexOf((props.filter > 2) ? indicator_x.subject.code : indicator_x.section)} />)}
                                        </View>
                                        <View className="relative w-[15px] h-full ">
                                            {x.tuesday_schedule?.map((indicator_x, indicator_i) => <TimeAllocatedIndicator key={indicator_i} time_start={indicator_x.time_start} time_end={indicator_x.time_end} type={filtered_sections.indexOf((props.filter > 2) ? indicator_x.subject.code : indicator_x.section)} />)}
                                        </View>
                                        <View className="relative w-[15px] h-full ">
                                            {x.wednesday_schedule?.map((indicator_x, indicator_i) => <TimeAllocatedIndicator key={indicator_i} time_start={indicator_x.time_start} time_end={indicator_x.time_end} type={filtered_sections.indexOf((props.filter > 2) ? indicator_x.subject.code : indicator_x.section)} />)}
                                        </View>
                                        <View className="relative w-[15px] h-full ">
                                            {x.thursday_schedule?.map((indicator_x, indicator_i) => <TimeAllocatedIndicator key={indicator_i} time_start={indicator_x.time_start} time_end={indicator_x.time_end} type={filtered_sections.indexOf((props.filter > 2) ? indicator_x.subject.code : indicator_x.section)} />)}
                                        </View>
                                        <View className="relative w-[15px] h-full ">
                                            {x.friday_schedule?.map((indicator_x, indicator_i) => <TimeAllocatedIndicator key={indicator_i} time_start={indicator_x.time_start} time_end={indicator_x.time_end} type={filtered_sections.indexOf((props.filter > 2) ? indicator_x.subject.code : indicator_x.section)} />)}
                                        </View>
                                        <View className="relative w-[15px] h-full ">
                                            {x.saturday_schedule?.map((indicator_x, indicator_i) => <TimeAllocatedIndicator key={indicator_i} time_start={indicator_x.time_start} time_end={indicator_x.time_end} type={filtered_sections.indexOf((props.filter > 2) ? indicator_x.subject.code : indicator_x.section)} />)}
                                        </View>
                                    </View>
                                    <Text className="font-manrope-bold text-[12px] text-grey-400">{x.filter}  </Text>

                                </View>
                            </Pressable>
                        )
                    }))
            }
            {
                (!isMaxed) ?
                    (

                        <Pressable onPress={props.add_max} className="w-full">
                            <View className="w-full bg-grey-950  rounded-[20px] h-[60] justify-center">

                                <Text className="text-grey-500 text-[20px] text-center  font-manrope-semibold "> Load More</Text>
                            </View>
                        </Pressable>
                    )
                    :
                    (<View></View>)

            }

            {
                (props.filter == 0 && props.case == "") ?
                    (
                        <View className="w-full h-full items-center justify-center">
                            <Text className="text-grey-500"> Try to Search!</Text>
                        </View>
                    )
                    : (<></>)
            }
        </View>


    )

}

function TimeAllocatedIndicator(props: { time_start: TimeType, time_end: TimeType, type: number }) {
    const state = useGlobalStore();

    const session_time_start = ConvertTimeToValue(state.get.main_schedule?.time_start || "00:00")
    const style_time_length = ((ConvertTimeToValue(props.time_end)) + 1) - (ConvertTimeToValue(props.time_start));
    const style_length = (style_time_length / 30) * 5;
    const style_start = ((ConvertTimeToValue(props.time_start) - session_time_start) / 30) * 5;
    // console.log(props);
    const GetStyle = () => {
        let style_bg = "bg-grey-750";
        let id = "type-a";
        switch (props.type) {
            case 1:
                style_bg = "bg-grey-600";
                id = "type-b";
                break;
            case 2:
                style_bg = "bg-grey-500";
                id = "type-c";
                break;
            case 3:
                style_bg = "bg-grey-400";
                id = "type-d";
                break;
            case 4:
                style_bg = "bg-grey-300";
                id = "type-e";
                break;
            case 5:
                style_bg = "bg-grey-200";
                id = "type-f";
                break;
            case 6:
                style_bg = "bg-grey-150";
                id = "type-g";
                break;

        }

        // console.log(style_length +":"+style_start)
        return `${id} ${style_bg} `;
        // return `bg-grey-750`;

    }


    return (
        <View className={GetStyle() + " absolute rounded-[6px]  w-full ease-in duration-150 "} style={{ height: style_length, top: style_start }}>
        </View>
        // <View className="w-[120px] h-max bg-green-500">
        //     <Text>{style_length}: {style_start}</Text>
        // </View>
    )
}