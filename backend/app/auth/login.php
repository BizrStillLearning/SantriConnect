<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../../vendor/autoload.php';
require_once '../config/Database.php';
require_once '../../src/Models/User.php';
require_once '../../src/Classes/JWTHandler.php';

use App\Models\User;
use App\Classes\JWTHandler;

$db = (new Database())->getConnection();
$userModel = new User($db);
$jwt = new JWTHandler();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->identifier) && !empty($data->password)) {
    $authUser = $userModel->authenticate($data->identifier, $data->password);

    if ($authUser) {
        $profile = $userModel->getProfile();
        $payload = [
            "id" => $authUser['id'],
            "username" => $authUser['username'],
            "role" => $authUser['role'],
            "nama" => $profile['nama']
        ];

        echo json_encode([
            "status" => "success",
            "token" => $jwt->encode($payload),
            "user" => $payload
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Username atau Password salah"]);
    }
}