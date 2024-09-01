import { View, Text } from 'react-native';
import React from 'react';
import ProfileInfo from '../../components/shared/ProfileInfo';

export default function SecondaryProfileScreen() {
  return (
    <View className="flex-1">
      <ProfileInfo otherUser={true} />
    </View>
  );
}
