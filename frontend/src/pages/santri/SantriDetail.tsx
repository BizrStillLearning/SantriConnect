import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { User, Mail, Phone, Home, Calendar, BookOpen, GraduationCap, Edit, Trash2 } from 'lucide-react';

interface Santri {
  id: string;
  name: string;
  idNumber: string;
  birthDate: string;
  gender: string;
  phone: string;
  email: string;
  parentName: string;
  parentPhone: string;
  relation: string;
  class: string;
  entryDate: string;
  status: 'Active' | 'Inactive' | 'Graduated';
  previousSchool: string;
  dormitory: string;
  roomNumber: string;
  occupancyStatus: string;
}

const SantriDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [santri, setSantri] = useState<Santri | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in a real app this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockSantri: Santri = {
        id: id || '1',
        name: 'Ahmad Fauzi',
        idNumber: 'SNTR001',
        birthDate: '2005-05-15',
        gender: 'L',
        phone: '+6281234567890',
        email: 'ahmad@example.com',
        parentName: 'Bapak Fauzi',
        parentPhone: '+6281234567891',
        relation: 'Father',
        class: '1A',
        entryDate: '2023-07-01',
        status: 'Active',
        previousSchool: 'MTs Negeri 1 Jakarta',
        dormitory: 'Asrama Putra 1',
        roomNumber: '101',
        occupancyStatus: 'Shared',
      };
      setSantri(mockSantri);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-accent"></div>
      </div>
    );
  }

  if (!santri) {
    return (
      <div className="p-6">
        <div className="bg-secondary-bg rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold text-white">Santri Not Found</h2>
          <p className="text-secondary-text mt-2">The requested santri could not be found.</p>
        </div>
      </div>
    );
  }

  // Mock attendance statistics
  const attendanceStats = {
    totalDays: 180,
    present: 172,
    absent: 5,
    permission: 2,
    sick: 1,
    attendanceRate: 95.6,
    trend: '+2.3%'
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Santri Details</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-accent-hover">
            <Edit className="h-4 w-4" />
            Edit Santri
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-danger text-white rounded-md hover:bg-red-700">
            <Trash2 className="h-4 w-4" />
            Delete Santri
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Header */}
          <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-24 w-24 rounded-full bg-primary-accent/20 flex items-center justify-center">
                  <User className="h-12 w-12 text-primary-accent" />
                </div>
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-white">{santri.name}</h2>
                <p className="text-secondary-text">ID: {santri.idNumber}</p>
                <div className="mt-2 flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    santri.status === 'Active' ? 'bg-success/20 text-success' :
                    santri.status === 'Inactive' ? 'bg-muted-text/20 text-muted-text' :
                    'bg-secondary-accent/20 text-secondary-accent'
                  }`}>
                    {santri.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Information Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-primary-accent" />
                Personal Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary-text">Birth Date</span>
                  <span className="text-white">{new Date(santri.birthDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-text">Gender</span>
                  <span className="text-white">{santri.gender === 'L' ? 'Male' : 'Female'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-text">Phone</span>
                  <span className="text-white flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {santri.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-text">Email</span>
                  <span className="text-white flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {santri.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Family Information */}
            <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Home className="h-5 w-5 mr-2 text-primary-accent" />
                Family Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary-text">Parent Name</span>
                  <span className="text-white">{santri.parentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-text">Parent Phone</span>
                  <span className="text-white flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {santri.parentPhone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-text">Relation</span>
                  <span className="text-white">{santri.relation}</span>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary-accent" />
                Academic Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary-text">Class</span>
                  <span className="text-white">{santri.class}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-text">Entry Date</span>
                  <span className="text-white">{new Date(santri.entryDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-text">Status</span>
                  <span className="text-white">{santri.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-text">Previous School</span>
                  <span className="text-white">{santri.previousSchool}</span>
                </div>
              </div>
            </div>

            {/* Dormitory Information */}
            <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Home className="h-5 w-5 mr-2 text-primary-accent" />
                Dormitory Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary-text">Dormitory</span>
                  <span className="text-white">{santri.dormitory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-text">Room Number</span>
                  <span className="text-white">{santri.roomNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-text">Occupancy Status</span>
                  <span className="text-white">{santri.occupancyStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Attendance Statistics */}
        <div className="space-y-6">
          <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-primary-accent" />
              Attendance Statistics
            </h3>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-secondary-text">Attendance Rate</span>
                <span className="text-white font-bold">{attendanceStats.attendanceRate}%</span>
              </div>
              <div className="w-full bg-tertiary-bg rounded-full h-2.5">
                <div 
                  className="bg-primary-accent h-2.5 rounded-full" 
                  style={{ width: `${attendanceStats.attendanceRate}%` }}
                ></div>
              </div>
              <div className="text-right text-xs text-success mt-1">{attendanceStats.trend} from last month</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-tertiary-bg p-4 rounded-lg">
                <div className="text-secondary-text text-sm">Total Days</div>
                <div className="text-white font-bold">{attendanceStats.totalDays}</div>
              </div>
              <div className="bg-tertiary-bg p-4 rounded-lg">
                <div className="text-secondary-text text-sm">Present</div>
                <div className="text-success font-bold">{attendanceStats.present}</div>
              </div>
              <div className="bg-tertiary-bg p-4 rounded-lg">
                <div className="text-secondary-text text-sm">Alfa</div>
                <div className="text-danger font-bold">{attendanceStats.absent}</div>
              </div>
              <div className="bg-tertiary-bg p-4 rounded-lg">
                <div className="text-secondary-text text-sm">Permission</div>
                <div className="text-info font-bold">{attendanceStats.permission}</div>
              </div>
              <div className="bg-tertiary-bg p-4 rounded-lg">
                <div className="text-secondary-text text-sm">Sick</div>
                <div className="text-warning font-bold">{attendanceStats.sick}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-tertiary-bg hover:bg-hover-state rounded-md text-white">
                View Attendance History
              </button>
              <button className="w-full text-left px-4 py-3 bg-tertiary-bg hover:bg-hover-state rounded-md text-white">
                View Academic Reports
              </button>
              <button className="w-full text-left px-4 py-3 bg-tertiary-bg hover:bg-hover-state rounded-md text-white">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SantriDetail;