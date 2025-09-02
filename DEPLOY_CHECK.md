# Проверка развертывания API

## Проблема
Приложение получает 404 ошибки при обращении к API endpoints:
- `GET https://workstab.com/api/v2/auth/me 404 (Not Found)`
- `POST https://workstab.com/api/v2/auth/login 404 (Not Found)`

## Решение

### 1. Проверить структуру файлов на сервере

На сервере `workstab.com` должна быть следующая структура:

```
/
├── index.html (ваш билд)
├── assets/ (JS/CSS файлы)
└── api/
    └── v2/
        └── auth/
            ├── login.php
            ├── me.php
            ├── logout.php
            └── verify-totp.php
    ├── classes/
    │   ├── Auth.php
    │   ├── BaseAPI.php
    │   └── JWT.php
    └── config/
        ├── database.php
        └── security.php
```

### 2. Проверить API endpoint'ы

Откройте в браузере:
- `https://workstab.com/api/debug.php` - должен вернуть JSON
- `https://workstab.com/api/v2/auth/me` - должен вернуть ошибку авторизации (не 404)

### 3. Проверить права доступа

Убедитесь, что:
- PHP файлы имеют права на выполнение
- Веб-сервер может читать файлы в папке `api/`

### 4. Альтернативное решение

Если структура сервера отличается, обновите `VITE_API_BASE_URL` в `.env.production`:

```bash
# Если API находится в корне
VITE_API_BASE_URL=/auth

# Если API в поддиректории
VITE_API_BASE_URL=./backend/api/v2

# Если API на другом домене  
VITE_API_BASE_URL=https://api.workstab.com/v2
```

## Текущие настройки

Приложение настроено на использование:
- Development: `/api/v2` 
- Production: `./api/v2` (относительный путь)
- workstab.com: `./api/v2` (автоматическое определение)

## Следующие шаги

1. Загрузите папку `api/` на сервер `workstab.com`
2. Убедитесь в правильной структуре папок
3. Проверьте endpoint `api/debug.php`
4. Пересоберите приложение: `npm run build`
5. Загрузите новый билд на сервер