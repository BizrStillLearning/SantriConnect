import { useState, useEffect } from 'react';
import { Search, Calendar, Users, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AttendanceRecord {
  id: string;
  date: string;
  class: string;
  santriName: string;
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Alfa';
  notes: string;
  recordedBy: string;
}

const AttendanceRecords = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Mock data - in a real app this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData: AttendanceRecord[] = [
        { id: '1', date: '2023-10-01', class: '1A', santriName: 'Ahmad Fauzi', status: 'Hadir', notes: '', recordedBy: 'Ustadz Ali' },
        { id: '2', date: '2023-10-01', class: '1A', santriName: 'Siti Nurhaliza', status: 'Izin', notes: 'Family event', recordedBy: 'Ustadzah Siti' },
        { id: '3', date: '2023-10-01', class: '1A', santriName: 'Muhammad Rizki', status: 'Sakit', notes: 'Fever', recordedBy: 'Ustadz Ahmad' },
        { id: '4', date: '2023-10-01', class: '1B', santriName: 'Fatimah Zahra', status: 'Hadir', notes: '', recordedBy: 'Ustadz Ali' },
        { id: '5', date: '2023-10-01', class: '1B', santriName: 'Abdul Rahman', status: 'Alfa', notes: '', recordedBy: 'Ustadz Budi' },
        { id: '6', date: '2023-09-30', class: '2A', santriName: 'Aisyah Humaira', status: 'Hadir', notes: '', recordedBy: 'Ustadzah Sari' },
        { id: '7', date: '2023-09-30', class: '2A', santriName: 'Budi Santoso', status: 'Izin', notes: 'Doctor appointment', recordedBy: 'Ustadz Joko' },
        { id: '8', date: '2023-09-29', class: '2B', santriName: 'Citra Dewi', status: 'Hadir', notes: '', recordedBy: 'Ustadzah Maya' },
      ];
      setRecords(mockData);
      setLoading(false);
    }, 500);
  }, []);

  // Filter records based on search and filters
  const filteredRecords = records.filter(record => {
    const matchesSearch = record.santriName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.recordedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || record.class === selectedClass;
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    
    // Date range filter
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const recordDate = new Date(record.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      matchesDate = recordDate >= startDate && recordDate <= endDate;
    }
    
    return matchesSearch && matchesClass && matchesStatus && matchesDate;
  });

  // Get unique classes for filter dropdown
  const classes = ['all', ...Array.from(new Set(records.map(r => r.class)))];
  const statuses = ['all', 'Hadir', 'Izin', 'Sakit', 'Alfa'];

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hadir':
        return 'bg-success/20 text-success';
      case 'Izin':
        return 'bg-info/20 text-info';
      case 'Sakit':
        return 'bg-warning/20 text-warning';
      case 'Alfa':
        return 'bg-danger/20 text-danger';
      default:
        return 'bg-muted-text/20 text-muted-text';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Riwayat Absensi</h1>
        <p className="text-secondary-text">Kelola dan pantau riwayat kehadiran santri</p>
      </div>

      {/* Filters */}
      <div className="bg-secondary-bg rounded-lg p-6 shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-secondary-text mb-1">
              Cari Santri
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-text" />
              </div>
              <input
                type="text"
                id="search"
                placeholder="Cari nama santri..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 bg-tertiary-bg border border-border-color rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
              />
            </div>
          </div>

          {/* Class Filter */}
          <div>
            <label htmlFor="class" className="block text-sm font-medium text-secondary-text mb-1">
              Kelas
            </label>
            <select
              id="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 bg-tertiary-bg border border-border-color rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>
                  {cls === 'all' ? 'Semua Kelas' : cls}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-secondary-text mb-1">
              Status
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 bg-tertiary-bg border border-border-color rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'Semua Status' : status}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-secondary-text mb-1">
              Rentang Tanggal
            </label>
            <div className="flex space-x-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                className="w-full px-4 py-2 bg-tertiary-bg border border-border-color rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                className="w-full px-4 py-2 bg-tertiary-bg border border-border-color rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-accent"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredRecords.length === 0 && (
        <div className="bg-secondary-bg rounded-lg p-12 text-center shadow-md">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-tertiary-bg">
            <Calendar className="h-8 w-8 text-muted-text" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-white">Belum ada data absensi</h3>
          <p className="mt-2 text-secondary-text">Mulai dengan mencatat kehadiran santri</p>
          <div className="mt-6">
            <Link
              to="/attendance"
              className="inline-flex items-center px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-accent-hover transition-colors"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Catat Absensi
            </Link>
          </div>
        </div>
      )}

      {/* Records Table */}
      {!loading && filteredRecords.length > 0 && (
        <div className="bg-secondary-bg rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border-color">
              <thead className="bg-tertiary-bg">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                    Kelas
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                    Nama Santri
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                    Catatan
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                    Dicatat Oleh
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-tertiary-bg/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                      {record.class}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {record.santriName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-text max-w-xs truncate">
                      {record.notes || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                      {record.recordedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to="#"
                          className="text-info hover:text-info/80"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button className="text-danger hover:text-danger/80">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-tertiary-bg px-6 py-3 border-t border-border-color flex items-center justify-between">
            <div className="text-sm text-secondary-text">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredRecords.length}</span> of{' '}
              <span className="font-medium">{filteredRecords.length}</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-tertiary-bg border border-border-color rounded-md text-secondary-text hover:bg-hover-state disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-primary-accent text-white rounded-md hover:bg-accent-hover">
                1
              </button>
              <button className="px-3 py-1 text-sm bg-tertiary-bg border border-border-color rounded-md text-secondary-text hover:bg-hover-state">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceRecords;