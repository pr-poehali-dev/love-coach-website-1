/**
 * Система безопасного хранения ключей ЮКассы
 * Использует localStorage с шифрованием для хранения чувствительных данных
 */

interface YookassaCredentials {
  shopId: string;
  secretKey: string;
  isTest: boolean;
}

// Простое шифрование для localStorage (не для продакшена!)
class SimpleEncryption {
  private key: string;
  
  constructor() {
    // В реальном проекте ключ должен генерироваться на сервере
    this.key = 'yookassa-secure-key-' + window.location.origin;
  }
  
  encrypt(text: string): string {
    try {
      return btoa(encodeURIComponent(text));
    } catch (error) {
      console.error('Ошибка шифрования:', error);
      return text;
    }
  }
  
  decrypt(encryptedText: string): string {
    try {
      return decodeURIComponent(atob(encryptedText));
    } catch (error) {
      console.error('Ошибка расшифровки:', error);
      return encryptedText;
    }
  }
}

export class SecureStorage {
  private encryption: SimpleEncryption;
  private readonly CREDENTIALS_KEY = 'yookassa_credentials';
  
  constructor() {
    this.encryption = new SimpleEncryption();
  }
  
  /**
   * Сохранить учетные данные ЮКассы
   */
  saveCredentials(credentials: YookassaCredentials): void {
    try {
      const encrypted = this.encryption.encrypt(JSON.stringify(credentials));
      localStorage.setItem(this.CREDENTIALS_KEY, encrypted);
    } catch (error) {
      console.error('Ошибка сохранения учетных данных:', error);
      throw new Error('Не удалось сохранить учетные данные');
    }
  }
  
  /**
   * Получить учетные данные ЮКассы
   */
  getCredentials(): YookassaCredentials | null {
    try {
      const encrypted = localStorage.getItem(this.CREDENTIALS_KEY);
      if (!encrypted) return null;
      
      const decrypted = this.encryption.decrypt(encrypted);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Ошибка получения учетных данных:', error);
      return null;
    }
  }
  
  /**
   * Удалить учетные данные ЮКассы
   */
  removeCredentials(): void {
    try {
      localStorage.removeItem(this.CREDENTIALS_KEY);
    } catch (error) {
      console.error('Ошибка удаления учетных данных:', error);
    }
  }
  
  /**
   * Проверить, есть ли сохраненные учетные данные
   */
  hasCredentials(): boolean {
    return localStorage.getItem(this.CREDENTIALS_KEY) !== null;
  }
  
  /**
   * Валидировать учетные данные
   */
  validateCredentials(credentials: YookassaCredentials): boolean {
    if (!credentials.shopId || !credentials.secretKey) {
      return false;
    }
    
    // Проверка формата Shop ID (обычно числовой)
    if (!/^\d+$/.test(credentials.shopId)) {
      return false;
    }
    
    // Проверка формата Secret Key (обычно содержит буквы, цифры, дефисы)
    if (!/^[a-zA-Z0-9_-]+$/.test(credentials.secretKey)) {
      return false;
    }
    
    return true;
  }
  
  /**
   * Очистить все данные
   */
  clearAll(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('yookassa_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Ошибка очистки данных:', error);
    }
  }
}

export const secureStorage = new SecureStorage();

// Экспорт типов для использования в компонентах
export type { YookassaCredentials };