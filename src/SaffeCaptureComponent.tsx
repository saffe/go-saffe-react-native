import React from "react";
import { WebView } from "react-native-webview";
import { Platform, StyleSheet } from "react-native";
import { ExtraData, ExtraDataDTO } from "./interfaces";

let JailMonkey: any;

try {
	JailMonkey = require("jail-monkey");
} catch (error) {
	JailMonkey = null;
}

type Props = {
	captureKey: string;
	user: string;
	type: "verification" | "onboarding";
	endToEndId: string;
	onError: () => void;
	onLoad: () => void;
	onClose: () => void;
	onFinish: () => void;
	onTimeout: () => void;
	extraData?: ExtraData;
};

const parseExtraData = (extraData: ExtraData): ExtraDataDTO => {
	const extraDataDTO: ExtraDataDTO = {};

	if (extraData.settings) {
		extraDataDTO.settings = {
			primary_color: extraData.settings.primaryColor,
			secondary_color: extraData.settings.secondaryColor,
			lang: extraData.settings.lang,
		};
	}

	if (extraData.sendResultsTo) {
		extraDataDTO.send_results_to = {
			media: extraData.sendResultsTo.media,
			email: extraData.sendResultsTo.email,
		};
	}

	return extraDataDTO;
};

const SaffeCaptureComponent = (props: Props) => {
	const body = {
		capture_key: props.captureKey ?? null,
		user_identifier: props.user ?? null,
		type: props.type ?? null,
		end_to_end_id: props.endToEndId ?? null,
		device_context: getDeviceContext(),
		extra_data: parseExtraData(props.extraData ?? {}),
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
			useWebKit
			style={styles.container}
			originWhitelist={["*"]}
			allowsInlineMediaPlayback
			mediaPlaybackRequiresUserAction={false}
			onMessage={(event) => {
				const data = JSON.parse(event.nativeEvent.data);
				if (data && data.source === "go-saffe-capture") {
					switch (data.payload.event) {
						case "close":
							if (props.onClose) {
								props.onClose();
							}
							break;
						case "finish":
							if (props.onFinish) {
								props.onFinish();
							}
							break;
						case "timeout":
							if (props.onTimeout) {
								props.onTimeout();
							}
							break;
					}
				}
			}}
			source={{
				uri: "https://go.saffe.ai/v0/capture",
				headers: { "Content-Type": "application/json" },
				method: "post",
				body: JSON.stringify(body),
			}}
		/>
	);
};

const getDeviceContext = () => {
	try {
		if (JailMonkey) {
			const isJailBroken = JailMonkey.isJailBroken();
			const isRealDevice = JailMonkey.trustFall();

			let isOnExternalStorage = false;

			if (Platform.OS === "android") {
				isOnExternalStorage = JailMonkey.isOnExternalStorage();
			}

			return {
				isJailBroken,
				isRealDevice,
				isOnExternalStorage,
			};
		} else {
			return null;
		}
	} catch (error) {
		console.log("error", error);
		return null;
	}
};

export default SaffeCaptureComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
