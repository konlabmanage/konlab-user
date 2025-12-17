import useSWR from 'swr';
import { useAuth } from '@konlab/auth';
import { type UserProfile } from '../services/user.service';
import { createSWRKey } from '../utils/swr-key';
import { fetcher } from '../lib/fetcher';
import { useMemo } from 'react';

/**
 * Merge user data từ token và API
 */
function mergeUserData(
  tokenUser: UserProfile | null,
  apiData: UserProfile | undefined,
): UserProfile | null {
  if (!tokenUser) return null;

  if (!apiData) return tokenUser;

  // API data overrides token data
  return {
    ...tokenUser,
    ...apiData,
  };
}

/**
 * Custom hook để lấy thông tin user từ API với SWR
 * Best practice: Chỉ check business logic, không check technical details
 */
export function useUserInfo() {
  const { user: tokenUser, authenticated } = useAuth();
  const userId = tokenUser?.sub;

  // Generate SWR key - chỉ check business conditions
  // Axios tự động handle token, không cần check thủ công
  const swrKey = useMemo(() => {
    if (!authenticated || !userId) {
      return null; // Skip fetch nếu chưa authenticated hoặc không có userId
    }
    return createSWRKey('users', userId);
  }, [authenticated, userId]);

  // SWR với optimized config
  const { data, error, isLoading, mutate, isValidating } = useSWR<UserProfile>(
    swrKey,
    fetcher, // Dùng generic fetcher
    {
      // Performance
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 10000, // 10s - increased from 5s
      keepPreviousData: true, // Better UX khi refetch

      // Error handling
      shouldRetryOnError: false,
      onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
        // Không retry với 404 hoặc 401
        if (error?.response?.status === 404 || error?.response?.status === 401) {
          return;
        }
        // Max 3 retries
        if (retryCount >= 3) return;
        // Retry sau 3s
        setTimeout(() => revalidate({ retryCount }), 3000);
      },

      onError: (err) => {
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[useUserInfo] Failed to fetch user info:', err);
        }
      },
    },
  );

  // Merge data
  const userProfile = useMemo(() => mergeUserData(tokenUser, data), [tokenUser, data]);

  return {
    user: userProfile,
    loading: isLoading,
    validating: isValidating,
    error,
    // Refetch manually
    refetch: mutate,
  };
}
