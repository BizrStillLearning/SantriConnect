<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/Database.php';

$db = (new Database())->getConnection();

$query = "SELECT 
            j.id, 
            j.tanggal, 
            j.kelas, 
            j.materi, 
            m.nama_mapel, 
            u.username as nama_guru,
            SUM(CASE WHEN a.status = 'hadir' THEN 1 ELSE 0 END) as hadir,
            SUM(CASE WHEN a.status = 'izin' THEN 1 ELSE 0 END) as izin,
            SUM(CASE WHEN a.status = 'sakit' THEN 1 ELSE 0 END) as sakit,
            SUM(CASE WHEN a.status = 'alpha' THEN 1 ELSE 0 END) as alpha
          FROM jurnal j
          JOIN mapel m ON j.mapel_id = m.id
          JOIN users u ON j.guru_id = u.id
          LEFT JOIN absensi a ON j.id = a.jurnal_id
          GROUP BY j.id
          ORDER BY j.tanggal DESC";

try {
    $stmt = $db->prepare($query);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "data" => $data]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}