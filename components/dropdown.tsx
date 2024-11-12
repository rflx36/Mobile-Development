import { useState } from "react"
import { Image, Pressable, ScrollView, Text, View } from "react-native";



interface IDropdown {
    options: Array<string>,
    value: string,
    onChange: (value: string) => void,
    isActive: (value: boolean) => void,
    text: string,
    valid: boolean
}


export default function Dropdown(props: IDropdown) {
    const [isOpen, setIsOpen] = useState(false);

    const SelectOption = (option: string) => {
        setIsOpen(false);
        props.onChange(option);
        props.isActive(false);
    }

    const Toggle = () => {

        setIsOpen(true);
        props.isActive(true);
    }


    return (
        <Pressable onPress={Toggle}>
            <View className={(isOpen ? "border border-grey-750 bg-grey-950" : "bg-grey-900") + " h-[40]  rounded-[12px] w-full items-center flex-row"}>
                <View className="flex-1  items-center">

                    <Text className={((props.value != "" && !props.valid) ? "text-[#F57272] " : "text-grey-300") + " ml-4 font-manrope-semibold"}>{(props.value != "") ? props.value : props.text} </Text>
                </View>
                <Image source={require("../assets/icons/icon-arrow-dropdown.png")} className={((isOpen) ? "rotate-180 translate-y-[0px]" : "translate-y-[2px]") + " mx-2 h-[24] w-[24]"} />

            </View>
            {
                isOpen &&
                (
                    <View className=" mt-2 w-full   rounded-[12px] bg-grey-950 overflow-hidden">
                        <ScrollView className="h-max max-h-[200]">
                            <View className="w-auto mx-1 items-center">
                                {props.options.map((x, i) => (
                                    <Pressable className="h-[40] m-1 rounded-[8px] bg-grey-900 w-full flex justify-center items-center" key={i} onPress={() => SelectOption(x)}>
                                        <Text className="text-white">{x}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                )
            }
        </Pressable >
    )
}