import { defineStore } from 'pinia';
import axios from 'axios';

export const useGuruStore = defineStore('guru', {
    state: () => ({
        listSantri: [],
        isLoading: false
    }),

    actions: {
        async fetchSantriByKelas(kelas) {
            this.isLoading = true;
            try {
                const res = await axios.get(`http://localhost/SantriConnect/backend/app/guru/get_santri_by_kelas.php?kelas=${kelas}`);
                this.listSantri = res.data.data.map(s => ({
                    santri_id: s.id,
                    nama_santri: s.nama_santri,
                    status: 'hadir'
                }));
            } catch (error) {
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        },

        async simpanJurnalDanAbsensi(payload) {
            try {
                const res = await axios.post('http://localhost/SantriConnect/backend/app/guru/simpan_jurnal.php', payload);
                return res.data.status === 'success';
            } catch (error) {
                alert("Gagal simpan data");
                return false;
            }
        }
    }
});