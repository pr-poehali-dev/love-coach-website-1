<?php
/**
 * Simple JWT Implementation
 * Production ready JWT encoding/decoding
 */

class JWT {
    /**
     * Encode a JWT token
     */
    public static function encode(array $payload, string $key, string $algorithm = 'HS256'): string {
        $header = [
            'typ' => 'JWT',
            'alg' => $algorithm
        ];
        
        $headerEncoded = self::base64UrlEncode(json_encode($header));
        $payloadEncoded = self::base64UrlEncode(json_encode($payload));
        
        $signature = self::sign($headerEncoded . '.' . $payloadEncoded, $key, $algorithm);
        $signatureEncoded = self::base64UrlEncode($signature);
        
        return $headerEncoded . '.' . $payloadEncoded . '.' . $signatureEncoded;
    }
    
    /**
     * Decode a JWT token
     */
    public static function decode(string $jwt, string $key, array $algorithms = ['HS256']): object {
        $segments = explode('.', $jwt);
        
        if (count($segments) !== 3) {
            throw new Exception('Invalid JWT format');
        }
        
        list($headerEncoded, $payloadEncoded, $signatureEncoded) = $segments;
        
        $header = json_decode(self::base64UrlDecode($headerEncoded), true);
        if (!$header || !isset($header['alg']) || !in_array($header['alg'], $algorithms)) {
            throw new Exception('Invalid algorithm');
        }
        
        $payload = json_decode(self::base64UrlDecode($payloadEncoded), true);
        if (!$payload) {
            throw new Exception('Invalid payload');
        }
        
        // Verify signature
        $expectedSignature = self::sign($headerEncoded . '.' . $payloadEncoded, $key, $header['alg']);
        $providedSignature = self::base64UrlDecode($signatureEncoded);
        
        if (!hash_equals($expectedSignature, $providedSignature)) {
            throw new Exception('Invalid signature');
        }
        
        // Check expiration
        if (isset($payload['exp']) && time() >= $payload['exp']) {
            throw new Exception('Token has expired');
        }
        
        // Check not before
        if (isset($payload['nbf']) && time() < $payload['nbf']) {
            throw new Exception('Token not yet valid');
        }
        
        return (object)$payload;
    }
    
    /**
     * Create signature
     */
    private static function sign(string $data, string $key, string $algorithm): string {
        switch ($algorithm) {
            case 'HS256':
                return hash_hmac('sha256', $data, $key, true);
            case 'HS384':
                return hash_hmac('sha384', $data, $key, true);
            case 'HS512':
                return hash_hmac('sha512', $data, $key, true);
            default:
                throw new Exception('Unsupported algorithm');
        }
    }
    
    /**
     * Base64 URL encode
     */
    private static function base64UrlEncode(string $data): string {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
    
    /**
     * Base64 URL decode
     */
    private static function base64UrlDecode(string $data): string {
        return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
    }
}