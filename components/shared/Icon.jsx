import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Icons from '@assets/icons/index';
import { useTheme } from '@contexts/ThemeContext';

const Icon = memo(
  ({
    name,
    width = 24,
    height = 24,
    strokeWidth = 1.5,
    fill,
    stroke, // Remove the default value here
  }) => {
    const Component = Icons[name];
    if (!Component) {
      console.error(`Icon ${name} does not exist`);
      return null;
    }

    const { colors } = useTheme(); // Access the theme colors here
    const strokeColor = stroke || colors.icon; // Use the provided stroke or the theme color
    const fillColor = fill || colors.icon;

    return (
      <View>
        <Component
          width={width}
          height={height}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill={fillColor}
        />
      </View>
    );
  }
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  stroke: PropTypes.string, // Allow stroke to be passed as a prop
  strokeWidth: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
