import GradientText from "@/components/text_gradient";
import ToggleSwitch from "@/components/toggle_switch";
import { useGlobalStore } from "@/stores/global_store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";



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
        const dayName = daysOfWeek[today.getDay()];
        return dayName;
    };


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
    const today_day = ((new Date()).getDate()).toString();
    const today_weekday = getWeekday();
    
    return (
        <View className="bg-grey-950 h-full w-full ">
            <View className="mx-[24] w-auto">

                <View className=" h-[60] justify-center  flex items-end">
                    <Text className="text-grey-400 font-manrope-semibold text-[24px]">Today</Text>
                </View>
                <View className="h-max justify-center flex items-end">
                    <Text className="text-grey-750 text-[12] font-manrope-semibold">{today_month}, {today_day} {today_weekday}</Text>
                </View>
            </View>
            {
                (schedule) ?
                    (
                        <ScrollView>

                            <Text>Not Empty</Text>

                        </ScrollView>
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
                                <Pressable onPressIn={() => setLinkHovered(true)} onPress={SetLink} onPressOut={SetLink} className={"h-[50] mt-[65] w-[200] pt-[5] rounded-full justify-center items-center " + ((linkHovered) ? "bg-grey-750/60 scale-95 " : "bg-grey-900 ")}>
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