export interface NPMDownloadInfo {
	downloads: number;
	start: string;
	end: string;
	package: string;
}

export enum PeriodEnum {
	LAST_DAY = 'last-day',
	LAST_WEEK = 'last-week',
	LAST_MONTH = 'last-month',
	TOTAL = 'total',
}

export default function ({
	userId,
	period,
	repository
}: {
	period: PeriodEnum | string;
	userId?: string;
	repository?: string;
}): Promise<NPMDownloadInfo | NPMDownloadInfo[]>;
