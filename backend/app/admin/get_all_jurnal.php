<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/Database.php';
$db = (new Database())->getConnection();

try {
    // Query Utama: Menghitung absensi per jurnal menggunakan GROUP BY
    $query = "SELECT 
                j.*, 
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

    $stmt = $db->prepare($query);
    $stmt->execute();
    $listJurnal = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Hitung Statistik Global untuk Dashboard
    $gHadir = 0; $gIzinSakit = 0; $gAlpha = 0; $totalAbsen = 0;

    foreach ($listJurnal as $row) {
        $gHadir += (int)$row['hadir'];
        $gIzinSakit += ((int)$row['izin'] + (int)$row['sakit']);
        $gAlpha += (int)$row['alpha'];
        $totalAbsen += ((int)$row['hadir'] + (int)$row['izin'] + (int)$row['sakit'] + (int)$row['alpha']);
    }

    // Hitung rata-rata kehadiran
    $rataKehadiran = ($totalAbsen > 0)
        ? round(($gHadir / $totalAbsen) * 100, 1) . "%"
        : "0%";

    echo json_encode([
        "status" => "success",
        "data" => $listJurnal,
        "stats" => [
            "total_pertemuan" => count($listJurnal),
            "rata_kehadiran" => $rataKehadiran,
            "total_izin_sakit" => $gIzinSakit,
            "total_alpha" => $gAlpha
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}