interface NPMDownloadInfo {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

export default async function ({
  userId,
  period,
  repo,
}: {
  period: string;
  userId?: string;
  repo?: string;
}): NPMDownloadInfo[];
