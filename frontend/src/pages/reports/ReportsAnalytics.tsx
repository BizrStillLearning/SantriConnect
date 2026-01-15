import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, FileText, Download, Printer, TrendingUp, BarChart3 } from 'lucide-react';

const ReportsAnalytics = () => {
  const [selectedReport, setSelectedReport] = useState('monthly-attendance');
  const [dateRange, setDateRange] = useState({ start: '2023-01-01', end: '2023-12-31' });
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for different reports
  const reportTypes = [
    { id: 'monthly-attendance', name: 'Monthly Attendance Report', icon: BarChart3 },
    { id: 'santri-statistics', name: 'Santri Statistics', icon: Users },
    { id: 'attendance-trends', name: 'Attendance Trends', icon: TrendingUp },
    { id: 'class-performance', name: 'Class Performance', icon: FileText },
  ];

  // Mock data for charts
  const monthlyAttendanceData = [
    { month: 'Jan', present: 120, permission: 5, sick: 3, absent: 2 },
    { month: 'Feb', present: 115, permission: 7, sick: 4, absent: 4 },
    { month: 'Mar', present: 118, permission: 6, sick: 2, absent: 2 },
    { month: 'Apr', present: 122, permission: 3, sick: 5, absent: 0 },
    { month: 'May', present: 117, permission: 8, sick: 3, absent: 2 },
    { month: 'Jun', present: 120, permission: 5, sick: 4, absent: 1 },
    { month: 'Jul', present: 110, permission: 4, sick: 6, absent: 0 },
    { month: 'Aug', present: 115, permission: 6, sick: 3, absent: 1 },
    { month: 'Sep', present: 118, permission: 5, sick: 2, absent: 0 },
    { month: 'Oct', present: 120, permission: 4, sick: 3, absent: 3 },
    { month: 'Nov', present: 117, permission: 7, sick: 4, absent: 2 },
    { month: 'Dec', present: 122, permission: 3, sick: 2, absent: 3 },
  ];

  const santriDistributionData = [
    { name: '1A', value: 25 },
    { name: '1B', value: 22 },
    { name: '2A', value: 28 },
    { name: '2B', value: 24 },
    { name: '3A', value: 20 },
    { name: '3B', value: 21 },
  ];

  const dormitoryOccupancyData = [
    { name: 'Asrama Putra 1', occupancy: 90 },
    { name: 'Asrama Putra 2', occupancy: 95 },
    { name: 'Asrama Putri 1', occupancy: 93 },
    { name: 'Asrama Putri 2', occupancy: 85 },
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
  const STATUS_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  // Load mock data based on selected report
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let data = null;
      
      switch (selectedReport) {
        case 'monthly-attendance':
          data = {
            title: 'Monthly Attendance Report',
            description: 'Attendance statistics for the selected period',
            chartData: monthlyAttendanceData,
            kpis: [
              { label: 'Average Attendance', value: '92%', change: '+2.3%' },
              { label: 'Total Students', value: '125', change: '+5' },
              { label: 'Avg Present Rate', value: '91%', change: '+1.2%' },
              { label: 'Avg Absent Rate', value: '2.4%', change: '-0.5%' },
            ]
          };
          break;
        case 'santri-statistics':
          data = {
            title: 'Santri Statistics Dashboard',
            description: 'Distribution and demographics of santri',
            chartData: santriDistributionData,
            kpis: [
              { label: 'Total Santri', value: '140', change: '+8' },
              { label: 'Male Santri', value: '72', change: '+3' },
              { label: 'Female Santri', value: '68', change: '+5' },
              { label: 'Active Santri', value: '138', change: '+2' },
            ]
          };
          break;
        case 'attendance-trends':
          data = {
            title: 'Attendance Trends Analysis',
            description: 'Historical trends and patterns',
            chartData: monthlyAttendanceData,
            kpis: [
              { label: 'Best Month', value: 'August', change: '94% attendance' },
              { label: 'Worst Month', value: 'July', change: '88% attendance' },
              { label: 'Improvement', value: '+3.2%', change: 'vs last year' },
              { label: 'Consistency', value: '91%', change: 'avg monthly' },
            ]
          };
          break;
        case 'class-performance':
          data = {
            title: 'Class Performance Report',
            description: 'Performance metrics by class',
            chartData: dormitoryOccupancyData,
            kpis: [
              { label: 'Top Performing', value: '2A', change: '95% attendance' },
              { label: 'Avg Performance', value: '91%', change: '+1.5%' },
              { label: 'Lowest', value: '3B', change: '87% attendance' },
              { label: 'Classes', value: '6', change: 'monitored' },
            ]
          };
          break;
        default:
          data = null;
      }
      
      setReportData(data);
      setLoading(false);
    }, 500);
  }, [selectedReport]);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
        <p className="text-secondary-text">Generate and analyze reports for your pesantren</p>
      </div>

      {/* Report Selector */}
      <div className="bg-secondary-bg rounded-lg p-6 shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-text mb-2">Select Report</label>
            <div className="grid grid-cols-2 gap-2">
              {reportTypes.map((report) => {
                const IconComponent = report.icon;
                return (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-md border ${
                      selectedReport === report.id
                        ? 'bg-primary-accent/10 border-primary-accent text-primary-accent'
                        : 'bg-tertiary-bg border-border-color text-secondary-text hover:bg-hover-state'
                    }`}
                  >
                    <IconComponent className="h-6 w-6 mb-1" />
                    <span className="text-xs">{report.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-secondary-text mb-2">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="w-full px-3 py-2 bg-tertiary-bg border border-border-color rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-secondary-text mb-2">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="w-full px-3 py-2 bg-tertiary-bg border border-border-color rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-secondary-bg rounded-lg p-4 shadow-md mb-6 flex flex-wrap gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-accent text-white rounded-md hover:bg-accent-hover">
          <Download className="h-4 w-4" />
          Export to PDF
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary-bg border border-border-color text-white rounded-md hover:bg-tertiary-bg">
          <Download className="h-4 w-4" />
          Export to Excel
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary-bg border border-border-color text-white rounded-md hover:bg-tertiary-bg">
          <Printer className="h-4 w-4" />
          Print Report
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-accent"></div>
        </div>
      ) : reportData ? (
        <>
          {/* Report Header */}
          <div className="bg-secondary-bg rounded-lg p-6 shadow-md mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">{reportData.title}</h2>
                <p className="text-secondary-text">{reportData.description}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-sm text-secondary-text">
                  Generated on {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {reportData.kpis.map((kpi: any, index: number) => (
              <div key={index} className="bg-secondary-bg rounded-lg p-6 shadow-md">
                <p className="text-sm font-medium text-secondary-text">{kpi.label}</p>
                <p className="text-2xl font-bold text-white mt-2">{kpi.value}</p>
                <p className={`text-xs mt-1 ${kpi.change.startsWith('+') ? 'text-success' : kpi.change.startsWith('-') ? 'text-danger' : 'text-warning'}`}>
                  {kpi.change}
                </p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Primary Chart */}
            <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-white mb-4">Overview</h3>
              <div className="h-80">
                {selectedReport === 'santri-statistics' || selectedReport === 'class-performance' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reportData.chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {reportData.chartData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a202c', borderColor: '#334155', color: '#f8fafc' }} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reportData.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="month" stroke="#cbd5e1" />
                      <YAxis stroke="#cbd5e1" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a202c', borderColor: '#334155', color: '#f8fafc' }} 
                      />
                      <Legend />
                      <Bar dataKey="present" name="Present" fill="#10b981" />
                      <Bar dataKey="permission" name="Permission" fill="#3b82f6" />
                      <Bar dataKey="sick" name="Sick" fill="#f59e0b" />
                      <Bar dataKey="absent" name="Absent" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Secondary Chart - Attendance Distribution */}
            <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-white mb-4">Attendance Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Present', value: 85 },
                        { name: 'Permission', value: 8 },
                        { name: 'Sick', value: 5 },
                        { name: 'Absent', value: 2 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {['#10b981', '#3b82f6', '#f59e0b', '#ef4444'].map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a202c', borderColor: '#334155', color: '#f8fafc' }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Additional Insights */}
          <div className="bg-secondary-bg rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-white mb-4">Insights & Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-tertiary-bg p-4 rounded-md">
                <h4 className="font-medium text-white mb-2">Trend Analysis</h4>
                <p className="text-secondary-text text-sm">
                  Attendance rates have been consistently high throughout the year with slight dips in summer months.
                  Consider implementing engagement programs during these periods to maintain high attendance.
                </p>
              </div>
              <div className="bg-tertiary-bg p-4 rounded-md">
                <h4 className="font-medium text-white mb-2">Action Items</h4>
                <ul className="text-secondary-text text-sm list-disc pl-5 space-y-1">
                  <li>Follow up with students with low attendance rates</li>
                  <li>Review dormitory occupancy for optimal allocation</li>
                  <li>Plan health awareness sessions</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-secondary-bg rounded-lg p-12 text-center shadow-md">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-tertiary-bg">
            <FileText className="h-8 w-8 text-muted-text" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-white">No Report Selected</h3>
          <p className="mt-2 text-secondary-text">Please select a report type from the options above</p>
        </div>
      )}
    </div>
  );
};

export default ReportsAnalytics;