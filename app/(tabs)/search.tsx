import IconRemove from "@/assets/icons/icon_add";
import IconFilter from "@/assets/icons/icon_filter";
import IconSearch from "@/assets/icons/icon_search";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";


export default function Search() {
    const [searchValue, setSearchValue] = useState("");
    const [toggleFilter, setToggleFilter] = useState(false);


    const SearchAction = () => {

        // if (toggleFilter)
    }

    const Search = () => {

    }

    return (
        <View className="bg-grey-950 h-full w-full ">
            <View className="mx-[24] w-auto h-full">

                <View className="bg-grey-950 h-[60] justify-center  flex items-end">
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
                        placeholder="Search"

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

            </View>
        </View>
    )
}