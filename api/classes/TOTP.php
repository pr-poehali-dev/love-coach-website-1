<?php
/**
 * Time-based One-Time Password (TOTP) Implementation
 * RFC 6238 compliant TOTP generator and verifier
 */

class TOTP {
    private const TIME_STEP = 30; // 30 seconds
    private const DIGITS = 6;
    
    /**
     * Generate a TOTP secret (Base32 encoded)
     */
    public static function generateSecret(int $length = 20): string {
        $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        $secret = '';
        
        for ($i = 0; $i < $length; $i++) {
            $secret .= $chars[random_int(0, strlen($chars) - 1)];
        }
        
        return $secret;
    }
    
    /**
     * Generate TOTP code for current time
     */
    public static function generate(string $secret, ?int $timestamp = null): string {
        $timestamp = $timestamp ?? time();
        $timeCounter = intval($timestamp / self::TIME_STEP);
        
        return self::generateHOTP(self::base32Decode($secret), $timeCounter);
    }
    
    /**
     * Verify TOTP code (allows for time drift)
     */
    public static function verify(string $secret, string $code, int $window = 1): bool {
        $timestamp = time();
        $timeCounter = intval($timestamp / self::TIME_STEP);
        
        // Check current time and surrounding windows
        for ($i = -$window; $i <= $window; $i++) {
            $testCode = self::generateHOTP(self::base32Decode($secret), $timeCounter + $i);
            if (hash_equals($testCode, $code)) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Generate QR code URL for TOTP setup
     */
    public static function getQRCodeURL(string $secret, string $label, string $issuer = 'WorkTab Admin'): string {
        $params = [
            'secret' => $secret,
            'issuer' => $issuer,
            'algorithm' => 'SHA1',
            'digits' => self::DIGITS,
            'period' => self::TIME_STEP
        ];
        
        $queryString = http_build_query($params);
        $otpauthURL = "otpauth://totp/{$label}?{$queryString}";
        
        return "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" . urlencode($otpauthURL);
    }
    
    /**
     * Generate HOTP code
     */
    private static function generateHOTP(string $secret, int $counter): string {
        // Convert counter to binary
        $counterBinary = pack('N*', 0) . pack('N*', $counter);
        
        // Generate HMAC hash
        $hash = hash_hmac('sha1', $counterBinary, $secret, true);
        
        // Extract dynamic binary code
        $offset = ord($hash[19]) & 0xf;
        $code = (
            ((ord($hash[$offset]) & 0x7f) << 24) |
            ((ord($hash[$offset + 1]) & 0xff) << 16) |
            ((ord($hash[$offset + 2]) & 0xff) << 8) |
            (ord($hash[$offset + 3]) & 0xff)
        ) % pow(10, self::DIGITS);
        
        return str_pad($code, self::DIGITS, '0', STR_PAD_LEFT);
    }
    
    /**
     * Decode Base32 string
     */
    private static function base32Decode(string $data): string {
        $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        $data = strtoupper($data);
        $data = preg_replace('/[^A-Z2-7]/', '', $data);
        
        $binaryString = '';
        foreach (str_split($data) as $char) {
            $binaryString .= str_pad(decbin(strpos($alphabet, $char)), 5, '0', STR_PAD_LEFT);
        }
        
        $result = '';
        foreach (str_split($binaryString, 8) as $chunk) {
            if (strlen($chunk) === 8) {
                $result .= chr(bindec($chunk));
            }
        }
        
        return $result;
    }
    
    /**
     * Get remaining seconds until next TOTP code
     */
    public static function getRemainingSeconds(): int {
        return self::TIME_STEP - (time() % self::TIME_STEP);
    }
}