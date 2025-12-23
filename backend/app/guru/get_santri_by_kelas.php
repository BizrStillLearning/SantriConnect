<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/Database.php';

$db = (new Database())->getConnection();
$kelas = isset($_GET['kelas']) ? $_GET['kelas'] : '';

if (!empty($kelas)) {
    // Ambil santri berdasarkan kelas yang dipilih
    $query = "SELECT id, nama_santri FROM santri WHERE kelas = ? ORDER BY nama_santri ASC";
    $stmt = $db->prepare($query);
    $stmt->execute([$kelas]);
    $santri = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "data" => $santri]);
} else {
    echo json_encode(["status" => "error", "message" => "Kelas harus dipilih"]);
}