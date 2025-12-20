
import {
  ApiResponse,
  UserIdentificationResponse,
  AuthResponse,
  IdentifyRequest,
  AuthenticateRequest,
  User,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '@buildora/shared';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const API_BASE = `${API_BASE_URL}/api/auth`;

export class AuthService {
  private static setToken(token: string) {
    localStorage.setItem('buildora_token', token);
  }

  static getToken(): string | null {
    return localStorage.getItem('buildora_token');
  }

  static clearToken() {
    localStorage.removeItem('buildora_token');
  }

  static async identify(email: string): Promise<ApiResponse<UserIdentificationResponse>> {
    try {
      const payload: IdentifyRequest = { email };
      const response = await fetch(`${API_BASE}/identify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await response.json();
    } catch (e) {
      return { success: false, error: "Failed to reach Buildora servers." };
    }
  }

  static async authenticate(payload: AuthenticateRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await fetch(`${API_BASE}/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result: ApiResponse<AuthResponse> = await response.json();
      
      if (result.success && result.data?.token) {
        this.setToken(result.data.token);
      }
      
      return result;
    } catch (e) {
      return { success: false, error: "Authentication system offline." };
    }
  }

  static async getMe(): Promise<ApiResponse<User>> {
    const token = this.getToken();
    if (!token) return { success: false, error: "No active session." };

    try {
      const response = await fetch(`${API_BASE}/me`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return await response.json();
    } catch (e) {
      return { success: false, error: "Identity verification failed." };
    }
  }

  static async forgotPassword(payload: ForgotPasswordRequest): Promise<ApiResponse<{ delivered: boolean }>> {
    try {
      const response = await fetch(`${API_BASE}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await response.json();
    } catch (e) {
      return { success: false, error: "Password reset email failed." };
    }
  }

  static async resetPassword(payload: ResetPasswordRequest): Promise<ApiResponse<{ updated: boolean }>> {
    try {
      const response = await fetch(`${API_BASE}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await response.json();
    } catch (e) {
      return { success: false, error: "Password reset failed." };
    }
  }

  static signOut() {
    this.clearToken();
    window.location.reload();
  }
}
