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
  extraData={} // optional extra configuration data
/>
```

### Extra Data Configuration

The `extraData` prop allows you to customize the capture component with additional settings:

```js
<SaffeCapture
  // ... other props
  extraData={{
    settings: {
      primaryColor: "#00ABAB",     // optional: primary color for the interface
      secondaryColor: "#00FF00",   // optional: secondary color for the interface
      lang: "pt"                   // optional: language code (e.g., "pt", "en", "es")
    }
  }}
/>
```

**Settings Properties:**
- `primaryColor` (string, optional): Sets the primary color theme for the capture interface
- `secondaryColor` (string, optional): Sets the secondary color theme for the capture interface  
- `lang` (string, optional): Sets the language for the capture interface (language code format)

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
```
