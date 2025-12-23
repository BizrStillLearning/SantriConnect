<?php
namespace App\Services;

class WhatsappService {
    private $token = "pBcVSqAH7rF9Cz4tKGbzKmZQbDG3UE";

    public function kirimPesan($target, $pesan) {
        // 1. Jalankan fungsi format nomor
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
        ));

        $response = curl_exec($curl);

        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
            error_log("cURL Error: " . $error_msg);
        }

        curl_close($curl);
        return $response;
    }

    private function formatNomor($nomor) {
        $nomor = preg_replace('/[^0-9]/', '', $nomor);

        if (substr($nomor, 0, 1) === '0') {
            $nomor = '62' . substr($nomor, 1);
        }

        return $nomor;
    }
}