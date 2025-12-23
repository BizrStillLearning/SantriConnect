<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/Database.php';

$db = (new Database())->getConnection();

$query = "SELECT 
            s.id, 
            s.nama_santri, 
            s.kelas,
            COUNT(a.id) as total_pertemuan,
            SUM(CASE WHEN a.status = 'hadir' THEN 1 ELSE 0 END) as total_hadir,
            SUM(CASE WHEN a.status = 'izin' THEN 1 ELSE 0 END) as total_izin,
            SUM(CASE WHEN a.status = 'sakit' THEN 1 ELSE 0 END) as total_sakit,
            SUM(CASE WHEN a.status = 'alpha' THEN 1 ELSE 0 END) as total_alpha,
            ROUND((SUM(CASE WHEN a.status = 'hadir' THEN 1 ELSE 0 END) / COUNT(a.id)) * 100, 1) as persentase
          FROM santri s
          LEFT JOIN absensi a ON s.id = a.santri_id
          GROUP BY s.id
          ORDER BY s.kelas ASC, s.nama_santri ASC";

try {
    $stmt = $db->prepare($query);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "data" => $data]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}