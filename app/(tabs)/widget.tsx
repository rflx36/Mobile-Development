import ToggleSwitch from "@/components/toggle_switch";
import { useGlobalStore } from "@/stores/global_store";
import { HelloWidget } from "@/widgets/hello_widget";
import { Button, Pressable, Text, View } from "react-native";
import { requestWidgetUpdate, WidgetPreview } from "react-native-android-widget";


export default function Widget() {
    const state = useGlobalStore();


    const UpdateFormat = (x: boolean) => {
        state.get.widget_use_24_hour = x;
        state.set();
    }
    const UpdateWeek = (x: boolean) => {
        state.get.widget_show_weekday = x;
        state.set();
    }
    const UpdateCollapse = (x: boolean) => {
        state.get.widget_use_collapse = x;
        state.set();
    }

    const AddWidget = () => {
        console.log("presesd");
    }
    requestWidgetUpdate
    return (
        <View className="bg-grey-950 h-full w-full ">
            <View className="mx-[24] w-auto h-full">

                <View className="bg-grey-950 h-[60] justify-center  flex items-end">
                    <Text className="text-grey-400 font-manrope-semibold text-[24px]">Widget</Text>
                </View>

                <View className="flex flex-row justify-between items-center my-[12]">
                    <Text className="text-grey-400 text-[18px] font-manrope-bold">Use 24 Hour format</Text>
                    <ToggleSwitch value={state.get.widget_use_24_hour} onChange={x => UpdateFormat(x)} active_color="#E9AA96" />
                </View>
                <View className="flex flex-row justify-between items-center my-[12]">
                    <Text className="text-grey-400 text-[18px] font-manrope-bold">Show Week Day</Text>
                    <ToggleSwitch value={state.get.widget_show_weekday} onChange={x => UpdateWeek(x)} active_color="#C185A2" />
                </View>
                <View className="flex flex-row justify-between items-center my-[12]">
                    <Text className="text-grey-400 text-[18px] font-manrope-bold">Use Collapse Mode</Text>
                    <ToggleSwitch value={state.get.widget_use_collapse} onChange={x => UpdateCollapse(x)} active_color="#6962AD" />
                </View>

                <Pressable className="my-[12] bg-primary w-full flex items-center justify-center rounded-[24px] h-[60]" onPress={AddWidget}>
                    <View className="w-max">
                        <Text className="text-grey-900 text-[16px] font-manrope-bold">
                            Add The Widget
                        </Text>
                    </View>
                </Pressable>

                <View className="mt-[12]">
                    <Text className="text-grey-750 font-manrope-bold text-[18] ">Preview</Text>
                </View>
                <View>
                    <WidgetPreview
                        renderWidget={() => <HelloWidget />}
                        width={320}
                        height={200}
                    />
                </View>

            </View>
        </View>
    )
}