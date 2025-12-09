// src/runtime/metadata-resolver.ts
import { loadConfig } from './config-loader';
import { resolveRoute } from './route-resolver';
// import { fetchDataForPage } from '../utils/data-fetch'; // bạn tự implement

export async function resolveMetadata(pathParts: string[]) {
  const config = await loadConfig();
  const route = await resolveRoute(pathParts);

  if (!route) return {};

  // base info
  const metadata = {
    title: route.title ?? config.name,
    description: route.description ?? config.description,
  };

  // nếu là dynamic detail page -> fetch data
  //   if (route.type === 'detail' && route.params?.slug) {
  //     const data = await fetchDataForPage(route.params.slug);

  //     if (data) {
  //       metadata.title = data.title ?? metadata.title;
  //       metadata.description = data.summary ?? metadata.description;

  //       metadata.openGraph = {
  //         title: data.title,
  //         description: data.summary,
  //         images: data.images,
  //       };
  //     }
  //   }

  return metadata;
}
