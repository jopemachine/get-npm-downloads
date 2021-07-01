interface NPMDownloadInfo {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

export default function ({
  userId,
  period,
  repo,
}: {
  period: string;
  userId?: string;
  repo?: string;
}): Promise<NPMDownloadInfo[]>;
