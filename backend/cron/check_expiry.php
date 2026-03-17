<?php
require_once 'app/config/Database.php';
require_once 'src/Services/WhatsappService.php';

use App\Services\WhatsappService;

$db = (new Database())->getConnection();
$wa = new WhatsappService();

try {
    $qWarn = "SELECT * FROM psb_pendaftar 
              WHERE status_verifikasi = 'pending' 
              AND created_at <= DATE_SUB(NOW(), INTERVAL 48 HOUR)
              AND created_at > DATE_SUB(NOW(), INTERVAL 49 HOUR)";

    $stmtWarn = $db->prepare($qWarn);
    $stmtWarn->execute();
    $pendaftarWarn = $stmtWarn->fetchAll(PDO::FETCH_ASSOC);

    foreach ($pendaftarWarn as $p) {
        $pesan = "⚠️ *PERINGATAN PENDAFTARAN*\n\n" .
            "Assalamu'alaikum, masa pendaftaran Ananda *{$p['nama_lengkap']}* akan segera berakhir dalam 24 jam.\n\n" .
            "Mohon segera lakukan verifikasi/pembayaran agar data tidak terhapus otomatis dari sistem kami.\n\n" .
            "Terima kasih.";
        $wa->kirimPesan($p['nomor_orang_tua'], $pesan);
    }

    $qDelete = "DELETE FROM psb_pendaftar 
                WHERE status_verifikasi = 'pending' 
                AND created_at <= DATE_SUB(NOW(), INTERVAL 72 HOUR)";

    $stmtDelete = $db->prepare($qDelete);
    $stmtDelete->execute();
    $deletedCount = $stmtDelete->rowCount();

    if ($deletedCount > 0) {
        error_log("Cron Job: Berhasil menghapus $deletedCount data pendaftar expire.");
    }

} catch (Exception $e) {
    error_log("Cron Job Error: " . $e->getMessage());
}