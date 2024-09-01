import { View } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { useState } from 'react';
import EditProfileInfo from '../../components/EditProfileInfo';
import EditUserProfileInfo from '../../components/EditUserProfileInfo';

export default function EditProfile() {
  const { colors } = useTheme();
  const [commanUser, setCommanUser] = useState(false);

  return (
    <View style={{ backgroundColor: colors.secondaryBackground, flex: 1 }}>
      {commanUser ? <EditUserProfileInfo /> : <EditProfileInfo />}
    </View>
  );
}
