import { resolveMetadata } from '../../runtime/metadata-resolver';

export async function generateMetadata({ params }: { params: { all: string[] } }) {
  return resolveMetadata(params.all);
}
