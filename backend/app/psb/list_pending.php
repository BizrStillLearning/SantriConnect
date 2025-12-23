<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once '../../vendor/autoload.php';
require_once '../config/Database.php';
require_once '../../src/Models/Pendaftar.php';

use App\Models\Pendaftar;

$db = (new Database())->getConnection();
$pendaftar = new Pendaftar($db);

$list = $pendaftar->getAllPending();

echo json_encode([
    "status" => "success",
    "data" => $list
]);