import { defineStore } from 'pinia';
import axios from 'axios';

export const useFormStore = defineStore('form', {
    state: () => ({
        isLoading: false,
        errorMessage: '',
        successMessage: '',
        pendaftarList: [] // Untuk menampung data calon santri di tabel admin
    }),

    actions: {
        // 1. Action untuk mengirim pendaftaran (digunakan di Form.vue)
        async submitPendaftaran(formData) {
            this.isLoading = true;
            this.errorMessage = '';
            this.successMessage = '';

            try {
                const response = await axios.post('http://localhost/SantriConnect/backend/app/psb/daftar.php', formData);

                if (response.data.status === 'success') {
                    this.successMessage = response.data.message;
                    return true;
                }

                // Jika server merespon tapi status bukan success
                this.errorMessage = response.data.message || 'Gagal menyimpan data.';
                return false;

            } catch (error) {
                console.error("Axios Error:", error.response || error);
                console.error("DEBUG DETAIL ERROR:", error);
                this.errorMessage = error.response?.data?.message || 'Terjadi kesalahan pada server atau jaringan.';
                return false;
            } finally {
                this.isLoading = false;
            }
        },

        async fetchPendingList() {
            this.isLoading = true;
            this.errorMessage = '';

            try {
                const response = await axios.get('http://localhost/SantriConnect/backend/app/psb/list_pending.php');

                if (response.data.status === 'success') {
                    this.pendaftarList = response.data.data;
                    return response.data.data;
                }
                return [];
            } catch (error) {
                console.error("Fetch Error:", error);
                this.errorMessage = 'Gagal mengambil data pendaftar dari server.';
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
                    // Refresh data lokal setelah verifikasi
                    this.pendaftarList = this.pendaftarList.filter(p => p.id !== id);
                    return true;
                }
            } catch (error) {
                alert(error.response?.data?.message || "Gagal verifikasi");
                return false;
            } finally {
                this.isLoading = false;
            }
        }
    }
});