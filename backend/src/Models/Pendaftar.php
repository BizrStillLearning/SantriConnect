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
                      (nama_lengkap, alamat, nama_orang_tua, nomor_orang_tua, username, email, password, status_verifikasi) 
                      VALUES (:nama, :alamat, :ortu, :nomor, :user, :email, :pass, 'pending')";

            $stmt = $this->conn->prepare($query);

            // Hash password demi keamanan
            $hashedPassword = password_hash($data->password, PASSWORD_BCRYPT);

            $stmt->bindParam(":nama", $data->nama_lengkap);
            $stmt->bindParam(":alamat", $data->alamat);
            $stmt->bindParam(":ortu", $data->nama_orang_tua);
            $stmt->bindParam(":nomor", $data->nomor_orang_tua);
            $stmt->bindParam(":user", $data->username);
            $stmt->bindParam(":email", $data->email);
            $stmt->bindParam(":pass", $hashedPassword);

            return $stmt->execute();
        } catch (PDOException $e) {
            // Log error atau lempar exception
            return false;
        }
    }

    public function getAllPending() {
        $query = "SELECT * FROM " . $this->table . " WHERE status_verifikasi = 'pending' ORDER BY tanggal_daftar DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}