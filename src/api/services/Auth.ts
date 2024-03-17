import apiClient from '@/api';
import type { AxiosResponse } from 'axios';
import type { LoginResponse, User } from '../models/Auth';

export class AuthService {
  static async login({ email, password }: User): Promise<AxiosResponse<LoginResponse>> {
    return await apiClient.post<LoginResponse>('/login', { email, password });
  }

  static async verifyToken(): Promise<AxiosResponse> {
    return await apiClient.post('/validate');
  }

  static async logout(): Promise<void> {
    return await apiClient.post('/');
  }
}
