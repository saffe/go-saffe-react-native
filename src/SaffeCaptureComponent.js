import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';

export default function SaffeCaptureComponent(props) {
  return (
    <WebView
      useWebKit
      style={styles.container}
      originWhitelist={['*']}
      allowsInlineMediaPlayback
      mediaPlaybackRequiresUserAction
      onMessage={(event) => {
        const data = JSON.parse(event.nativeEvent.data)
        if (data && data.source === 'go-saffe-capture') {
          if (data.payload.event === 'close') {
            if (props.onClose) {
              props.onClose();
            }
          }
          if (data.payload.event === 'finish') {
            if (props.onFinish) {
              props.onFinish();
            }
          }
        }
      }}
      source={{ uri: `https://pedrovictorcruz.github.io/myproject/?key=${props.apiKey}&type=${props.type}&endToEndId=${props.end2end}` }}
    />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
