<?php
namespace App\Models;
use PDO;

class User {
    private $conn;
    public $id;
    public $role;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function authenticate($identifier, $password) {
        $query = "SELECT * FROM users WHERE username = :id OR email = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute(['id' => $identifier]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $this->id = $user['id'];
            $this->role = $user['role'];
            return $user;
        }
        return false;
    }

    public function getProfile() {
        if ($this->role === 'guru') {
            $sql = "SELECT nama_guru as nama, nip FROM guru WHERE user_id = ?";
        } elseif ($this->role === 'user') {
            $sql = "SELECT nama_santri as nama, nis FROM santri WHERE user_id = ?";
        } else {
            return ['nama' => 'Administrator'];
        }

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$this->id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}