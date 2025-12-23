<?php
namespace App\Classes;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTHandler {
    private $key = "KdnaAhAghBk2dT3s8/RBhj6TAMy5Oaj5y+2QLx0uzniBfpLqxMKI4k3tayezr7ySHtqdwdcfkv1/fk/yJ0zYJw==
"; // Ganti dengan secret key yang kuat
    private $alg = 'HS256';

    public function encode($data) {
        $payload = [
            "iss" => "localhost",
            "iat" => time(),
            "exp" => time() + (3600 * 24), // 24 Jam
            "data" => $data
        ];
        return JWT::encode($payload, $this->key, $this->alg);
    }

    public function decode($token) {
        try {
            $decoded = JWT::decode($token, new Key($this->key, $this->alg));
            return (array) $decoded->data;
        } catch (\Exception $e) {
            return null;
        }
    }
}