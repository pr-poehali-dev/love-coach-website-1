# 🔐 Безопасная интеграция с ЮКассой

## ⚠️ КРИТИЧЕСКИ ВАЖНО!

Текущая реализация НЕ БЕЗОПАСНА для продакшена! 
Секретные ключи ЮКассы видны в браузере.

## 🛡️ Правильная архитектура

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Браузер   │───▶│  Ваш сервер │───▶│   ЮКасса    │
│ (фронтенд)  │    │ (бэкенд)    │    │    API      │
└─────────────┘    └─────────────┘    └─────────────┘
     ❌ Нет           ✅ Ключи здесь      ✅ Безопасно
    ключей!
```

## 🚀 Как сделать правильно

### 1. Создать бэкенд-сервер

**Node.js пример:**
```javascript
// server.js
const express = require('express');
const axios = require('axios');
const app = express();

const YOOKASSA_SHOP_ID = process.env.YOOKASSA_SHOP_ID;
const YOOKASSA_SECRET_KEY = process.env.YOOKASSA_SECRET_KEY;

app.post('/api/create-payment', async (req, res) => {
  try {
    const payment = await axios.post('https://api.yookassa.ru/v3/payments', {
      amount: req.body.amount,
      currency: 'RUB',
      confirmation: {
        type: 'redirect',
        return_url: req.body.return_url
      }
    }, {
      auth: {
        username: YOOKASSA_SHOP_ID,
        password: YOOKASSA_SECRET_KEY
      }
    });
    
    res.json(payment.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 2. Переменные окружения на сервере

```bash
# .env файл на сервере
YOOKASSA_SHOP_ID=123456
YOOKASSA_SECRET_KEY=live_abcd1234efgh5678
```

### 3. Изменить фронтенд

```typescript
// Вместо прямого вызова ЮКассы
const createPayment = async (amount: number) => {
  // Вызываем СВОЙ сервер
  const response = await fetch('/api/create-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, return_url: window.location.origin })
  });
  
  return response.json();
};
```

## 🧪 Для тестирования

Можно использовать текущую версию ТОЛЬКО с тестовыми ключами:
- Включить "Тестовый режим" 
- Использовать тестовые данные из документации ЮКассы
- Реальные деньги списываться НЕ БУДУТ

## 📋 План действий

1. **Сейчас:** Тестируй с тестовыми ключами
2. **Создай бэкенд:** Node.js / Python / PHP сервер
3. **Перенеси ключи:** В переменные окружения на сервере
4. **Обнови фронтенд:** Вызывай свой API вместо ЮКассы напрямую