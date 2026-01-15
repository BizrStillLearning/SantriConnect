import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import SantriList from './pages/santri/SantriList';
import SantriDetail from './pages/santri/SantriDetail';
import SantriForm from './pages/santri/SantriForm';
import AttendanceDashboard from './pages/attendance/AttendanceDashboard';
import AttendanceRecords from './pages/attendance/AttendanceRecords';
import AttendanceStatistics from './pages/attendance/AttendanceStatistics';
import DormitoryManagement from './pages/dormitory/DormitoryManagement';
import ReportsAnalytics from './pages/reports/ReportsAnalytics';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary-bg text-primary-text">
        <Navbar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/santri" 
              element={
                <ProtectedRoute>
                  <SantriList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/santri/:id" 
              element={
                <ProtectedRoute>
                  <SantriDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/santri/add" 
              element={
                <ProtectedRoute>
                  <SantriForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/santri/edit/:id" 
              element={
                <ProtectedRoute>
                  <SantriForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/attendance" 
              element={
                <ProtectedRoute>
                  <AttendanceDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/attendance/records" 
              element={
                <ProtectedRoute>
                  <AttendanceRecords />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/attendance/statistics" 
              element={
                <ProtectedRoute>
                  <AttendanceStatistics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dormitory" 
              element={
                <ProtectedRoute>
                  <DormitoryManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <ProtectedRoute>
                  <ReportsAnalytics />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;