import * as React from "react"
import Svg, { Defs, G, Path, RadialGradient, Stop } from "react-native-svg"
const IconTabSearch = (props: any) => {


  return (props.is_active) ?
    (<Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.8 9.6C16.8 11.5882 15.9941 13.3882 14.6912 14.6912C13.3882 15.9941 11.5882 16.8 9.59999 16.8C5.62354 16.8 2.39999 13.5765 2.39999 9.6C2.39999 5.62355 5.62354 2.4 9.59999 2.4C13.5764 2.4 16.8 5.62355 16.8 9.6Z"
        stroke="#151515"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <Path
        d="M16.8374 14.3626L15.6 13.1251L13.1251 15.6L14.3626 16.8374L16.8374 14.3626ZM18.5626 21.0374C19.246 21.7209 20.354 21.7209 21.0374 21.0374C21.7209 20.354 21.7209 19.246 21.0374 18.5626L18.5626 21.0374ZM14.3626 16.8374L18.5626 21.0374L21.0374 18.5626L16.8374 14.3626L14.3626 16.8374Z"
        fill="#151515"
      />
      <G filter="url(#filter0_i_366_1365)">
        <Path
          d="M14.6912 14.6912C15.9941 13.3882 16.8 11.5882 16.8 9.6C16.8 5.62355 13.5764 2.4 9.59999 2.4C5.62354 2.4 2.39999 5.62355 2.39999 9.6C2.39999 13.5765 5.62354 16.8 9.59999 16.8C11.5882 16.8 13.3882 15.9941 14.6912 14.6912ZM14.6912 14.6912L19.8 19.8"
          stroke="url(#paint0_radial_366_1365)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </G>
      <Defs>
        <RadialGradient
          id="paint0_radial_366_1365"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 4) rotate(99.7824) scale(14.7139 9.29862)"
        >
          <Stop stopColor="#E9AA96" />
          <Stop offset={0.465} stopColor="#C185A2" />
          <Stop offset={1} stopColor="#6962AD" />
        </RadialGradient>
      </Defs>
    </Svg>)
    :
    (
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Path
          d="M16.8 9.6C16.8 11.5882 15.9941 13.3882 14.6912 14.6912C13.3882 15.9941 11.5882 16.8 9.59999 16.8C5.62354 16.8 2.39999 13.5764 2.39999 9.6C2.39999 5.62355 5.62354 2.4 9.59999 2.4C13.5764 2.4 16.8 5.62355 16.8 9.6Z"
          stroke="#363636"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Path
          d="M16.1303 15.0697L15.6 14.5393L14.5393 15.6L15.0697 16.1303L16.1303 15.0697ZM19.2697 20.3303C19.5626 20.6232 20.0374 20.6232 20.3303 20.3303C20.6232 20.0374 20.6232 19.5626 20.3303 19.2697L19.2697 20.3303ZM15.0697 16.1303L19.2697 20.3303L20.3303 19.2697L16.1303 15.0697L15.0697 16.1303Z"
          fill="#363636"
        />
      </Svg>
    )
}

export default IconTabSearch
