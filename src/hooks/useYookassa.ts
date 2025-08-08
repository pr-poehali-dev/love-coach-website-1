import { useState, useCallback, useEffect } from 'react';
import { yookassa, YookassaPayment, CreatePaymentData } from '@/lib/yookassa';
import { secureStorage, YookassaCredentials } from '@/lib/secure-storage';

export function useYookassaCredentials() {
  const [credentials, setCredentials] = useState<YookassaCredentials | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCredentials = () => {
      try {
        const creds = secureStorage.getCredentials();
        setCredentials(creds);
      } catch (error) {
        console.error('Ошибка загрузки учетных данных:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCredentials();
  }, []);
  
  const saveCredentials = useCallback((newCredentials: YookassaCredentials) => {
    try {
      if (!secureStorage.validateCredentials(newCredentials)) {
        throw new Error('Неверный формат учетных данных');
      }
      
      secureStorage.saveCredentials(newCredentials);
      setCredentials(newCredentials);
      return true;
    } catch (error) {
      console.error('Ошибка сохранения учетных данных:', error);
      return false;
    }
  }, []);
  
  const removeCredentials = useCallback(() => {
    try {
      secureStorage.removeCredentials();
      setCredentials(null);
      return true;
    } catch (error) {
      console.error('Ошибка удаления учетных данных:', error);
      return false;
    }
  }, []);
  
  return {
    credentials,
    loading,
    hasCredentials: !!credentials,
    saveCredentials,
    removeCredentials
  };
}

export function useYookassaPayment() {
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState<YookassaPayment | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const createPayment = useCallback(async (data: CreatePaymentData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await yookassa.createPayment(data);
      setPayment(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  const getPayment = useCallback(async (paymentId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await yookassa.getPayment(paymentId);
      setPayment(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  const capturePayment = useCallback(async (paymentId: string, amount?: { value: string; currency: 'RUB' }) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await yookassa.capturePayment(paymentId, amount);
      setPayment(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  const cancelPayment = useCallback(async (paymentId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await yookassa.cancelPayment(paymentId);
      setPayment(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  
  return {
    loading,
    payment,
    error,
    createPayment,
    getPayment,
    capturePayment,
    cancelPayment,
    clearError
  };
}