import { defineStore } from 'pinia';
import axios from 'axios';

export const useFormStore = defineStore('form', {
    state: () => ({
        isLoading: false,
        errorMessage: '',
        successMessage: '',
        pendaftarList: []
    }),

    actions: {
        async submitPendaftaran(formDataRaw) {
            this.isLoading = true;
            this.errorMessage = '';
            this.successMessage = '';

            try {
                const data = new FormData();

                data.append('nama_lengkap', formDataRaw.nama_lengkap || '');
                data.append('alamat', formDataRaw.alamat || '');
                data.append('nama_orang_tua', formDataRaw.nama_orang_tua || '');
                data.append('nomor_orang_tua', formDataRaw.nomor_orang_tua || '');
                data.append('username', formDataRaw.username || '');
                data.append('email', formDataRaw.email || '');
                data.append('password', formDataRaw.password || '');

                // Penanganan FILE (Hanya ditambahkan jika filenya ada)
                if (formDataRaw.file_kk instanceof File) {
                    data.append('file_kk', formDataRaw.file_kk);
                }

                if (formDataRaw.file_bukti_bayar instanceof File) {
                    data.append('file_bukti_bayar', formDataRaw.file_bukti_bayar);
                }

                // DEBUG: Lihat isi FormData di console browser sebelum dikirim
                for (let pair of data.entries()) {
                    console.log(pair[0] + ': ' + pair[1]);
                }

                const response = await axios.post('http://localhost/SantriConnect/backend/app/psb/daftar.php', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.status === 'success') {
                    this.successMessage = response.data.message;
                    return true;
                }

                this.errorMessage = response.data.message || 'Gagal menyimpan data.';
                return false;

            } catch (error) {
                console.error("Detail Axios Error:", error.response);
                this.errorMessage = error.response?.data?.message || 'Terjadi kesalahan jaringan atau server.';
                return false;
            } finally {
                this.isLoading = false;
            }
        },

        // Action fetchPendingList & verifyPendaftar tetap sama
        async fetchPendingList() {
            this.isLoading = true;
            try {
                const response = await axios.get('http://localhost/SantriConnect/backend/app/psb/list_pending.php');
                if (response.data.status === 'success') {
                    this.pendaftarList = response.data.data;
                    return response.data.data;
                }
                return [];
            } catch (error) {
                this.errorMessage = 'Gagal mengambil data pendaftar.';
                return [];
            } finally {
                this.isLoading = false;
            }
        },

        async verifyPendaftar(id) {
            this.isLoading = true;
            try {
                const response = await axios.post('http://localhost/SantriConnect/backend/app/psb/verifikasi.php', { id });
                if (response.data.status === 'success') {
                    this.pendaftarList = this.pendaftarList.filter(p => p.id !== id);
                    return true;
                }
                return false;
            } catch (error) {
                alert(error.response?.data?.message || "Gagal verifikasi");
                return false;
            } finally {
                this.isLoading = false;
            }
        }
    }
});