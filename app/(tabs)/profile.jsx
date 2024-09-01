import { View, Text } from 'react-native';
import ProfileInfo from '@components/shared/ProfileInfo';
import { useState } from 'react';
import UserInfo from '@components/UserInfo';
import Header from '@components/shared/Header';

export default function profile() {
  const [commanUser, setCommanUser] = useState(false);
  return (
    <View className="flex-1">
      {commanUser ? <UserInfo /> : <ProfileInfo />}
    </View>
  );
}
