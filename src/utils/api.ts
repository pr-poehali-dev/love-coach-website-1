// API Utilities - Production Ready
// Synchronized with backend API v2

import type { 
  APIResponse,
  APIError,
  LoginRequest,
  LoginResponse,
  VerifyTOTPRequest,
  VerifyTOTPResponse,
  MeResponse,
  LogoutResponse,
  PaymentSettingsResponse,
  PaymentSettingsUpdateRequest,
  TelegramSettingsResponse,
  TelegramSettingsUpdateRequest,
  TelegramTestRequest,
  TelegramTestResponse
} from '@/types/admin';

// ======================================
// Error Classes
// ======================================

export class APIError extends Error {
  public status: number;
  public data?: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

export class ValidationError extends APIError {
  public validationErrors: Record<string, string>;

  constructor(message: string, validationErrors: Record<string, string>) {
    super(422, message);
    this.name = 'ValidationError';
    this.validationErrors = validationErrors;
  }
}

// ======================================
// Base API Configuration
// ======================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v2';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// ======================================
// HTTP Client
// ======================================

class HTTPClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = { ...DEFAULT_HEADERS };
  }

  private async request<T = any>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      credentials: 'include', // Include cookies for authentication
    };

    try {
      const response = await fetch(url, config);
      
      // Handle different content types
      let data: any;
      const contentType = response.headers.get('Content-Type') || '';
      
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { success: false, message: await response.text() };
      }

      // Handle API errors
      if (!response.ok) {
        if (data && !data.success) {
          // Handle validation errors
          if (response.status === 422 && data.data?.validation_errors) {
            throw new ValidationError(data.message, data.data.validation_errors);
          }
          
          throw new APIError(response.status, data.message || 'Request failed', data.data);
        } else {
          throw new APIError(response.status, `HTTP ${response.status}: ${response.statusText}`);
        }
      }

      // Ensure response has expected structure
      if (typeof data !== 'object' || data.success === undefined) {
        throw new APIError(500, 'Invalid response format from server');
      }

      return data as APIResponse<T>;

    } catch (error) {
      // Re-throw API errors as-is
      if (error instanceof APIError || error instanceof ValidationError) {
        throw error;
      }

      // Handle network and other errors
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new APIError(0, 'Network error. Please check your internet connection.');
      }

      throw new APIError(500, error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }

  async get<T = any>(endpoint: string, headers?: Record<string, string>): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  async post<T = any>(
    endpoint: string, 
    body?: any, 
    headers?: Record<string, string>
  ): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      headers,
    });
  }

  async put<T = any>(
    endpoint: string, 
    body?: any, 
    headers?: Record<string, string>
  ): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      headers,
    });
  }

  async delete<T = any>(endpoint: string, headers?: Record<string, string>): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }
}

// ======================================
// API Client Instance
// ======================================

const httpClient = new HTTPClient();

// ======================================
// Admin API Functions
// ======================================

export const adminApi = {
  // Authentication endpoints
  auth: {
    async login(credentials: LoginRequest): Promise<LoginResponse['data']> {
      const response = await httpClient.post<LoginResponse['data']>('/auth/login', credentials);
      return response.data!;
    },

    async verifyTotp(request: VerifyTOTPRequest): Promise<VerifyTOTPResponse['data']> {
      const response = await httpClient.post<VerifyTOTPResponse['data']>('/auth/verify-totp', request);
      return response.data!;
    },

    async logout(): Promise<void> {
      await httpClient.post<LogoutResponse['data']>('/auth/logout');
    },

    async me(): Promise<MeResponse['data']> {
      const response = await httpClient.get<MeResponse['data']>('/auth/me');
      return response.data!;
    },
  },

  // Settings endpoints
  settings: {
    async getPayments(): Promise<PaymentSettingsResponse['data']> {
      const response = await httpClient.get<PaymentSettingsResponse['data']>('/settings/payments');
      return response.data!;
    },

    async updatePayments(data: PaymentSettingsUpdateRequest): Promise<PaymentSettingsResponse['data']> {
      const response = await httpClient.put<PaymentSettingsResponse['data']>('/settings/payments', data);
      return response.data!;
    },

    async getTelegram(): Promise<TelegramSettingsResponse['data']> {
      const response = await httpClient.get<TelegramSettingsResponse['data']>('/settings/telegram');
      return response.data!;
    },

    async updateTelegram(data: TelegramSettingsUpdateRequest): Promise<TelegramSettingsResponse['data']> {
      const response = await httpClient.put<TelegramSettingsResponse['data']>('/settings/telegram', data);
      return response.data!;
    },

    async testTelegram(): Promise<TelegramTestResponse['data']> {
      const request: TelegramTestRequest = { action: 'test_connection' };
      const response = await httpClient.post<TelegramTestResponse['data']>('/settings/telegram', request);
      return response.data!;
    },
  },
};

// ======================================
// Public API (for payment widgets)
// ======================================

const publicHttpClient = new HTTPClient('/api');

export const publicApi = {
  async getActivePayment(): Promise<any> {
    const response = await publicHttpClient.get<any>('/payments/active.php');
    return response.data;
  },
};

// ======================================
// Utility Functions
// ======================================

/**
 * Check if error is a validation error
 */
export function isValidationError(error: any): error is ValidationError {
  return error instanceof ValidationError;
}

/**
 * Check if error is an API error
 */
export function isAPIError(error: any): error is APIError {
  return error instanceof APIError;
}

/**
 * Extract validation errors from error
 */
export function getValidationErrors(error: any): Record<string, string> {
  if (isValidationError(error)) {
    return error.validationErrors;
  }
  return {};
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: any): string {
  if (isAPIError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}

/**
 * Handle common API errors
 */
export function handleAPIError(error: any, defaultMessage = 'Operation failed'): string {
  if (isAPIError(error)) {
    switch (error.status) {
      case 401:
        return 'Authentication required. Please log in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 422:
        return error.message || 'Validation failed. Please check your input.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
        return 'Server error. Please try again later.';
      case 0:
        return 'Network error. Please check your internet connection.';
      default:
        return error.message || defaultMessage;
    }
  }

  return getErrorMessage(error) || defaultMessage;
}

/**
 * Retry failed requests with exponential backoff
 */
export async function retryRequest<T>(
  requestFn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;

      // Don't retry client errors (4xx) except 429 (rate limiting)
      if (isAPIError(error) && error.status >= 400 && error.status < 500 && error.status !== 429) {
        throw error;
      }

      if (attempt === maxRetries) {
        break;
      }

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}