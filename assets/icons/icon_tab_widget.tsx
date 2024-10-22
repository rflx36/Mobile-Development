import * as React from "react"
import Svg, { Defs, G, Path, RadialGradient, Rect, Stop } from "react-native-svg"
const IconWidget = (props: any) => {

  return (props.is_active) ?
    (
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <G filter="url(#filter0_i_366_1366)">
          <Path
            d="M14.4142 7.41421C13.6332 6.63316 13.6332 5.36684 14.4142 4.58579L16.5858 2.41421C17.3668 1.63316 18.6332 1.63317 19.4142 2.41421L21.5858 4.58579C22.3668 5.36684 22.3668 6.63316 21.5858 7.41421L19.4142 9.58579C18.6332 10.3668 17.3668 10.3668 16.5858 9.58579L14.4142 7.41421Z"
            fill="url(#paint0_radial_366_1366)"
          />
          <Path
            d="M1 16C1 14.3431 2.34315 13 4 13H8C9.65685 13 11 14.3431 11 16V20C11 21.6569 9.65685 23 8 23H4C2.34315 23 1 21.6569 1 20V16Z"
            fill="url(#paint1_radial_366_1366)"
          />
          <Path
            d="M1 4C1 2.34315 2.34315 1 4 1H8C9.65685 1 11 2.34315 11 4V8C11 9.65685 9.65685 11 8 11H4C2.34315 11 1 9.65685 1 8V4Z"
            fill="url(#paint2_radial_366_1366)"
          />
          <Path
            d="M13 16C13 14.3431 14.3431 13 16 13H20C21.6569 13 23 14.3431 23 16V20C23 21.6569 21.6569 23 20 23H16C14.3431 23 13 21.6569 13 20V16Z"
            fill="url(#paint3_radial_366_1366)"
          />
        </G>
        <Path
          d="M14.4142 7.41421C13.6332 6.63316 13.6332 5.36684 14.4142 4.58579L16.5858 2.41421C17.3668 1.63316 18.6332 1.63317 19.4142 2.41421L21.5858 4.58579C22.3668 5.36684 22.3668 6.63316 21.5858 7.41421L19.4142 9.58579C18.6332 10.3668 17.3668 10.3668 16.5858 9.58579L14.4142 7.41421Z"
          stroke="#151515"
        />
        <Path
          d="M1 16C1 14.3431 2.34315 13 4 13H8C9.65685 13 11 14.3431 11 16V20C11 21.6569 9.65685 23 8 23H4C2.34315 23 1 21.6569 1 20V16Z"
          stroke="#151515"
        />
        <Path
          d="M1 4C1 2.34315 2.34315 1 4 1H8C9.65685 1 11 2.34315 11 4V8C11 9.65685 9.65685 11 8 11H4C2.34315 11 1 9.65685 1 8V4Z"
          stroke="#151515"
        />
        <Path
          d="M13 16C13 14.3431 14.3431 13 16 13H20C21.6569 13 23 14.3431 23 16V20C23 21.6569 21.6569 23 20 23H16C14.3431 23 13 21.6569 13 20V16Z"
          stroke="#151515"
        />
        <Defs>
          <RadialGradient
            id="paint0_radial_366_1366"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(13 3) rotate(92.8624) scale(20.025 25.2079)"
          >
            <Stop stopColor="#E9AA96" />
            <Stop offset={0.404797} stopColor="#C185A2" />
            <Stop offset={1} stopColor="#6962AD" />
          </RadialGradient>
          <RadialGradient
            id="paint1_radial_366_1366"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(13 3) rotate(92.8624) scale(20.025 25.2079)"
          >
            <Stop stopColor="#E9AA96" />
            <Stop offset={0.404797} stopColor="#C185A2" />
            <Stop offset={1} stopColor="#6962AD" />
          </RadialGradient>
          <RadialGradient
            id="paint2_radial_366_1366"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(13 3) rotate(92.8624) scale(20.025 25.2079)"
          >
            <Stop stopColor="#E9AA96" />
            <Stop offset={0.404797} stopColor="#C185A2" />
            <Stop offset={1} stopColor="#6962AD" />
          </RadialGradient>
          <RadialGradient
            id="paint3_radial_366_1366"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(13 3) rotate(92.8624) scale(20.025 25.2079)"
          >
            <Stop stopColor="#E9AA96" />
            <Stop offset={0.404797} stopColor="#C185A2" />
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
        <Rect x={1} y={1} width={10} height={10} rx={3} fill="#363636" />
        <Path
          d="M14.4142 7.41421C13.6332 6.63316 13.6332 5.36684 14.4142 4.58579L16.5858 2.41421C17.3668 1.63316 18.6332 1.63317 19.4142 2.41421L21.5858 4.58579C22.3668 5.36684 22.3668 6.63316 21.5858 7.41421L19.4142 9.58579C18.6332 10.3668 17.3668 10.3668 16.5858 9.58579L14.4142 7.41421Z"
          fill="#363636"
        />
        <Rect x={13} y={13} width={10} height={10} rx={3} fill="#363636" />
        <Rect x={1} y={13} width={10} height={10} rx={3} fill="#363636" />
      </Svg>
    )
}

export default IconWidget
