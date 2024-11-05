import IconRemove from "@/assets/icons/icon_add";
import IconFilter from "@/assets/icons/icon_filter";
import IconSearch from "@/assets/icons/icon_search";
import { useGlobalStore } from "@/hooks/useGlobalStore";
import { DataFiltered, ScheduleFilterType, TimeType, ViewScheduleType } from "@/types/types";
import FilterResult, { ConvertTimeToValue, SearchResultType } from "@/utils";
import React from "react";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";


export default function Search() {
    const state = useGlobalStore();
    const [searchValue, setSearchValue] = useState("");
    const [toggleFilter, setToggleFilter] = useState(false);
    const [searchFocus, setSearchFocus] = useState(false);
    const val = state.get.main_schedule?.data;
    const SearchAction = () => {

        // if (toggleFilter)
    }

    const Search = () => {

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
            console.log("length:" + value.length);
            return value;
        }
    }
    const toPrint = Get();
    return (
        <View className="bg-black/95 h-full w-full ">
            <View className="mx-[24] w-auto h-full">

                <View className=" h-[60] justify-center  flex items-end">
                    <Text className="text-grey-400 font-manrope-semibold text-[24px]">Search</Text>
                </View>

                <View className="rounded-[20px] h-max w-max flex items-center flex-row overflow-hidden bg-grey-900">
                    <Pressable onPress={Search}>
                        <IconSearch className=" mx-[16]" />
                    </Pressable>
                    <TextInput
                        value={searchValue}
                        onChangeText={setSearchValue}
                        className={((searchValue != "") ? "font-manrope-bold" : "font-manrope-regular") + " rounded-[20] flex-1  h-[40] text-[16] text-grey-500"}
                        placeholderTextColor={"#363636"}
                        placeholder={(searchFocus)?"":"Search"}
                        onFocus={()=>setSearchFocus(true)}
                        onBlur={()=>setSearchFocus(false)}

                    />
                    <Pressable className="mr-[16]" onPress={SearchAction}>
                        {
                            (toggleFilter) ?
                                (


                                    <IconRemove />

                                )
                                :
                                (
                                    <IconFilter />
                                )
                        }
                    </Pressable>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ScheduleContainer filter={2} />
                </ScrollView>
            </View>
        </View>
    )
}








function ScheduleContainer(props: { filter: number }) {
    const state = useGlobalStore();
    if (!state.get.main_schedule) {
        return;
    }
    const filtered_data = FilterResult(props.filter, state.get.main_schedule.data, state.get.main_schedule.rooms.map(x => x.room_name));
    // console.log(state.get.main_schedule.data)
    const ViewSchedule = (x: DataFiltered) => {
        const view_schedule_state: ViewScheduleType = {
            selected: x.filter,
            data: x,
            highlighted_id: "",
            filter_type: GetFilterType(),
            view_availability: (props.filter == 2),
        }
        state.get.view_schedule = view_schedule_state;
        state.set();
    }
    console.log(filtered_data);
    const GetFilterType = (): ScheduleFilterType => {
        switch (props.filter) {
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

    return (
        <View className="mt-20  inline-block " style={{ flexWrap: "wrap", flexDirection: "row", gap: 8 }}>
            {
                filtered_data.map((x, i) => {
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
                    // console.log(x);
                    // console.log(x);
                    return (
                        <Pressable key={i} onPress={() => ViewSchedule(x)} className=" relative w-[152] h-[152] rounded-[16px] bg-grey-900">
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
                })
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
        <View className={GetStyle() + " absolute rounded-[6px]  w-full ease-bezier-in duration-150 "} style={{ height: style_length, top: style_start }}>
        </View>
        // <View className="w-[120px] h-max bg-green-500">
        //     <Text>{style_length}: {style_start}</Text>
        // </View>
    )
}