import * as React from 'react';

import { View } from 'react-native';

import SaffeCapture from 'go-saffe-react-native';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={style.container}>
      <SaffeCapture
        captureKey="7ce7e152-ff28-11ed-97b8-0242ac120003"
        user="p@p.com"
        type="verification"
        endToEndId="123"
        onClose={() => console.log('close')}
        onLoad={() => console.log('loading')}
        onError={() => console.log('error')}
        onFinish={() => console.log('finish')}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
