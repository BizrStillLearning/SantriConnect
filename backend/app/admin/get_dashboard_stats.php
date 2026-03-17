<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/Database.php';
$db = (new Database())->getConnection();

try {
    // 1. Total Santri
    $stmtSantri = $db->query("SELECT COUNT(*) as total FROM santri");
    $totalSantri = $stmtSantri->fetch(PDO::FETCH_ASSOC)['total'];

    // 2. Hadir Hari Ini
    $today = date('Y-m-d');
    $stmtHadir = $db->prepare("SELECT COUNT(*) as total FROM absensi a 
                               JOIN jurnal j ON a.jurnal_id = j.id 
                               WHERE j.tanggal = ? AND a.status = 'hadir'");
    $stmtHadir->execute([$today]);
    $hadirHariIni = $stmtHadir->fetch(PDO::FETCH_ASSOC)['total'];

    // 3. Jurnal Hari Ini
    $stmtJurnal = $db->prepare("SELECT COUNT(*) as total FROM jurnal WHERE tanggal = ?");
    $stmtJurnal->execute([$today]);
    $totalJurnal = $stmtJurnal->fetch(PDO::FETCH_ASSOC)['total'];

    // 4. Aktivitas Terbaru (Menggunakan username dari tabel users)
    $stmtActivity = $db->query("SELECT j.materi, j.kelas, j.created_at, u.username 
                                FROM jurnal j 
                                JOIN users u ON j.guru_id = u.id 
                                ORDER BY j.created_at DESC LIMIT 5");
    $activities = $stmtActivity->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "stats" => [
            "total_santri" => number_format($totalSantri),
            "hadir_hari_ini" => number_format($hadirHariIni),
            "jurnal_hari_ini" => number_format($totalJurnal)
        ],
        "activities" => $activities
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}