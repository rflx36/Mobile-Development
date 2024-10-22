import * as React from "react"
import Svg, { Defs, G, Path, RadialGradient, Stop } from "react-native-svg"
const IconTabSchedule = (props: any) => {


    return (props.is_active) ?
        (<Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G filter="url(#filter0_i_366_1364)">
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.5 22.5C2.84315 22.5 1.5 21.1569 1.5 19.5V5V4.5C1.5 2.84315 2.84315 1.5 4.5 1.5H19.5C21.1569 1.5 22.5 2.84315 22.5 4.5V5V16.1729C22.5 17.0181 22.1434 17.8241 21.518 18.3927L17.8582 21.7198C17.306 22.2218 16.5865 22.5 15.8402 22.5H4.5ZM15.9697 17.4797C15.9601 16.3685 16.8583 15.4625 17.9696 15.4625H20C20.5523 15.4625 21 15.0148 21 14.4625V7.5C21 6.94772 20.5523 6.5 20 6.5H4C3.44772 6.5 3 6.94772 3 7.5V19C3 20.1046 3.89543 21 5 21H14.9914C15.547 21 15.9961 20.547 15.9913 19.9914L15.9697 17.4797Z"
                    fill="url(#paint0_radial_366_1364)"
                />
            </G>
            <Path
                d="M1 19.5C1 21.433 2.567 23 4.5 23H15.8402C16.7109 23 17.5503 22.6755 18.1945 22.0898L21.8544 18.7627C22.584 18.0994 23 17.159 23 16.1729V5V4.5C23 2.567 21.433 1 19.5 1H4.5C2.567 1 1 2.567 1 4.5V5V19.5ZM17.9696 14.9625C16.5805 14.9625 15.4578 16.0949 15.4697 17.484L15.4913 19.9957C15.4937 20.2735 15.2692 20.5 14.9914 20.5H5C4.17157 20.5 3.5 19.8284 3.5 19V7.5C3.5 7.22386 3.72386 7 4 7H20C20.2761 7 20.5 7.22386 20.5 7.5V14.4625C20.5 14.7386 20.2761 14.9625 20 14.9625H17.9696Z"
                stroke="#151515"
                strokeLinecap="square"
            />
            <Defs>
                <RadialGradient
                    id="paint0_radial_366_1364"
                    cx={0}
                    cy={0}
                    r={1}
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(12 3.5) rotate(90) scale(19 28.0785)"
                >
                    <Stop stopColor="#E9AA96" />
                    <Stop offset={0.446501} stopColor="#C185A2" />
                    <Stop offset={1} stopColor="#6962AD" />
                </RadialGradient>
            </Defs>
        </Svg>) :

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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 23C2.79086 23 1 21.2091 1 19L1 4.675C1 2.64535 2.64535 1 4.675 1H19.325C21.3546 1 23 2.64535 23 4.675L23 16.1663C23 17.0081 22.6463 17.8112 22.0253 18.3795L17.836 22.2132C17.2829 22.7193 16.5604 23 15.8107 23H5ZM16.4524 18.4375C16.4524 17.3329 17.3478 16.4375 18.4524 16.4375H20.4762C21.5808 16.4375 22.4762 15.5421 22.4762 14.4375V7C22.4762 5.89543 21.5808 5 20.4762 5H4.52381C2.86696 5 1.52381 6.34315 1.52381 8V18.475C1.52381 20.6841 3.31468 22.475 5.52381 22.475H14.4524C15.557 22.475 16.4524 21.5796 16.4524 20.475V18.4375Z"
                    fill="#363636"
                    stroke="#363636"
                    strokeLinecap="square"
                />
            </Svg>
        )
}
export default IconTabSchedule
