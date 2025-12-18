import useSWR from 'swr';
import { useAuth } from '@konlab/auth';
import { UserService, type UserProfile } from '../services/user.service';
import { createSWRKey } from '../utils/swr-key';
import { isAxiosInitialized } from '../lib/axios-client';
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

  // Check axios ready để tránh fetch trước khi init
  const axiosReady = isAxiosInitialized();

  // Generate SWR key - check cả business và technical conditions
  // Endpoint /v1/profile không cần userId vì lấy từ token
  const swrKey = useMemo(() => {
    if (!authenticated || !axiosReady) {
      return null; // Skip fetch nếu chưa authenticated hoặc axios chưa ready
    }
    return createSWRKey('profile'); // Dùng /v1/profile endpoint
  }, [authenticated, axiosReady]);

  // SWR với optimized config
  const { data, error, isLoading, mutate, isValidating } = useSWR<UserProfile>(
    swrKey,
    () => UserService.getProfile(), // Gọi từ UserService
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
