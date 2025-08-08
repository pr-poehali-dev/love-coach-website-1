/**
 * ЮКасса API интеграция
 * Безопасная работа с платежным API
 */

// Типы для работы с ЮКассой
export interface YookassaAmount {
  value: string;
  currency: 'RUB';
}

export interface YookassaPayment {
  id: string;
  status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled';
  paid: boolean;
  amount: YookassaAmount;
  confirmation?: {
    type: 'redirect';
    return_url: string;
    confirmation_url: string;
  };
  created_at: string;
  description?: string;
  metadata?: Record<string, string>;
  payment_method?: {
    type: string;
    id: string;
    saved: boolean;
  };
  recipient?: {
    account_id: string;
    gateway_id: string;
  };
  refundable: boolean;
  test: boolean;
}

export interface CreatePaymentData {
  amount: YookassaAmount;
  description?: string;
  confirmation: {
    type: 'redirect';
    return_url: string;
  };
  capture?: boolean;
  metadata?: Record<string, string>;
}

export interface YookassaError {
  type: string;
  id: string;
  code: string;
  description: string;
  parameter?: string;
}

// Конфигурация для работы с ЮКассой
export class YookassaConfig {
  private static readonly API_URL = 'https://api.yookassa.ru/v3';
  private static readonly TEST_API_URL = 'https://api.yookassa.ru/v3'; // В продакшене тот же URL
  
  static getApiUrl(): string {
    return this.API_URL;
  }
  
  static getAuthHeader(shopId: string, secretKey: string): string {
    const credentials = btoa(`${shopId}:${secretKey}`);
    return `Basic ${credentials}`;
  }
  
  static generateIdempotenceKey(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Сервис для работы с ЮКассой (только фронтенд часть)
export class YookassaService {
  private apiUrl: string;
  
  constructor() {
    this.apiUrl = '/api/yookassa'; // Наш бэкенд прокси
  }
  
  /**
   * Создать платеж через наш бэкенд
   */
  async createPayment(data: CreatePaymentData): Promise<YookassaPayment> {
    try {
      const response = await fetch(`${this.apiUrl}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка создания платежа');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Ошибка создания платежа:', error);
      throw error;
    }
  }
  
  /**
   * Получить информацию о платеже
   */
  async getPayment(paymentId: string): Promise<YookassaPayment> {
    try {
      const response = await fetch(`${this.apiUrl}/payments/${paymentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка получения информации о платеже');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Ошибка получения платежа:', error);
      throw error;
    }
  }
  
  /**
   * Подтвердить платеж
   */
  async capturePayment(paymentId: string, amount?: YookassaAmount): Promise<YookassaPayment> {
    try {
      const response = await fetch(`${this.apiUrl}/payments/${paymentId}/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка подтверждения платежа');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Ошибка подтверждения платежа:', error);
      throw error;
    }
  }
  
  /**
   * Отменить платеж
   */
  async cancelPayment(paymentId: string): Promise<YookassaPayment> {
    try {
      const response = await fetch(`${this.apiUrl}/payments/${paymentId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка отмены платежа');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Ошибка отмены платежа:', error);
      throw error;
    }
  }
  
  /**
   * Форматировать сумму для ЮКассы
   */
  static formatAmount(amount: number): YookassaAmount {
    return {
      value: amount.toFixed(2),
      currency: 'RUB'
    };
  }
  
  /**
   * Парсить сумму из ЮКассы
   */
  static parseAmount(amount: YookassaAmount): number {
    return parseFloat(amount.value);
  }
}

// Экземпляр сервиса
export const yookassa = new YookassaService();