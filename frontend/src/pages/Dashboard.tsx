import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, Calendar, UserCheck, AlertTriangle, FileText } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSantri: 0,
    presentToday: 0,
    permissionToday: 0,
    absentToday: 0,
  });

  // Mock data for the attendance chart
  const attendanceData = [
    { name: 'Mon', present: 120, permission: 5, absent: 8 },
    { name: 'Tue', present: 115, permission: 7, absent: 13 },
    { name: 'Wed', present: 118, permission: 6, absent: 11 },
    { name: 'Thu', present: 122, permission: 3, absent: 10 },
    { name: 'Fri', present: 117, permission: 8, absent: 10 },
    { name: 'Sat', present: 110, permission: 4, absent: 11 },
  ];

  // Mock recent activity data
  const recentActivity = [
    { id: 1, name: 'Ahmad Fauzi', class: '1A', status: 'hadir', time: '08:00', recordedBy: 'Ustadz Ali' },
    { id: 2, name: 'Siti Nurhaliza', class: '2B', status: 'izin', time: '08:15', recordedBy: 'Ustadzah Siti' },
    { id: 3, name: 'Muhammad Rizki', class: '3A', status: 'sakit', time: '08:30', recordedBy: 'Ustadz Ahmad' },
    { id: 4, name: 'Fatimah Zahra', class: '1B', status: 'hadir', time: '08:45', recordedBy: 'Ustadz Ali' },
    { id: 5, name: 'Abdul Rahman', class: '2A', status: 'alfa', time: '09:00', recordedBy: 'Ustadz Budi' },
  ];

  // Mock data for key metrics
  useEffect(() => {
    // In a real app, this would come from an API call
    setStats({
      totalSantri: 245,
      presentToday: 220,
      permissionToday: 12,
      absentToday: 13,
    });
  }, []);

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hadir':
        return '#10b981'; // green
      case 'izin':
        return '#3b82f6'; // blue
      case 'sakit':
        return '#f59e0b'; // amber
      case 'alfa':
        return '#ef4444'; // red
      default:
        return '#94a3b8'; // gray
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-secondary-text">Assalamu Alaikum, Admin User</p>
        <p className="text-secondary-text">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Santri Card */}
        <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-accent/10">
              <Users className="h-6 w-6 text-primary-accent" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-text">Total Santri</p>
              <p className="text-2xl font-bold text-white">{stats.totalSantri}</p>
              <p className="text-xs text-success mt-1">↑ 5% from last month</p>
            </div>
          </div>
        </div>

        {/* Present Today Card */}
        <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success/10">
              <UserCheck className="h-6 w-6 text-success" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-text">Present Today</p>
              <p className="text-2xl font-bold text-white">{stats.presentToday}</p>
              <p className="text-xs text-success mt-1">89% attendance rate</p>
            </div>
          </div>
        </div>

        {/* Permission/Sick Card */}
        <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-warning/10">
              <FileText className="h-6 w-6 text-warning" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-text">Permission/Sick</p>
              <p className="text-2xl font-bold text-white">{stats.permissionToday}</p>
              <p className="text-xs text-warning mt-1">↑ 2 from yesterday</p>
            </div>
          </div>
        </div>

        {/* Absent Today Card */}
        <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-danger/10">
              <AlertTriangle className="h-6 w-6 text-danger" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-text">Absent Today</p>
              <p className="text-2xl font-bold text-white">{stats.absentToday}</p>
              <p className="text-xs text-danger mt-1">↑ 3 from yesterday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Attendance Chart */}
        <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
          <h2 className="text-lg font-semibold text-white mb-4">Attendance Overview (This Week)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a202c', borderColor: '#334155', color: '#f8fafc' }} 
                />
                <Bar dataKey="present" name="Present">
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#10b981" />
                  ))}
                </Bar>
                <Bar dataKey="permission" name="Permission">
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#3b82f6" />
                  ))}
                </Bar>
                <Bar dataKey="absent" name="Absent">
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#ef4444" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
          <h2 className="text-lg font-semibold text-white mb-4">Latest Attendance Records</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border-color">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">Class</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {recentActivity.map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-4 py-3 text-sm text-white">{activity.name}</td>
                    <td className="px-4 py-3 text-sm text-secondary-text">{activity.class}</td>
                    <td className="px-4 py-3 text-sm">
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getStatusColor(activity.status)}20`, color: getStatusColor(activity.status) }}
                      >
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary-text">{activity.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <button className="text-primary-accent hover:text-accent-hover text-sm font-medium">
              View All Records
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-primary-accent text-white rounded-md hover:bg-accent-hover transition-colors font-medium">
            Record Attendance
          </button>
          <button className="px-6 py-3 bg-secondary-bg border border-border-color text-white rounded-md hover:bg-tertiary-bg transition-colors font-medium">
            Add New Santri
          </button>
          <button className="px-6 py-3 bg-secondary-bg border border-border-color text-white rounded-md hover:bg-tertiary-bg transition-colors font-medium">
            View Full Reports
          </button>
          <button className="px-6 py-3 bg-secondary-bg border border-border-color text-white rounded-md hover:bg-tertiary-bg transition-colors font-medium">
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;