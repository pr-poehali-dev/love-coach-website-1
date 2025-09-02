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
      fetchJSON('/api/admin/auth/login.php', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }),

    verifyTotp: (mfa_token: string, code: string): Promise<TotpVerifyResponse> =>
      fetchJSON('/api/admin/auth/verify-totp.php', {
        method: 'POST',
        body: JSON.stringify({ mfa_token, code }),
      }),

    me: (): Promise<MeResponse> =>
      fetchJSON('/api/admin/auth/me.php'),

    logout: (): Promise<{ ok: boolean }> =>
      fetchJSON('/api/admin/auth/logout.php', { method: 'POST' }),
  },

  settings: {
    getPayments: (): Promise<PaymentsSettings> =>
      fetchJSON('/api/admin/settings/payments.php'),

    updatePayments: (settings: PaymentsSettings): Promise<{ ok: boolean }> =>
      fetchJSON('/api/admin/settings/payments.php', {
        method: 'PUT',
        body: JSON.stringify(settings),
      }),

    getTelegram: (): Promise<TelegramSettings> =>
      fetchJSON('/api/admin/settings/integrations/telegram.php'),

    updateTelegram: (settings: TelegramSettings): Promise<{ ok: boolean }> =>
      fetchJSON('/api/admin/settings/integrations/telegram.php', {
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
    fetchJSON('/api/admin/test-payment.php', {
      method: 'POST',
      body: JSON.stringify({ provider, amount, description, return_url }),
    }),

  testTelegram: (): Promise<{ ok: boolean }> =>
    fetchJSON('/api/admin/integrations/telegram/test.php', { method: 'POST' }),
};

export const publicApi = {
  getActivePayment: (): Promise<PublicActivePaymentResponse> =>
    fetchJSON('/api/public/payments/active.php'),

  getFeatures: (): Promise<{ contact_telegram_enabled: boolean }> =>
    fetchJSON('/api/public/features.php'),
};

export { ApiError };