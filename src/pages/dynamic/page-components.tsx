/**
 * Maps route types to their corresponding page components
 */
import { ProfilePage } from '../../features/profile';

export const pageComponents: Record<string, React.ComponentType> = {
  profile: ProfilePage,
  profile2: ProfilePage, // Alias for profile
};
