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

// Сервис для работы с ЮКассой
export class YookassaService {
  private apiUrl: string;
  private useDirectApi: boolean;
  
  constructor() {
    this.apiUrl = '/api/yookassa'; // Наш бэкенд прокси
    this.useDirectApi = import.meta.env.VITE_YOOKASSA_TEST_MODE === 'true'; // Для тестирования
  }
  
  /**
   * Создать платеж (пока мокаем для тестирования)
   */
  async createPayment(data: CreatePaymentData): Promise<YookassaPayment> {
    if (this.useDirectApi) {
      // ⚠️ ТОЛЬКО для тестирования! Мокаем ответ ЮКассы
      return this.createMockPayment(data);
    }
    
    try {
      const response = await fetch(`${this.apiUrl}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Ошибка создания платежа`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Ошибка создания платежа:', error);
      throw error;
    }
  }
  
  /**
   * Мок для тестирования платежей (имитация ЮКассы)
   */
  private createMockPayment(data: CreatePaymentData): Promise<YookassaPayment> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockPayment: YookassaPayment = {
          id: `mock_${Date.now()}`,
          status: 'pending',
          paid: false,
          amount: data.amount,
          confirmation: {
            type: 'redirect',
            return_url: data.confirmation.return_url,
            confirmation_url: `https://yoomoney.ru/checkout/payments/v2/contract?orderId=mock_${Date.now()}`
          },
          created_at: new Date().toISOString(),
          description: data.description,
          metadata: data.metadata,
          refundable: false,
          test: true
        };
        
        console.log('🧪 Создан тестовый платеж:', mockPayment);
        resolve(mockPayment);
      }, 500); // Имитируем задержку сети
    });
  }
  
  /**
   * Получить информацию о платеже
   */
  async getPayment(paymentId: string): Promise<YookassaPayment> {
    if (this.useDirectApi && paymentId.startsWith('mock_')) {
      // Мокаем успешный платеж для тестирования
      return {
        id: paymentId,
        status: 'succeeded',
        paid: true,
        amount: { value: '100.00', currency: 'RUB' },
        created_at: new Date().toISOString(),
        refundable: true,
        test: true
      };
    }
    
    try {
      const response = await fetch(`${this.apiUrl}/payments/${paymentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
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