import type { 
  LoginResponse, 
  TotpVerifyResponse, 
  MeResponse, 
  PaymentsSettings, 
  TelegramSettings, 
  TestPaymentResponse,
  PublicActivePaymentResponse 
} from '@/types/admin';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchJSON(url: string, options: RequestInit = {}): Promise<any> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new ApiError(response.status, error || response.statusText);
  }

  return response.json();
}

export const adminApi = {
  auth: {
    login: (username: string, password: string): Promise<LoginResponse> =>
      fetchJSON('/api/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }),

    verifyTotp: (mfa_token: string, code: string): Promise<TotpVerifyResponse> =>
      fetchJSON('/api/admin/auth/totp/verify', {
        method: 'POST',
        body: JSON.stringify({ mfa_token, code }),
      }),

    me: (): Promise<MeResponse> =>
      fetchJSON('/api/admin/me'),

    logout: (): Promise<{ ok: boolean }> =>
      fetchJSON('/api/admin/auth/logout', { method: 'POST' }),
  },

  settings: {
    getPayments: (): Promise<PaymentsSettings> =>
      fetchJSON('/api/admin/settings/payments'),

    updatePayments: (settings: PaymentsSettings): Promise<{ ok: boolean }> =>
      fetchJSON('/api/admin/settings/payments', {
        method: 'PUT',
        body: JSON.stringify(settings),
      }),

    getTelegram: (): Promise<TelegramSettings> =>
      fetchJSON('/api/admin/settings/integrations/telegram'),

    updateTelegram: (settings: TelegramSettings): Promise<{ ok: boolean }> =>
      fetchJSON('/api/admin/settings/integrations/telegram', {
        method: 'PUT',
        body: JSON.stringify(settings),
      }),
  },

  testPayment: (
    provider: PaymentsSettings['active_provider'],
    amount: number,
    description?: string,
    return_url?: string
  ): Promise<TestPaymentResponse> =>
    fetchJSON('/api/admin/test-payment', {
      method: 'POST',
      body: JSON.stringify({ provider, amount, description, return_url }),
    }),

  testTelegram: (): Promise<{ ok: boolean }> =>
    fetchJSON('/api/admin/integrations/telegram/test', { method: 'POST' }),
};

export const publicApi = {
  getActivePayment: (): Promise<PublicActivePaymentResponse> =>
    fetchJSON('/api/public/payments/active'),

  getFeatures: (): Promise<{ contact_telegram_enabled: boolean }> =>
    fetchJSON('/api/public/features'),
};

export { ApiError };