<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/Database.php';
$db = (new Database())->getConnection();

try {
    $query = "SELECT 
                s.id, 
                s.nama_santri, 
                s.kelas,
                SUM(CASE WHEN a.status = 'hadir' THEN 1 ELSE 0 END) as total_hadir,
                SUM(CASE WHEN a.status = 'izin' THEN 1 ELSE 0 END) as total_izin,
                SUM(CASE WHEN a.status = 'sakit' THEN 1 ELSE 0 END) as total_sakit,
                SUM(CASE WHEN a.status = 'alpha' THEN 1 ELSE 0 END) as total_alpha,
                COUNT(a.id) as total_pertemuan
              FROM santri s
              LEFT JOIN absensi a ON s.id = a.santri_id
              GROUP BY s.id
              ORDER BY s.nama_santri ASC";

    $stmt = $db->prepare($query);
    $stmt->execute();
    $raw = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $dataFinal = array_map(function($row) {
        $total = (int)$row['total_pertemuan'];
        $hadir = (int)$row['total_hadir'];
        $row['persentase'] = $total > 0 ? round(($hadir / $total) * 100) : 0;
        return $row;
    }, $raw);

    echo json_encode(["status" => "success", "data" => $dataFinal]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}