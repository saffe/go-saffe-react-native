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
  apiKey={} // capture key (sandbox or production)
  user={} // user identifier (either email or CPF)
  type={} // "onboarding" or "verification"
  endToEndId={} // identifier to keep consistency between front and backend
  onClose={} // callback function called when end-user closes (cancels) the capture
  onFinish={} // callback function called when end-user finishes (completes) the capture
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
