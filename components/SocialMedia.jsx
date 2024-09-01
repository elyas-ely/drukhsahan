import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { ms } from 'react-native-size-matters';

export default function SocialMedia() {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get('window').width;

  const handleGoogle = () => {
    console.log('login with google');
  };
  const handleFacebook = () => {
    console.log('login with facebook');
  };

  const handleTwitter = () => {
    console.log('login with twitter');
  };

  const images = [
    {
      image: require('@assets/images/google.png'),
      action: handleGoogle,
    },
    {
      image: require('@assets/images/facebook.png'),
      action: handleFacebook,
    },
    {
      image: require('@assets/images/twitter.png'),
      action: handleTwitter,
    },
  ];

  return (
    <>
      <FlatList
        data={images}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        renderItem={({ item, index }) => (
          <View
            key={index}
            className="rounded-[15px] p-2.5 w-[45px] h-[45px] "
            style={{
              backgroundColor: colors.secondaryInput,
            }}
          >
            <Image
              source={item.image}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
        )}
        horizontal
        ItemSeparatorComponent={() => <View style={{ width: ms(25) }}></View>}
      />
    </>
  );
}
