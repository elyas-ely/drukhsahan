import { View, Text } from 'react-native';
import Header from '@components/shared/Header';

export default function AboutUs() {
  return (
    <View>
      <Header
        rightIcon="ChevronRight"
        title="زموږ په اړه"
        secondaryLogo={true}
      />
    </View>
  );
}
