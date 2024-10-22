import React from 'react';
import { View } from 'react-native';
import Svg, { Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import { styled } from 'nativewind';

interface GradientTextProps {
    text: string;
    fontSize?: number;  // Optional prop to control font size
    className?: string; // NativeWind class names for custom styling
}

const StyledView = styled(View);

const GradientText: React.FC<GradientTextProps> = ({ text, fontSize = 40, className }) => {
    // Calculate width based on the text length and font size
    const textWidth = fontSize * text.length * 0.6;

    return (
        <StyledView className={className}>
            <Svg height={fontSize * 1.5} width={textWidth}>
                <Defs>
                    <LinearGradient id="grad" x1="1" y1="0" x2="0" y2="0">

                        <Stop offset="1" stopColor="#E9AA96" stopOpacity="1" />
                        <Stop offset="0.5" stopColor="#C185A2" stopOpacity="1" />
                        <Stop offset="0" stopColor="#6962AD" stopOpacity="1" />

                    </LinearGradient>
                </Defs>
                <SvgText
                    fontFamily='manrope-semibold'
                    fill="url(#grad)"
                    fontSize={fontSize}
                    x={textWidth / 2}
                    y={fontSize}
                    textAnchor="middle"
                >
                    {text}
                </SvgText>
            </Svg>
        </StyledView>
    );
};

export default GradientText;
