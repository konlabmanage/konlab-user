import { resolveRoute } from '../../runtime/route-resolver';
import { ProfilePage } from '../../features/profile';

export default async function Page({ params }: { params: { all: string[] } }) {
  const route = await resolveRoute(params.all);

  if (!route) return null;

  switch (route.type) {
    case 'profile':
      return <ProfilePage />;
    default:
      return null;
  }
}
