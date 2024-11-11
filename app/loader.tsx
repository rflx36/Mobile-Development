import { View } from "react-native";









export default function LoadingScreen (){



    return (
        <View className="bg-red-50 w-full h-full">
            <View className="w-[10] h-[10] animate-spin"></View>
        </View>
    )
}