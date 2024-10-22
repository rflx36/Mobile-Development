import {View } from "react-native";
import {Switch} from "react-native-switch";



export default function ToggleSwitch(props: { value: boolean, onChange: (x: boolean) => void,active_color: string }) {

    return (
        <View>
            <Switch
                
                
                value={props.value}
                onValueChange={(x)=> props.onChange(x)}
                renderActiveText={false}
                renderInActiveText={false}
                circleSize={30}
                barHeight={40}
                switchLeftPx={2}
                switchRightPx={2}
                switchWidthMultiplier={2.5}
                backgroundActive="#1E1E1E"
                backgroundInactive="#1E1E1E"
                circleActiveColor={props.active_color}
                circleInActiveColor="#363636"
                circleBorderWidth={0}
                
               
            />
            
        </View>
    )

}