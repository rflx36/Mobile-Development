import * as React from "react"
import Svg, { Path } from "react-native-svg"
const IconRemove = (props:any) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M19.2429 19.2426L15.0003 15M10.7577 10.7574L15.0003 15M15.0003 15L10.7577 19.2426M15.0003 15L19.2429 10.7574"
      stroke="#363636"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
)
export default IconRemove
