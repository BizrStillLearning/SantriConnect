import { useState, useEffect } from 'react';
import { Home, Users, Bed, Plus, Edit, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Dormitory {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentOccupancy: number;
  status: 'Active' | 'Maintenance' | 'Inactive';
}

interface Santri {
  id: string;
  name: string;
  class: string;
  dormitoryId: string;
  roomNumber: string;
}

const DormitoryManagement = () => {
  const [dormitories, setDormitories] = useState<Dormitory[]>([]);
  const [santriList, setSantriList] = useState<Santri[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in a real app this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockDormitories: Dormitory[] = [
        { id: '1', name: 'Asrama Putra 1', location: 'Building A', capacity: 50, currentOccupancy: 45, status: 'Active' },
        { id: '2', name: 'Asrama Putra 2', location: 'Building B', capacity: 40, currentOccupancy: 38, status: 'Active' },
        { id: '3', name: 'Asrama Putri 1', location: 'Building C', capacity: 45, currentOccupancy: 42, status: 'Active' },
        { id: '4', name: 'Asrama Putri 2', location: 'Building D', capacity: 35, currentOccupancy: 30, status: 'Maintenance' },
      ];
      
      const mockSantri: Santri[] = [
        { id: '1', name: 'Ahmad Fauzi', class: '1A', dormitoryId: '1', roomNumber: '101' },
        { id: '2', name: 'Siti Nurhaliza', class: '2B', dormitoryId: '3', roomNumber: '205' },
        { id: '3', name: 'Muhammad Rizki', class: '3A', dormitoryId: '1', roomNumber: '102' },
        { id: '4', name: 'Fatimah Zahra', class: '1B', dormitoryId: '3', roomNumber: '201' },
        { id: '5', name: 'Abdul Rahman', class: '2A', dormitoryId: '2', roomNumber: '301' },
      ];
      
      setDormitories(mockDormitories);
      setSantriList(mockSantri);
      setLoading(false);
    }, 500);
  }, []);

  // Filter dormitories based on search term
  const filteredDormitories = dormitories.filter(dormitory => 
    dormitory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dormitory.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate occupancy percentage
  const getOccupancyPercentage = (dormitory: Dormitory) => {
    return Math.round((dormitory.currentOccupancy / dormitory.capacity) * 100);
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success/20 text-success';
      case 'Maintenance':
        return 'bg-warning/20 text-warning';
      case 'Inactive':
        return 'bg-danger/20 text-danger';
      default:
        return 'bg-muted-text/20 text-muted-text';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Manajemen Asrama</h1>
        <p className="text-secondary-text">Kelola asrama dan alokasi tempat tinggal santri</p>
      </div>

      {/* Search Bar */}
      <div className="bg-secondary-bg rounded-lg p-6 shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-text" />
            </div>
            <input
              type="text"
              placeholder="Search dormitories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full md:w-64 px-4 py-2 bg-tertiary-bg border border-border-color rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
            />
          </div>

          <Link
            to="#"
            className="flex items-center gap-2 px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-accent-hover transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Asrama</span>
          </Link>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-accent"></div>
        </div>
      )}

      {/* Dormitories List */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDormitories.map((dormitory) => (
            <div key={dormitory.id} className="bg-secondary-bg rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Home className="h-5 w-5 mr-2 text-primary-accent" />
                      {dormitory.name}
                    </h3>
                    <p className="text-secondary-text mt-1">{dormitory.location}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dormitory.status)}`}>
                    {dormitory.status}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-secondary-text">Kapasitas vs Penghuni</span>
                    <span className="text-sm text-white">{dormitory.currentOccupancy}/{dormitory.capacity}</span>
                  </div>
                  <div className="w-full bg-tertiary-bg rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        getOccupancyPercentage(dormitory) > 90 ? 'bg-danger' :
                        getOccupancyPercentage(dormitory) > 70 ? 'bg-warning' : 'bg-success'
                      }`} 
                      style={{ width: `${getOccupancyPercentage(dormitory)}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-secondary-text mt-1">
                    {getOccupancyPercentage(dormitory)}% terisi
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border-color flex justify-between">
                  <button className="text-primary-accent hover:text-accent-hover flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {dormitory.currentOccupancy} Penghuni
                  </button>
                  <div className="flex space-x-2">
                    <button className="text-info hover:text-info/80">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-danger hover:text-danger/80">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredDormitories.length === 0 && (
        <div className="bg-secondary-bg rounded-lg p-12 text-center shadow-md">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-tertiary-bg">
            <Home className="h-8 w-8 text-muted-text" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-white">Belum ada data asrama</h3>
          <p className="mt-2 text-secondary-text">Mulai dengan menambahkan asrama pertama</p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-accent-hover transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Asrama
            </button>
          </div>
        </div>
      )}

      {/* Assigned Santri Section */}
      {!loading && dormitories.length > 0 && (
        <div className="mt-8 bg-secondary-bg rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Bed className="h-5 w-5 mr-2 text-primary-accent" />
              Santri Terdaftar
            </h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border-color">
                <thead className="bg-tertiary-bg">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                      Nama Santri
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                      Kelas
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                      Asrama
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                      Nomor Kamar
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color">
                  {santriList.map((santri) => {
                    const dormitory = dormitories.find(d => d.id === santri.dormitoryId);
                    return (
                      <tr key={santri.id} className="hover:bg-tertiary-bg/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary-accent/20 flex items-center justify-center mr-3">
                              <Users className="h-5 w-5 text-primary-accent" />
                            </div>
                            <div className="text-sm font-medium text-white">{santri.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                          {santri.class}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {dormitory?.name || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                          {santri.roomNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-info hover:text-info/80">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-danger hover:text-danger/80">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DormitoryManagement;