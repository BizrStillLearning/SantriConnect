<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once '../config/Database.php';
$db = (new Database())->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $db->prepare("SELECT * FROM santri ORDER BY nis ASC");
        $stmt->execute();
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
    }

    elseif ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"));

        // Update semua field termasuk Nama Orang Tua dan Kelas
        $query = "UPDATE santri SET 
                    nama_santri = :nama, 
                    nama_orang_tua = :ortu, 
                    nomor_orang_tua = :nomor, 
                    kelas = :kelas, 
                    alamat = :alamat 
                  WHERE id = :id";

        $stmt = $db->prepare($query);
        $stmt->execute([
            ":nama"  => $data->nama_santri,
            ":ortu"  => $data->nama_orang_tua,
            ":nomor" => $data->nomor_orang_tua,
            ":kelas" => $data->kelas,
            ":alamat" => $data->alamat,
            ":id"    => $data->id
        ]);

        echo json_encode(["status" => "success", "message" => "Data santri diperbarui"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}