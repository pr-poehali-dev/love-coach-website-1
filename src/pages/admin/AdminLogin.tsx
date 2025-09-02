import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { APIError } from '@/utils/api';
import Icon from '@/components/ui/icon';

const AdminLogin: React.FC = () => {
  const { isAuthenticated, login, verifyTotp } = useAdminAuth();
  const location = useLocation();
  
  const [step, setStep] = useState<'login' | 'totp'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [mfaToken, setMfaToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/admin';
    return <Navigate to={from} replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(username, password);
      
      if (result.mfa_required && result.mfa_token) {
        setMfaToken(result.mfa_token);
        setStep('totp');
      }
    } catch (error) {
      if (error instanceof APIError) {
        setError('Неверный логин или пароль');
      } else {
        setError('Ошибка соединения');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTotp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verifyTotp(mfaToken, code);
    } catch (error) {
      if (error instanceof APIError) {
        setError('Неверный код');
      } else {
        setError('Ошибка соединения');
      }
    } finally {
      setLoading(false);
    }
  };

  const resetToLogin = () => {
    setStep('login');
    setCode('');
    setMfaToken('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {step === 'login' ? 'Вход в админку' : 'Двухфакторная авторизация'}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {step === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Логин"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading || !username || !password}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Вход...
                  </div>
                ) : (
                  'Войти'
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-center text-sm text-gray-600 mb-4">
                <Icon name="Shield" size={32} className="mx-auto mb-2 text-blue-600" />
                Введите 6-значный код из приложения аутентификатора
              </div>

              <form onSubmit={handleTotp} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setCode(value);
                    }}
                    disabled={loading}
                    maxLength={6}
                    className="text-center text-xl tracking-widest"
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm text-center">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading || code.length !== 6}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Проверяем...
                      </div>
                    ) : (
                      'Подтвердить'
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={resetToLogin}
                    disabled={loading}
                  >
                    Назад к логину
                  </Button>
                </div>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;