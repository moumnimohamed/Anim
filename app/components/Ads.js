import {View} from 'react-native';
import React, {useEffect} from 'react';
import {
  Appodeal,
  AppodealAdType,
  AppodealRewardedEvent,
} from 'react-native-appodeal';

const adTypes = AppodealAdType.REWARDED_VIDEO;
const consent = true;

class Ads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adsLoaded: false,
    };
  }
  componentDidMount() {
    Appodeal.initialize(
      'b03f892844816579286f39e650a84c4055c9d2866af72395',
      adTypes,
      consent,
    );

    Appodeal.isLoaded(adTypes, result =>
      console.log(
        adTypes,
        result
          ? this.setState({adsLoaded: true})
          : this.setState({adsLoaded: false}),
      ),
    );
  }

  render() {
    return <View>{Appodeal.show(AppodealAdType.INTERSTITIAL)}</View>;
  }
}

export default Ads;
