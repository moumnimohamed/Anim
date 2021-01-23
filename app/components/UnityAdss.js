import * as React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import UnityAds from 'react-native-unity-ads-moon';

type FinishState = 'ERROR' | 'SKIPPED' | 'COMPLETED' | 'NOT_LOADED';

const UnityAdss = () => {
  React.useEffect(() => {
    UnityAds.initialized('cb41d10d-1c07-43a9-b9fe-485e0de9fbe9', 'video', true);
  }, []);

  const showAd = async () => {
    UnityAds.isLoad().then(isLoad => {
      if (isLoad) {
        UnityAds.showAd()
          .then((result: FinishState) => {
            console.log(result);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button onPress={showAd} title={'test'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UnityAdss;
