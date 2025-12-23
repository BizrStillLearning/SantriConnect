<?php
namespace App\Services;
use PDO;
use Exception;

class PSBService {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function verifikasiDanPindahkan($pendaftarId) {
        try {
            $this->conn->beginTransaction();

            // 1. Ambil data dari psb_pendaftar
            $stmt = $this->conn->prepare("SELECT * FROM psb_pendaftar WHERE id = ? AND status_verifikasi = 'pending'");
            $stmt->execute([$pendaftarId]);
            $p = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$p) throw new Exception("Data pendaftar tidak ditemukan atau sudah diverifikasi.");

            // 2. Insert ke tabel users
            $sqlUser = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')";
            $stmtUser = $this->conn->prepare($sqlUser);
            $stmtUser->execute([$p['username'], $p['email'], $p['password']]);
            $newUserId = $this->conn->lastInsertId();

            // 3. Insert ke tabel santri
            $sqlSantri = "INSERT INTO santri (user_id, nama_santri, nama_orang_tua, nomor_orang_tua, alamat) 
                          VALUES (?, ?, ?, ?, ?)";
            $stmtSantri = $this->conn->prepare($sqlSantri);
            $stmtSantri->execute([$newUserId, $p['nama_lengkap'], $p['nama_orang_tua'], $p['nomor_orang_tua'], $p['alamat']]);

            // 4. Update status di psb_pendaftar
            $stmtUpdate = $this->conn->prepare("UPDATE psb_pendaftar SET status_verifikasi = 'verified' WHERE id = ?");
            $stmtUpdate->execute([$pendaftarId]);

            $this->conn->commit();
            return true;
        } catch (Exception $e) {
            $this->conn->rollBack();
            return $e->getMessage();
        }
    }
}