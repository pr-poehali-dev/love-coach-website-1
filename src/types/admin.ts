export type LoginResponse =
  | { token: string }
  | { mfa_required: true; mfa_token: string };

export type TotpVerifyResponse = { token: string };

export type MeResponse = { username: string; roles: string[] };

export type PaymentsSettings = {
  active_provider: 'yookassa' | 'robokassa' | 'cloudpayments' | 'alfabank';
  providers: {
    yookassa: {
      enabled: boolean;
      shop_id: string;
      secret_key: string;
      base_return_url: string;
      capture: boolean;
    };
    robokassa: {
      enabled: boolean;
      merchant_login: string;
      password1: string;
      password2: string;
      test_mode: boolean;
      culture: 'ru' | 'en';
      success_url: string;
      fail_url: string;
    };
    cloudpayments: {
      enabled: boolean;
      public_id: string;
      api_secret: string;
      success_url: string;
      fail_url: string;
    };
    alfabank: {
      enabled: boolean;
      token: string;
      gateway: 'test' | 'payment';
      stages: 1 | 2;
      language: string;
      return_url: string;
      fail_url: string;
      amount_format: 'rubli' | 'kopeyki';
    };
  };
};

export type TelegramSettings = {
  enabled: boolean;
  bot_token: string;
  chat_id: string;
  notify_on_payment: boolean;
  notify_on_contact: boolean;
};

export type TestPaymentResponse = {
  ok: boolean;
  payment_debug_url?: string;
  widget_params?: Record<string, any>;
};

export type PublicActivePaymentResponse = {
  provider: 'yookassa' | 'robokassa' | 'cloudpayments' | 'alfabank';
  yookassa?: {};
  alfabank?: {
    token: string;
    gateway: 'test' | 'payment';
    stages: 1 | 2;
    language: string;
    return_url: string;
    fail_url: string;
    amount_format: 'rubli' | 'kopeyki';
  };
  robokassa?: {};
  cloudpayments?: { 
    public_id: string; 
    success_url: string; 
    fail_url: string; 
  };
};