import {Platform} from 'react-native';
import Share from 'react-native-share';

export default (share = anim => {
  console.log('bo3oq', anim);
  const url =
    'https://play.google.com/store/apps/details?id=com.medanimiamoumni';
  const title = anim.title;
  const message = `شاهد ${anim.title} فقط على`;
  const options = Platform.select({
    ios: {
      activityItemSources: [
        {
          placeholderItem: {type: 'url', content: url},
          item: {
            default: {type: 'url', content: url},
          },
          subject: {
            default: title,
          },
          linkMetadata: {originalUrl: url, url, title},
        },
        {
          placeholderItem: {type: 'text', content: message},
          item: {
            default: {type: 'text', content: message},
            message: null, // Specify no text to share via Messages app.
          },
        },
      ],
    },
    default: {
      title,
      subject: title,
      message: `${message} ${url}`,
    },
  });

  Share.open(options);
});
