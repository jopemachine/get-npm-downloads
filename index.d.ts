interface NPMDownloadInfo {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

export default function ({
  userId,
  period,
  repository,
}: {
  period: string;
  userId?: string;
  repository?: string;
}): Promise<NPMDownloadInfo[]>;
