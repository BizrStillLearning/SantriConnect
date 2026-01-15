import { useState, useEffect } from 'react';
import { Users, Calendar, Download, Printer } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AttendanceStatistics = () => {
  const [selectedSantri, setSelectedSantri] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for santri dropdown
  const santriList = [
    { id: 'all', name: 'Semua Santri' },
    { id: '1', name: 'Ahmad Fauzi' },
    { id: '2', name: 'Siti Nurhaliza' },
    { id: '3', name: 'Muhammad Rizki' },
    { id: '4', name: 'Fatimah Zahra' },
    { id: '5', name: 'Abdul Rahman' },
  ];

  // Mock data for months and years
  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ];

  const years = [2022, 2023, 2024, 2025];

  // Mock attendance data
  const attendanceData = [
    { name: 'Hadir', value: 22 },
    { name: 'Izin', value: 2 },
    { name: 'Sakit', value: 1 },
    { name: 'Alfa', value: 0 },
  ];

  const monthlyTrendData = [
    { month: 'Jan', present: 20, permission: 2, sick: 1, absent: 0 },
    { month: 'Feb', present: 18, permission: 3, sick: 1, absent: 1 },
    { month: 'Mar', present: 22, permission: 1, sick: 0, absent: 0 },
    { month: 'Apr', present: 21, permission: 1, sick: 1, absent: 0 },
    { month: 'May', present: 22, permission: 0, sick: 1, absent: 0 },
    { month: 'Jun', present: 20, permission: 2, sick: 1, absent: 0 },
  ];

  // Mock data - in a real app this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockStats = {
        santriName: selectedSantri === 'all' ? 'Semua Santri' : santriList.find(s => s.id === selectedSantri)?.name || 'Unknown',
        class: selectedSantri === 'all' ? 'Semua Kelas' : '1A',
        period: `${months.find(m => m.value === selectedMonth)?.name} ${selectedYear}`,
        totalDays: 25,
        present: 22,
        absent: 0,
        permission: 2,
        sick: 1,
        attendanceRate: 92,
      };
      setStats(mockStats);
      setLoading(false);
    }, 500);
  }, [selectedSantri, selectedMonth, selectedYear]);

  // Colors for charts
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Statistik Absensi</h1>
        <p className="text-secondary-text">Analisis kehadiran santri secara mendetail</p>
      </div>

      {/* Selectors */}
      <div className="bg-secondary-bg rounded-lg p-6 shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="santri" className="block text-sm font-medium text-secondary-text mb-1">
              Santri
            </label>
            <select
              id="santri"
              value={selectedSantri}
              onChange={(e) => setSelectedSantri(e.target.value)}
              className="w-full px-4 py-2 bg-tertiary-bg border border-border-color rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
            >
              {santriList.map(santri => (
                <option key={santri.id} value={santri.id}>
                  {santri.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="month" className="block text-sm font-medium text-secondary-text mb-1">
              Bulan
            </label>
            <select
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="w-full px-4 py-2 bg-tertiary-bg border border-border-color rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
            >
              {months.map(month => (
                <option key={month.value} value={month.value}>
                  {month.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-secondary-text mb-1">
              Tahun
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full px-4 py-2 bg-tertiary-bg border border-border-color rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-accent-hover flex items-center justify-center">
              <Calendar className="h-4 w-4 mr-2" />
              Terapkan
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-accent"></div>
        </div>
      ) : stats && (
        <>
          {/* Header Card */}
          <div className="bg-secondary-bg rounded-lg p-6 shadow-md mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">{stats.santriName}</h2>
                <p className="text-secondary-text">{stats.class} • {stats.period}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">{stats.attendanceRate}%</div>
                  <div className="text-sm text-secondary-text">Tingkat Kehadiran</div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
              <div className="text-sm text-secondary-text mb-1">Total Hari Sekolah</div>
              <div className="text-2xl font-bold text-white">{stats.totalDays}</div>
              <div className="text-xs text-success mt-1">✓ Sesuai kalender</div>
            </div>

            <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
              <div className="text-sm text-secondary-text mb-1">Hadir</div>
              <div className="text-2xl font-bold text-success">{stats.present}</div>
              <div className="text-xs text-success mt-1">✓ {Math.round((stats.present / stats.totalDays) * 100)}%</div>
            </div>

            <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
              <div className="text-sm text-secondary-text mb-1">Alfa</div>
              <div className="text-2xl font-bold text-danger">{stats.absent}</div>
              <div className="text-xs text-danger mt-1">✗ {Math.round((stats.absent / stats.totalDays) * 100)}%</div>
            </div>

            <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
              <div className="text-sm text-secondary-text mb-1">Izin/Sakit</div>
              <div className="text-2xl font-bold text-info">{stats.permission + stats.sick}</div>
              <div className="text-xs text-info mt-1">✓ {Math.round(((stats.permission + stats.sick) / stats.totalDays) * 100)}%</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Pie Chart */}
            <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-white mb-4">Distribusi Kehadiran</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} hari`, 'Jumlah']}
                      contentStyle={{ backgroundColor: '#1a202c', borderColor: '#334155', color: '#f8fafc' }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-white mb-4">Trend Kehadiran (Tahun Ini)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#cbd5e1" />
                    <YAxis stroke="#cbd5e1" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a202c', borderColor: '#334155', color: '#f8fafc' }} 
                    />
                    <Bar dataKey="present" name="Hadir" fill="#10b981" />
                    <Bar dataKey="permission" name="Izin" fill="#3b82f6" />
                    <Bar dataKey="sick" name="Sakit" fill="#f59e0b" />
                    <Bar dataKey="absent" name="Alfa" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Export Section */}
          <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-white mb-4">Ekspor Data</h3>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-accent-hover">
                <Download className="h-4 w-4" />
                Ekspor ke PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary-bg border border-border-color text-white rounded-md hover:bg-tertiary-bg">
                <Download className="h-4 w-4" />
                Ekspor ke Excel
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary-bg border border-border-color text-white rounded-md hover:bg-tertiary-bg">
                <Printer className="h-4 w-4" />
                Cetak
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceStatistics;