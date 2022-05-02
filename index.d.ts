import {LiteralUnion} from 'type-fest';

export interface NPMDownloadInfo {
	downloads: number;
	start: string;
	end: string;
	package: string;
}

declare type Period =
	| 'last-day'
	| 'last-week'
	| 'last-month'
	| 'total';

export default function ({
	userId,
	period,
	repository
}: {
	period: LiteralUnion<Period, string>;
	userId?: string;
	repository?: string;
}): Promise<NPMDownloadInfo | NPMDownloadInfo[]>;
