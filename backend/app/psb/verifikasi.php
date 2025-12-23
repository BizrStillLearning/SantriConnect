<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../config/Database.php';
require_once '../../src/Services/WhatsappService.php';

use App\Services\WhatsappService;

$db = (new Database())->getConnection();
$wa = new WhatsappService();
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    try {
        // Mulai Transaksi Database
        $db->beginTransaction();

        // 1. Ambil data pendaftar dengan LOCK agar tidak diproses double
        $query = "SELECT * FROM psb_pendaftar WHERE id = ? AND status_verifikasi = 'pending' FOR UPDATE";
        $stmt = $db->prepare($query);
        $stmt->execute([$data->id]);
        $pendaftar = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$pendaftar) {
            throw new Exception("Data tidak ditemukan atau sudah diverifikasi.");
        }

        // 2. Insert ke tabel users
        $queryUser = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')";
        $stmtUser = $db->prepare($queryUser);
        $stmtUser->execute([
            $pendaftar['username'],
            $pendaftar['email'],
            $pendaftar['password']
        ]);
        $newUserId = $db->lastInsertId();

        // 3. Insert ke tabel santri (Pastikan kolom-kolom ini ada di DB Anda)
        $querySantri = "INSERT INTO santri (user_id, nama_santri, nama_orang_tua, nomor_orang_tua, alamat) 
                        VALUES (?, ?, ?, ?, ?)";
        $stmtSantri = $db->prepare($querySantri);
        $stmtSantri->execute([
            $newUserId,
            $pendaftar['nama_lengkap'],
            $pendaftar['nama_orang_tua'],
            $pendaftar['nomor_orang_tua'],
            $pendaftar['alamat']
        ]);

        // 4. Update status pendaftar
        $queryUpdate = "UPDATE psb_pendaftar SET status_verifikasi = 'verified' WHERE id = ?";
        $stmtUpdate = $db->prepare($queryUpdate);
        $stmtUpdate->execute([$data->id]);

        // 5. SIMPAN SEMUA PERUBAHAN KE DATABASE (COMMIT)
        $db->commit();

        // 6. KIRIM WHATSAPP (Dilakukan setelah database sukses dicommit)
        $namaSantriUpper = strtoupper($pendaftar['nama_lengkap']);
        $pesan = "✅ *VERIFIKASI BERHASIL*\n\n" .
            "Pendaftaran Ananda *{$namaSantriUpper}* telah disetujui.\n\n" .
            "Sekarang Bapak/Ibu sudah bisa login ke Dashboard Santri dengan:\n" .
            "Username: *{$pendaftar['username']}*\n\n" .
            "Mohon segera melengkapi berkas di aplikasi.\n" .
            "Terima kasih.";

        // Kirim via Service
        $wa->kirimPesan($pendaftar['nomor_orang_tua'], $pesan);

        // 7. BERIKAN RESPON JSON FINAL
        echo json_encode([
            "status" => "success",
            "message" => "Santri berhasil diverifikasi dan notifikasi WA telah terkirim."
        ]);

    } catch (Exception $e) {
        // Jika ada error, batalkan semua perubahan database
        if ($db->inTransaction()) {
            $db->rollBack();
        }

        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "ID Pendaftar tidak ditemukan."]);
}