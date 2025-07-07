export interface Settings {
	primaryColor?: string;
	secondaryColor?: string;
	lang?: string;
}

export interface ExtraData {
	settings?: Settings;
}

export interface ExtraDataDTO {
	settings?: {
		primary_color?: string;
		secondary_color?: string;
		lang?: string;
	};
}
