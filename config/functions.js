export function shortText(textAmount, maxAmount, text) {
  if (textAmount > maxAmount) {
    return `${text.slice(0, maxAmount)}...`;
  } else {
    return text;
  }
}

import { Dimensions } from 'react-native';
import { ms } from 'react-native-size-matters';

const screenWidth = Dimensions.get('window').width;
export function makeTextShort(textAmount, maxAmount, text) {
  const extraChars = Math.max(0, Math.floor((screenWidth - 360) / 5));
  const adjustedMaxAmount = maxAmount + extraChars;

  if (textAmount > adjustedMaxAmount) {
    return `${text.slice(0, adjustedMaxAmount)}...`;
  } else {
    return text;
  }
}

export const paddingHor = screenWidth > 500 ? ms(40) : ms(20);
