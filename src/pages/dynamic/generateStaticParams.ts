import { loadConfig } from '../../runtime/config-loader';

export async function generateStaticParams() {
  const config = await loadConfig();

  return config.pages.map((p: any) => {
    return { all: p.path.slice(1).split('/') };
  });
}
