// Admin Panel Types - Production Ready
// Synchronized with backend API v2

// ======================================
// API Response Types
// ======================================

export interface APIResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface APIError {
  success: false;
  message: string;
  data?: {
    validation_errors?: Record<string, string>;
    error_code?: string;
  };
}

// ======================================
// Authentication Types
// ======================================

export interface User {
  id: number;
  username: string;
  email: string;
  last_login_at?: string;
  session_expires_at?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: true;
  message: string;
  data: {
    token: string;
    user: User;
  } | {
    mfa_required: true;
    mfa_token: string;
    message: string;
  };
}

export interface VerifyTOTPRequest {
  mfa_token: string;
  totp_code: string;
}

export interface VerifyTOTPResponse {
  success: true;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface MeResponse {
  success: true;
  message: string;
  data: {
    user: User;
  };
}

export interface LogoutResponse {
  success: true;
  message: string;
}

// ======================================
// Payment Settings Types
// ======================================

export interface YooKassaSettings {
  enabled: boolean;
  shop_id: string;
  secret_key: string;
  base_return_url: string;
  capture: boolean;
}

export interface RobokassaSettings {
  enabled: boolean;
  merchant_login: string;
  password1: string;
  password2: string;
  test_mode: boolean;
  culture: 'ru' | 'en';
  success_url: string;
  fail_url: string;
}

export interface CloudPaymentsSettings {
  enabled: boolean;
  public_id: string;
  api_secret: string;
  success_url: string;
  fail_url: string;
}

export interface AlfaBankSettings {
  enabled: boolean;
  token: string;
  gateway: 'test' | 'payment';
  stages: 1 | 2;
  language: string;
  return_url: string;
  fail_url: string;
  amount_format: 'rubli' | 'kopeyki';
}

export interface PaymentSettings {
  active_provider: 'yookassa' | 'robokassa' | 'cloudpayments' | 'alfabank';
  providers: {
    yookassa: YooKassaSettings;
    robokassa: RobokassaSettings;
    cloudpayments: CloudPaymentsSettings;
    alfabank: AlfaBankSettings;
  };
}

export interface PaymentSettingsResponse {
  success: true;
  message: string;
  data: PaymentSettings;
}

export interface PaymentSettingsUpdateRequest {
  active_provider?: 'yookassa' | 'robokassa' | 'cloudpayments' | 'alfabank';
  providers?: Partial<PaymentSettings['providers']>;
}

// ======================================
// Telegram Settings Types
// ======================================

export interface TelegramSettings {
  enabled: boolean;
  bot_token: string;
  chat_id: string;
  notify_on_payment: boolean;
  notify_on_contact: boolean;
}

export interface TelegramSettingsResponse {
  success: true;
  message: string;
  data: TelegramSettings;
}

export interface TelegramSettingsUpdateRequest {
  enabled?: boolean;
  bot_token?: string;
  chat_id?: string;
  notify_on_payment?: boolean;
  notify_on_contact?: boolean;
}

export interface TelegramTestRequest {
  action: 'test_connection';
}

export interface TelegramTestResponse {
  success: true;
  message: string;
  data: {
    success: boolean;
    message?: string;
    error?: string;
  };
}

// ======================================
// Utility Types
// ======================================

export type Provider = 'yookassa' | 'robokassa' | 'cloudpayments' | 'alfabank';

export interface ValidationErrors {
  [field: string]: string;
}

export interface PublicActivePaymentResponse {
  provider: Provider;
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
}

export interface ActivityLog {
  id: number;
  user_id?: number;
  action: string;
  resource?: string;
  resource_id?: string;
  details?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// ======================================
// Frontend State Types
// ======================================

export interface AdminAuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export interface AdminSettingsState {
  payments: PaymentSettings | null;
  telegram: TelegramSettings | null;
  loading: boolean;
  saving: boolean;
  testing: string | null;
  error: string | null;
  success: string | null;
}

// ======================================
// Hook Return Types
// ======================================

export interface UseAdminAuthReturn extends AdminAuthState {
  login: (username: string, password: string) => Promise<{ mfa_required?: boolean; mfa_token?: string }>;
  verifyTotp: (mfa_token: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export interface UseAdminSettingsReturn {
  settings: AdminSettingsState;
  loadPaymentSettings: () => Promise<void>;
  updatePaymentSettings: (data: PaymentSettingsUpdateRequest) => Promise<void>;
  loadTelegramSettings: () => Promise<void>;
  updateTelegramSettings: (data: TelegramSettingsUpdateRequest) => Promise<void>;
  testTelegramConnection: () => Promise<void>;
  setActiveProvider: (provider: Provider) => Promise<void>;
  updateProvider: (provider: Provider, field: string, value: any) => Promise<void>;
  clearMessages: () => void;
}

// ======================================
// Component Props Types
// ======================================

export interface ProviderConfigProps {
  settings: YooKassaSettings | RobokassaSettings | CloudPaymentsSettings | AlfaBankSettings;
  isActive: boolean;
  testing: boolean;
  onUpdate: (field: string, value: any) => void;
  onSetActive: () => void;
  onTest: () => void;
}

export interface StatusMessagesProps {
  error: string | null;
  success: string | null;
  onClear?: () => void;
}

export interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}