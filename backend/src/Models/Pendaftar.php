<?php
namespace App\Models;

use PDO;
use PDOException;

class Pendaftar {
    private $conn;
    private $table = "psb_pendaftar";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create($data) {
        try {
            $query = "INSERT INTO " . $this->table . " 
                      (nama_lengkap, alamat, nama_orang_tua, nomor_orang_tua, username, email, password, file_kk, bukti_pembayaran, status_verifikasi) 
                      VALUES (:nama, :alamat, :ortu, :nomor, :user, :email, :pass, :kk, :bukti, 'pending')";

            $stmt = $this->conn->prepare($query);

            // Hash password demi keamanan
            $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);

            // Gunakan bindValue untuk menghindari masalah referensi 'undefined'
            $stmt->bindValue(":nama", $data->nama_lengkap);
            $stmt->bindValue(":alamat", $data->alamat);
            $stmt->bindValue(":ortu", $data->nama_orang_tua);
            $stmt->bindValue(":nomor", $data->nomor_orang_tua);
            $stmt->bindValue(":user", $data->username);
            $stmt->bindValue(":email", $data->email);
            $stmt->bindValue(":pass", $hashedPassword);
            $stmt->bindValue(":kk", $data->file_kk);
            $stmt->bindValue(":bukti", $data->file_bukti_bayar);

            return $stmt->execute();
        } catch (PDOException $e) {
            error_log("Database Error pada Pendaftar::create : " . $e->getMessage());
            return false;
        }
    }

    public function getAllPending() {
        // Gunakan try-catch agar tidak crash jika tabel kosong/error
        try {
            $query = "SELECT * FROM " . $this->table . " WHERE status_verifikasi = 'pending' ORDER BY created_at DESC";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return [];
        }
    }
}