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
      showAds: false,
    };
  }
  componentDidMount() {
    Appodeal.initialize(
      'b03f892844816579286f39e650a84c4055c9d2866af72395',
      adTypes,
      consent,
    );

    Appodeal.addEventListener(AppodealRewardedEvent.LOADED, (event: any) => {
      console.log('Rewarded video loaded. Precache: ', event.isPrecache),
        this.setState({showAds: true});
    });
    Appodeal.addEventListener(AppodealRewardedEvent.SHOWN, () =>
      console.log('Rewarded video shown'),
    );
    Appodeal.addEventListener(AppodealRewardedEvent.EXPIRED, () =>
      console.log('Rewarded video expired'),
    );
    Appodeal.addEventListener(AppodealRewardedEvent.REWARD, (event: any) =>
      console.log(
        'Rewarded video finished. Amount: ',
        event.amount + ', currency: ' + event.currency,
      ),
    );
    Appodeal.addEventListener(AppodealRewardedEvent.CLOSED, (event: any) =>
      console.log('Rewarded video closed, is finished: ', event.isFinished),
    );
    Appodeal.addEventListener(AppodealRewardedEvent.FAILED_TO_LOAD, () =>
      console.log('Rewarded video failed to load'),
    );
    Appodeal.addEventListener(AppodealRewardedEvent.FAILED_TO_SHOW, () =>
      console.log('Rewarded video failed to show'),
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

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.adsLoaded !== this.state.adsLoaded) {
    //   this.setState({showAds: true});
    //   console.log('MUST SHOW ADS', this.state.adsLoaded);
    //   // re-render x <-- not sure how to do this
    // }
  }

  render() {
    return this.state.showAds ? (
      <View>{Appodeal.show(AppodealAdType.REWARDED_VIDEO)}</View>
    ) : (
      <View />
    );
  }
}

export default Ads;
