import React from 'react';
import { WebView } from 'react-native-webview/src';
import { Platform, StyleSheet } from 'react-native';
import JailMonkey from 'jail-monkey';

type Props = {
  captureKey: string;
  user: string;
  type: 'verification' | 'onboarding';
  endToEndId: string;
  onError: () => void;
  onLoad: () => void;
  onClose: () => void;
  onFinish: () => void;
};

const SaffeCaptureComponent = (props: Props) => {
  const body = {
    capture_key: props.captureKey ?? null,
    user_identifier: props.user ?? null,
    type: props.type ?? null,
    end_to_end_id: props.endToEndId ?? null,
    device_context: getDeviceContext() ?? null,
  };

  return (
    <WebView
      onError={() => {
        if (props.onError) {
          props.onError();
        }
      }}
      onLoad={() => {
        if (props.onLoad) {
          props.onLoad();
        }
      }}
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
};

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

export default SaffeCaptureComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
