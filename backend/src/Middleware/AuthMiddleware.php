<?php
namespace App\Middleware;
use App\Classes\JWTHandler;

class AuthMiddleware {
    public static function check() {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? '';

        if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $jwt = new JWTHandler();
            $decoded = $jwt->decode($matches[1]);
            if ($decoded) return $decoded;
        }

        http_response_code(401);
        echo json_encode(["message" => "Akses ditolak, token tidak valid"]);
        exit();
    }
}