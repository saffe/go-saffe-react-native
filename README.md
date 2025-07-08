# go-saffe-react-native

Package to render saffe capture.

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
  extraData={} // optional extra configuration
/>
```

The `extraData` prop is **optional** and allows for dynamic changes specific to the transaction, such as language and colors.

Primary and secondary colors should be informed in hexadecimal code. Possible values for the key "lang" at the moment are "en" so that the capture interface is presented in english, "pt" for the language to be portuguese, and "es" for spanish.

### Example of `extraData` with color settings:

```js
<SaffeCapture
  // ... other props
  extraData={{
    settings: {
      primaryColor: "#00ABAB",
      secondaryColor: "#6A6A6A",
      lang: "en"
    }
  }}
/>
```

## Native Configuration

This component uses a WebView that requires native permissions to access the camera and location.
Make sure to update the native configuration in your app and note that location must be enabled in our panel.

**iOS (Info.plist):**

```xml
<key>NSCameraUsageDescription</key>
<string>We need camera access</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need location access</string>
```

**Android (AndroidManifest.xml):**

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

## Expo Configuration

If you're using Expo, add the following settings in your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSCameraUsageDescription": "camera access description",
        "NSLocationWhenInUseUsageDescription": "location access description"
      }
    },
    "android": {
      "permissions": [
        "CAMERA",
        "ACCESS_FINE_LOCATION"
      ]
    }
  }
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
