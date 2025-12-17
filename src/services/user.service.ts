import { getAxiosClient } from '../lib/axios-client';
import type { AuthUser } from '@konlab/auth';

/**
 * Extended User type với các field bổ sung từ API
 */
export interface UserProfile extends AuthUser {
  id?: string;
  avatar?: string;
  phone?: string;
  position?: string;
  department?: string;
  address?: string;
  bio?: string;
  // Thêm các field khác nếu cần
}

/**
 * API Service để lấy thông tin user
 */
export class UserService {
  /**
   * Lấy thông tin user theo ID từ API
   */
  static async getUserById(userId: string): Promise<UserProfile> {
    const client = getAxiosClient();
    const response = await client.get<UserProfile>(`/v1/users/${userId}`);

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[UserService] getUserById:', response.data);
    }

    return response.data;
  }

  /**
   * Update thông tin user
   */
  static async updateUser(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const client = getAxiosClient();
    const response = await client.put<UserProfile>(`/v1/users/${userId}`, data);
    return response.data;
  }

  /**
   * Lấy thông tin user hiện tại (từ token)
   */
  static async getCurrentUser(): Promise<UserProfile> {
    const client = getAxiosClient();
    const response = await client.get<UserProfile>('/v1/users/me');
    return response.data;
  }
}
