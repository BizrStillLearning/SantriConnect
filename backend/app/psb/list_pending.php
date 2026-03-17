<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../../vendor/autoload.php';
require_once '../config/Database.php';
require_once '../../src/Models/Pendaftar.php';

use App\Models\Pendaftar;

$dbInstance = new Database();
$db = $dbInstance->getConnection();

if (!$db) {
    echo json_encode(["status" => "error", "message" => "Koneksi database gagal."]);
    exit;
}

$pendaftar = new Pendaftar($db);

$list = $pendaftar->getAllPending();

$baseUrl = "http://localhost/SantriConnect/backend/uploads/";

$dataFinal = array_map(function($item) use ($baseUrl) {
    $item['url_kk'] = $item['file_kk'] ? $baseUrl . "kk/" . $item['file_kk'] : null;
    $item['url_bukti'] = $item['bukti_pembayaran'] ? $baseUrl . "bukti_bayar/" . $item['bukti_pembayaran'] : null;
    return $item;
}, $list);

echo json_encode([
    "status" => "success",
    "data" => $dataFinal
]);