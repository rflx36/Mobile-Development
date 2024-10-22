import * as React from "react"
import Svg, { Path } from "react-native-svg"
const IconFilter = (props:any) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M2 6.5H18"
      stroke="#363636"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M2 13.5L18 13.5"
      stroke="#363636"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M19 6.5C19 7.60457 18.1046 8.5 17 8.5C15.8954 8.5 15 7.60457 15 6.5C15 5.39543 15.8954 4.5 17 4.5C18.1046 4.5 19 5.39543 19 6.5Z"
      fill="#363636"
    />
    <Path
      d="M5 13.5C5 14.6046 4.10457 15.5 3 15.5C1.89543 15.5 1 14.6046 1 13.5C1 12.3954 1.89543 11.5 3 11.5C4.10457 11.5 5 12.3954 5 13.5Z"
      fill="#363636"
    />
  </Svg>
)
export default IconFilter
