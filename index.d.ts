interface NPMDownloadInfo {
	downloads: number;
	start: string;
	end: string;
	package: string;
}

export default function ({
	userId,
	period,
	repository
}: {
	period: 'last-day' | 'last-week' | 'last-month' | 'last-day' | 'total' | string;
	userId?: string;
	repository?: string;
}): Promise<NPMDownloadInfo | NPMDownloadInfo[]>;
