import React from 'react';
import { View, StyleSheet } from 'react-native';
import SaffeCaptureComponent from './SaffeCaptureComponent';

type Props = {
  captureKey: string;
  user: string;
  type: 'verification' | 'onboarding';
  endToEndId: string;
  onError: () => void;
  onLoad: () => void;
  onClose: () => void;
  onFinish: () => void;
  onTimeout: () => void;
};

export default function SaffeCapture(props: Props) {
  return (
    <View style={styles.container}>
      <SaffeCaptureComponent
        onError={props.onError}
        onLoad={props.onLoad}
        captureKey={props.captureKey}
        type={props.type}
        endToEndId={props.endToEndId}
        user={props.user}
        onClose={props.onClose}
        onFinish={props.onFinish}
        onTimeout={props.onTimeout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
});
