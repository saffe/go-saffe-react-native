import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';

export default function SaffeCaptureComponent(props) {
  const body = {
    api_key: props.apiKey ?? null,
    user_identifier: props.user ?? null,
    type: props.type ?? null,
    end_to_end_id: props.endToEndId ?? null,
  };

  return (
    <WebView
      useWebKit
      style={styles.container}
      originWhitelist={['*']}
      allowsInlineMediaPlayback
      mediaPlaybackRequiresUserAction={false}
      onMessage={(event) => {
        const data = JSON.parse(event.nativeEvent.data);
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
      source={{
        uri: 'https://go.saffe.ai/v0/capture',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify(body),
      }}
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
