import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, User, MoreVertical } from 'lucide-react';

interface Santri {
  id: string;
  name: string;
  class: string;
  dormitory: string;
  status: 'Active' | 'Inactive' | 'Graduated';
  phone: string;
  email: string;
}

const SantriList = () => {
  const [santriList, setSantriList] = useState<Santri[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');

  // Mock data - in a real app this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData: Santri[] = [
        { id: '1', name: 'Ahmad Fauzi', class: '1A', dormitory: 'Asrama Putra 1', status: 'Active', phone: '+6281234567890', email: 'ahmad@example.com' },
        { id: '2', name: 'Siti Nurhaliza', class: '2B', dormitory: 'Asrama Putri 2', status: 'Active', phone: '+6281234567891', email: 'siti@example.com' },
        { id: '3', name: 'Muhammad Rizki', class: '3A', dormitory: 'Asrama Putra 2', status: 'Active', phone: '+6281234567892', email: 'rizki@example.com' },
        { id: '4', name: 'Fatimah Zahra', class: '1B', dormitory: 'Asrama Putri 1', status: 'Active', phone: '+6281234567893', email: 'fatimah@example.com' },
        { id: '5', name: 'Abdul Rahman', class: '2A', dormitory: 'Asrama Putra 1', status: 'Graduated', phone: '+6281234567894', email: 'abdul@example.com' },
        { id: '6', name: 'Aisyah Humaira', class: '3B', dormitory: 'Asrama Putri 2', status: 'Active', phone: '+6281234567895', email: 'aisyah@example.com' },
      ];
      setSantriList(mockData);
      setLoading(false);
    }, 500);
  }, []);

  // Filter santri based on search term and selected class
  const filteredSantri = santriList.filter(santri => {
    const matchesSearch = santri.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         santri.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || santri.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  // Get unique classes for filter dropdown
  const classes = ['all', ...Array.from(new Set(santriList.map(s => s.class)))];

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success/20 text-success';
      case 'Inactive':
        return 'bg-muted-text/20 text-muted-text';
      case 'Graduated':
        return 'bg-secondary-accent/20 text-secondary-accent';
      default:
        return 'bg-muted-text/20 text-muted-text';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Daftar Santri</h1>
        <p className="text-secondary-text">Total {filteredSantri.length} santri terdaftar</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-secondary-bg rounded-lg p-6 shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-text" />
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-64 px-4 py-2 bg-tertiary-bg border border-border-color rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
              />
            </div>

            {/* Class Filter */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 bg-tertiary-bg border border-border-color rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>
                  {cls === 'all' ? 'All Classes' : cls}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            {/* View Toggle */}
            <div className="flex border border-border-color rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-primary-accent text-white' : 'bg-tertiary-bg text-secondary-text'}`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`px-3 py-2 text-sm ${viewMode === 'card' ? 'bg-primary-accent text-white' : 'bg-tertiary-bg text-secondary-text'}`}
              >
                Card
              </button>
            </div>

            {/* Add New Button */}
            <Link
              to="/santri/add"
              className="flex items-center gap-2 px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-accent-hover transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Santri</span>
            </Link>
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
      {!loading && filteredSantri.length === 0 && (
        <div className="bg-secondary-bg rounded-lg p-12 text-center shadow-md">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-tertiary-bg">
            <User className="h-8 w-8 text-muted-text" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-white">Belum ada data santri</h3>
          <p className="mt-2 text-secondary-text">Mulai dengan menambahkan santri baru</p>
          <div className="mt-6">
            <Link
              to="/santri/add"
              className="inline-flex items-center px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-accent-hover transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Santri Pertama
            </Link>
          </div>
        </div>
      )}

      {/* Data Display */}
      {!loading && filteredSantri.length > 0 && (
        <div className="bg-secondary-bg rounded-lg shadow-md overflow-hidden">
          {viewMode === 'list' ? (
            // Table View
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border-color">
                <thead className="bg-tertiary-bg">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                      Class
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                      Dormitory
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color">
                  {filteredSantri.map((santri) => (
                    <tr key={santri.id} className="hover:bg-tertiary-bg/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary-accent/20 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary-accent" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{santri.name}</div>
                            <div className="text-sm text-secondary-text">{santri.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                        {santri.class}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                        {santri.dormitory}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(santri.status)}`}>
                          {santri.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                        {santri.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/santri/${santri.id}`}
                            className="text-primary-accent hover:text-accent-hover"
                          >
                            View
                          </Link>
                          <Link
                            to={`/santri/edit/${santri.id}`}
                            className="text-info hover:text-info/80"
                          >
                            Edit
                          </Link>
                          <button className="text-danger hover:text-danger/80">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Card View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {filteredSantri.map((santri) => (
                <div key={santri.id} className="bg-tertiary-bg rounded-lg p-6 border border-border-color hover:shadow-lg transition-shadow">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 bg-primary-accent/20 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary-accent" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-white">{santri.name}</h3>
                      <p className="text-secondary-text">{santri.email}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-secondary-text">Class</span>
                      <span className="text-sm text-white">{santri.class}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-secondary-text">Dormitory</span>
                      <span className="text-sm text-white">{santri.dormitory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-secondary-text">Phone</span>
                      <span className="text-sm text-white">{santri.phone}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(santri.status)}`}>
                      {santri.status}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <Link
                      to={`/santri/${santri.id}`}
                      className="flex-1 text-center px-3 py-2 bg-primary-accent text-white rounded-md hover:bg-accent-hover transition-colors text-sm"
                    >
                      View
                    </Link>
                    <Link
                      to={`/santri/edit/${santri.id}`}
                      className="flex-1 text-center px-3 py-2 bg-secondary-bg border border-border-color text-white rounded-md hover:bg-tertiary-bg transition-colors text-sm"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          <div className="bg-tertiary-bg px-6 py-3 border-t border-border-color flex items-center justify-between">
            <div className="text-sm text-secondary-text">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredSantri.length}</span> of{' '}
              <span className="font-medium">{filteredSantri.length}</span> results
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

export default SantriList;