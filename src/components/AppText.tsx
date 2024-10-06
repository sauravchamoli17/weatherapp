import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { styled } from 'nativewind';

interface AppTextProps extends TextProps {
  style?: TextStyle;
  children: React.ReactNode;
  fontFamily?: string;
  className?: string;
}

const StyledText = styled(Text);

const AppText: React.FC<AppTextProps> = ({
  children,
  style,
  fontFamily = 'AvenirLTStd-Roman',
  className = '',
  ...rest
}) => {
  return (
    <StyledText style={[{ fontFamily }, style]} className={className} {...rest}>
      {children}
    </StyledText>
  );
};

export default AppText;