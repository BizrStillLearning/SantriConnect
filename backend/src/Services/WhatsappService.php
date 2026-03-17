<?php
namespace App\Services;

class WhatsappService {
    private $token = "LDEgFufEPHpZkhjzwuDf";


    public function kirimPesan($target, $pesan) {
        $targetFormatted = $this->formatNomor($target);

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.fonnte.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => array(
                'target' => $targetFormatted,
                'message' => $pesan,
                'countryCode' => '62',
            ),
            CURLOPT_HTTPHEADER => array(
                "Authorization: " . $this->token
            ),
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => 0,
        ));

        $response = curl_exec($curl);

        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
            error_log("cURL Error: " . $error_msg);

            error_log("cURL Error: " . $error_msg);
            return json_encode(["status" => false, "reason" => $error_msg]);
        }

        curl_close($curl);
        return $response;
    }

    private function formatNomor($nomor) {
        // Hapus semua karakter yang bukan angka
        $nomor = preg_replace('/[^0-9]/', '', $nomor);

        // Jika nomor diawali '0', ganti dengan '62'
        if (substr($nomor, 0, 1) === '0') {
            $nomor = '62' . substr($nomor, 1);
        }

        return $nomor;
    }
}