import { useState, useEffect } from 'react';
import { Calendar, Users, CheckCircle, XCircle, FileText, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const AttendanceDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'matrix'>('list');
  const [loading, setLoading] = useState(false);

  // Mock data for santri in a class
  const [attendanceData, setAttendanceData] = useState([
    { id: '1', name: 'Ahmad Fauzi', status: 'present', notes: '' },
    { id: '2', name: 'Siti Nurhaliza', status: 'permission', notes: 'Family event' },
    { id: '3', name: 'Muhammad Rizki', status: 'sick', notes: 'Fever' },
    { id: '4', name: 'Fatimah Zahra', status: 'absent', notes: '' },
    { id: '5', name: 'Abdul Rahman', status: '', notes: '' },
    { id: '6', name: 'Aisyah Humaira', status: '', notes: '' },
  ]);

  const classes = ['all', '1A', '1B', '2A', '2B', '3A', '3B'];

  const handleStatusChange = (id: string, status: string) => {
    setAttendanceData(prev =>
      prev.map(item => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleNotesChange = (id: string, notes: string) => {
    setAttendanceData(prev =>
      prev.map(item => (item.id === id ? { ...item, notes } : item))
    );
  };

  const handleSubmit = () => {
    setLoading(true);
    // In a real app, this would be an API call
    setTimeout(() => {
      setLoading(false);
      alert('Attendance records saved successfully!');
    }, 1000);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Pencatatan Absensi</h1>
        <p className="text-secondary-text">Catat kehadiran santri untuk tanggal yang dipilih</p>
      </div>

      {/* Controls */}
      <div className="bg-secondary-bg rounded-lg p-6 shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-secondary-text mb-1">
              Tanggal
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 bg-tertiary-bg border border-border-color rounded-md text-white focus:outline-none focus:ring-primary-accent focus:border-primary-accent"
            />
          </div>

          <div>
            <label htmlFor="class" className="block text-sm font-medium text-secondary-text mb-1">
              Kelas
            </label>
            <select
              id="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 bg-tertiary-bg border border-border-color rounded-md text-white focus:outline-none focus:ring-primary-accent focus:border-primary-accent"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>
                  {cls === 'all' ? 'Semua Kelas' : cls}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-text mb-1">
              Mode Tampilan
            </label>
            <div className="flex border border-border-color rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-primary-accent text-white' : 'bg-tertiary-bg text-secondary-text'}`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-primary-accent text-white' : 'bg-tertiary-bg text-secondary-text'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`flex-1 px-3 py-2 text-sm ${viewMode === 'matrix' ? 'bg-primary-accent text-white' : 'bg-tertiary-bg text-secondary-text'}`}
              >
                Matrix
              </button>
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setAttendanceData(prev => prev.map(item => ({ ...item, status: 'present', notes: '' })))}
              className="w-full px-4 py-2 bg-success text-white rounded-md hover:bg-green-700 text-sm"
            >
              Hadir Semua
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Form */}
      <div className="bg-secondary-bg rounded-lg shadow-md overflow-hidden">
        {viewMode === 'list' && (
          <div className="p-6">
            <div className="space-y-4">
              {attendanceData.map((santri) => (
                <div key={santri.id} className="flex items-center justify-between p-4 bg-tertiary-bg rounded-lg">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary-accent/20 flex items-center justify-center mr-4">
                      <Users className="h-5 w-5 text-primary-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{santri.name}</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusChange(santri.id, 'present')}
                        className={`px-3 py-1 rounded-md text-sm ${
                          santri.status === 'present' 
                            ? 'bg-success text-white' 
                            : 'bg-tertiary-bg text-secondary-text hover:bg-hover-state'
                        }`}
                      >
                        Hadir
                      </button>
                      <button
                        onClick={() => handleStatusChange(santri.id, 'permission')}
                        className={`px-3 py-1 rounded-md text-sm ${
                          santri.status === 'permission' 
                            ? 'bg-info text-white' 
                            : 'bg-tertiary-bg text-secondary-text hover:bg-hover-state'
                        }`}
                      >
                        Izin
                      </button>
                      <button
                        onClick={() => handleStatusChange(santri.id, 'sick')}
                        className={`px-3 py-1 rounded-md text-sm ${
                          santri.status === 'sick' 
                            ? 'bg-warning text-white' 
                            : 'bg-tertiary-bg text-secondary-text hover:bg-hover-state'
                        }`}
                      >
                        Sakit
                      </button>
                      <button
                        onClick={() => handleStatusChange(santri.id, 'absent')}
                        className={`px-3 py-1 rounded-md text-sm ${
                          santri.status === 'absent' 
                            ? 'bg-danger text-white' 
                            : 'bg-tertiary-bg text-secondary-text hover:bg-hover-state'
                        }`}
                      >
                        Alfa
                      </button>
                    </div>
                    
                    <input
                      type="text"
                      value={santri.notes}
                      onChange={(e) => handleNotesChange(santri.id, e.target.value)}
                      placeholder="Catatan..."
                      className="px-3 py-1 bg-tertiary-bg border border-border-color rounded-md text-white text-sm w-40 focus:outline-none focus:ring-primary-accent focus:border-primary-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'grid' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {attendanceData.map((santri) => (
                <div key={santri.id} className="p-4 bg-tertiary-bg rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-primary-accent/20 flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-primary-accent" />
                    </div>
                    <h3 className="font-medium text-white">{santri.name}</h3>
                  </div>
                  
                  <div className="flex space-x-2 mb-3">
                    <button
                      onClick={() => handleStatusChange(santri.id, 'present')}
                      className={`flex-1 py-2 rounded-md text-sm ${
                        santri.status === 'present' 
                          ? 'bg-success text-white' 
                          : 'bg-tertiary-bg text-secondary-text hover:bg-hover-state'
                      }`}
                    >
                      Hadir
                    </button>
                    <button
                      onClick={() => handleStatusChange(santri.id, 'permission')}
                      className={`flex-1 py-2 rounded-md text-sm ${
                        santri.status === 'permission' 
                          ? 'bg-info text-white' 
                          : 'bg-tertiary-bg text-secondary-text hover:bg-hover-state'
                      }`}
                    >
                      Izin
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(santri.id, 'sick')}
                      className={`flex-1 py-2 rounded-md text-sm ${
                        santri.status === 'sick' 
                          ? 'bg-warning text-white' 
                          : 'bg-tertiary-bg text-secondary-text hover:bg-hover-state'
                      }`}
                    >
                      Sakit
                    </button>
                    <button
                      onClick={() => handleStatusChange(santri.id, 'absent')}
                      className={`flex-1 py-2 rounded-md text-sm ${
                        santri.status === 'absent' 
                          ? 'bg-danger text-white' 
                          : 'bg-tertiary-bg text-secondary-text hover:bg-hover-state'
                      }`}
                    >
                      Alfa
                    </button>
                  </div>
                  
                  <input
                    type="text"
                    value={santri.notes}
                    onChange={(e) => handleNotesChange(santri.id, e.target.value)}
                    placeholder="Catatan..."
                    className="mt-3 w-full px-3 py-1 bg-tertiary-bg border border-border-color rounded-md text-white text-sm focus:outline-none focus:ring-primary-accent focus:border-primary-accent"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'matrix' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border-color">
              <thead className="bg-tertiary-bg">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">Santri</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-secondary-text uppercase tracking-wider">08:00</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-secondary-text uppercase tracking-wider">10:00</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-secondary-text uppercase tracking-wider">13:00</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-secondary-text uppercase tracking-wider">15:00</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-secondary-text uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {attendanceData.map((santri) => (
                  <tr key={santri.id} className="hover:bg-tertiary-bg/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary-accent/20 flex items-center justify-center mr-3">
                          <Users className="h-4 w-4 text-primary-accent" />
                        </div>
                        <div className="text-sm font-medium text-white">{santri.name}</div>
                      </div>
                    </td>
                    {[1, 2, 3, 4].map((period) => (
                      <td key={period} className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          className={`h-10 w-10 rounded-full ${
                            santri.status === 'present' ? 'bg-success' :
                            santri.status === 'permission' ? 'bg-info' :
                            santri.status === 'sick' ? 'bg-warning' :
                            santri.status === 'absent' ? 'bg-danger' :
                            'bg-tertiary-bg border border-border-color hover:bg-hover-state'
                          }`}
                          onClick={() => handleStatusChange(santri.id, period === 1 ? 'present' : period === 2 ? 'permission' : period === 3 ? 'sick' : 'absent')}
                        >
                          {santri.status && (
                            <span className="text-white text-xs">
                              {santri.status === 'present' ? 'H' :
                               santri.status === 'permission' ? 'I' :
                               santri.status === 'sick' ? 'S' : 'A'}
                            </span>
                          )}
                        </button>
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        santri.status === 'present' ? 'bg-success/20 text-success' :
                        santri.status === 'permission' ? 'bg-info/20 text-info' :
                        santri.status === 'sick' ? 'bg-warning/20 text-warning' :
                        santri.status === 'absent' ? 'bg-danger/20 text-danger' :
                        'bg-muted-text/20 text-muted-text'
                      }`}>
                        {santri.status ? 
                          santri.status === 'present' ? 'Hadir' :
                          santri.status === 'permission' ? 'Izin' :
                          santri.status === 'sick' ? 'Sakit' : 'Alfa'
                          : 'Belum dicatat'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Form Actions */}
        <div className="bg-tertiary-bg px-6 py-4 border-t border-border-color flex justify-end space-x-4">
          <Link
            to="/attendance/records"
            className="px-4 py-2 border border-border-color text-secondary-text rounded-md hover:bg-tertiary-bg"
          >
            Batal
          </Link>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-accent-hover disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Simpan Absensi
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;