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
  apiKey={} // your go saffe api key
  user={} // user identifier
  type={} // type of your capture: onboarding or verification
  endToEndId={} // end to end id
  onClose={} // your onClose function for client close the capture
  onFinish={} // your onFinish function for finsh capture
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
