# go-saffe-react-native

Package to render saffe capture

## Installation

```sh
npm install @go.saffe/go-saffe-react-native
```

## Usage

```js
import SaffeCapture from "@go.saffe/go-saffe-react-native";

// ...
<SaffeCapture
  captureKey={} // capture key (sandbox or production)
  user={} // user identifier (either email or CPF)
  type={} // "onboarding" or "verification"
  endToEndId={} // identifier to keep consistency between front and backend
  onLoad={} // callback function called when component is loading
  onError={} // callback function called to catch error from component
  onClose={} // callback function called when end-user closes (cancels) the capture
  onFinish={} // callback function called when end-user finishes (completes) the capture
  onTimeout={} // callback function called when the capture ends for timeout
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
