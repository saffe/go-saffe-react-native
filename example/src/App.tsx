import * as React from 'react';

import SaffeCapture from 'go-saffe-react-native';
import { View } from 'react-native';

export default function App() {
  const apiKey = 'a4fb164e-ff2a-11ed-97b8-0242ac120003';
  const user = 'pedro@pedro.com';

  const onFinish = () => {
    console.log('terminou');
  }

  const onClose = () => {
    console.log('fechou');
  }

  return (
    <View style={{ flex: 1 }}>
      <SaffeCapture
        apiKey={apiKey}
        user={user}
        type="onboarding"
        end2end="12312"
        onClose={onClose}
        onFinish={onFinish}
      />
    </View>
  );
}
