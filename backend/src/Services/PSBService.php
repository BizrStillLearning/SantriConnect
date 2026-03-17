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

            // 1. Ambil data pendaftar & kunci baris (FOR UPDATE)
            $query = "SELECT * FROM psb_pendaftar WHERE id = ? AND status_verifikasi = 'pending' FOR UPDATE";
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$pendaftarId]);
            $p = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$p) {
                throw new Exception("Data tidak ditemukan atau sudah diverifikasi.");
            }

            // 2. GENERATE NIS OTOMATIS
            $tahunSekarang = date("Y");
            $queryCek = "SELECT COUNT(*) as total FROM santri WHERE nis LIKE ?";
            $stmtCek = $this->conn->prepare($queryCek);
            $stmtCek->execute([$tahunSekarang . '%']);
            $row = $stmtCek->fetch(PDO::FETCH_ASSOC);

            $urutan = $row['total'] + 1;
            $nisBaru = $tahunSekarang . str_pad($urutan, 3, "0", STR_PAD_LEFT);

            // 3. Insert ke tabel users
            $queryUser = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')";
            $stmtUser = $this->conn->prepare($queryUser);
            $stmtUser->execute([
                $p['username'],
                $p['email'],
                $p['password']
            ]);
            $newUserId = $this->conn->lastInsertId();

            // 4. Insert ke tabel santri
            $querySantri = "INSERT INTO santri (user_id, nis, nama_santri, nama_orang_tua, nomor_orang_tua, alamat, file_kk) 
                            VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmtSantri = $this->conn->prepare($querySantri);
            $stmtSantri->execute([
                $newUserId,
                $nisBaru,
                $p['nama_lengkap'],
                $p['nama_orang_tua'],
                $p['nomor_orang_tua'],
                $p['alamat'],
                $p['file_kk']
            ]);

            // 5. Update status pendaftar
            $queryUpdate = "UPDATE psb_pendaftar SET status_verifikasi = 'verified' WHERE id = ?";
            $stmtUpdate = $this->conn->prepare($queryUpdate);
            $stmtUpdate->execute([$pendaftarId]);

            $this->conn->commit();

            // Kembalikan data untuk keperluan notifikasi WA
            return [
                "status" => true,
                "nis" => $nisBaru,
                "data" => $p
            ];

        } catch (Exception $e) {
            if ($this->conn->inTransaction()) {
                $this->conn->rollBack();
            }
            return [
                "status" => false,
                "message" => $e->getMessage()
            ];
        }
    }

    public function tolakPendaftaran($pendaftarId, $alasan) {
        try {
            // 1. Ambil data pendaftar sebelum dihapus untuk kebutuhan WA
            $stmt = $this->conn->prepare("SELECT nama_lengkap, nomor_orang_tua FROM psb_pendaftar WHERE id = ?");
            $stmt->execute([$pendaftarId]);
            $p = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$p) {
                throw new Exception("Data pendaftar tidak ditemukan.");
            }

            // 2. Mulai transaksi untuk penghapusan
            $this->conn->beginTransaction();

            $del = $this->conn->prepare("DELETE FROM psb_pendaftar WHERE id = ?");
            $del->execute([$pendaftarId]);

            $this->conn->commit();

            // Kembalikan data untuk pengiriman WA di file API
            return [
                "status" => true,
                "data" => $p
            ];

        } catch (Exception $e) {
            if ($this->conn->inTransaction()) {
                $this->conn->rollBack();
            }
            return [
                "status" => false,
                "message" => $e->getMessage()
            ];
        }
    }
}