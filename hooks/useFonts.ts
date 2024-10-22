import * as Font from "expo-font";

export default async function SetFonts() {

    return await Font.loadAsync({
        'manrope-bold': require('../assets/fonts/Manrope-Bold.ttf'),
        'manrope-extrabold': require('../assets/fonts/Manrope-ExtraBold.ttf'),
        'manrope-extralight': require('../assets/fonts/Manrope-ExtraLight.ttf'),
        'manrope-light': require('../assets/fonts/Manrope-Light.ttf'),
        'manrope-medium': require('../assets/fonts/Manrope-Medium.ttf'),
        'manrope-regular': require('../assets/fonts/Manrope-Regular.ttf'),
        'manrope-semibold': require('../assets/fonts/Manrope-SemiBold.ttf'),

    });

}