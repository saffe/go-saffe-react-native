import React from 'react';
import { WebView } from 'react-native-webview';
import { Platform, StyleSheet } from 'react-native';
import JailMonkey from 'jail-monkey';

export default function SaffeCaptureComponent(props) {
  const body = {
    capture_key: props.captureKey ?? null,
    user_identifier: props.user ?? null,
    type: props.type ?? null,
    end_to_end_id: props.endToEndId ?? null,
    device_context: getDeviceContext(),
  };

  return (
    <WebView
      onError={() => {
        if (props.onError()) {
          props.onError();
        }
      }}
      onLoad={() => {
        if (props.onLoad()) {
          props.onLoad();
        }
      }}
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

const getDeviceContext = () => {
  try {
    const isJailBroken = JailMonkey.isJailBroken();
    const isRealDevice = JailMonkey.trustFall();

    let isOnExternalStorage = false;

    if (Platform.OS === 'android') {
      isOnExternalStorage = JailMonkey.isOnExternalStorage();
    }

    return {
      isJailBroken,
      isRealDevice,
      isOnExternalStorage,
    };
  } catch (error) {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
