import React from 'react';
import { TextInput, TextInputProps, TextStyle } from 'react-native';
import { styled } from 'nativewind';

interface AppInputProps extends TextInputProps {
    style?: TextStyle;
    fontFamily?: string;
    className?: string;
}

const StyledTextInput = styled(TextInput);

const AppInput: React.FC<AppInputProps> = ({
    style,
    fontFamily = 'AvenirLTStd-Roman',
    className = '',
    ...rest
}) => {
    return (
        <StyledTextInput
            style={[{ fontFamily }, style]}
            className={className}
            {...rest}
        />
    );
};

export default AppInput;