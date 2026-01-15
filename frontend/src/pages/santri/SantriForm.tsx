import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Home, Calendar, BookOpen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const santriSchema = z.object({
  name: z.string().min(1, 'Nama santri harus diisi'),
  idNumber: z.string().min(1, 'Nomor ID harus diisi'),
  birthDate: z.string().min(1, 'Tanggal lahir harus diisi'),
  gender: z.enum(['L', 'P'], { errorMap: () => ({ message: 'Jenis kelamin harus dipilih' }) }),
  phone: z.string().optional(),
  email: z.string().email('Format email tidak valid').optional().or(z.literal('')),
  parentName: z.string().min(1, 'Nama orang tua harus diisi'),
  parentPhone: z.string().optional(),
  class: z.string().min(1, 'Kelas harus dipilih'),
  entryDate: z.string().min(1, 'Tanggal masuk harus diisi'),
  status: z.enum(['Active', 'Inactive', 'Graduated'], { errorMap: () => ({ message: 'Status harus dipilih' }) }),
  previousSchool: z.string().optional(),
  dormitory: z.string().optional(),
  roomNumber: z.string().optional(),
});

type SantriFormData = z.infer<typeof santriSchema>;

const SantriForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<SantriFormData>({
    resolver: zodResolver(santriSchema),
    defaultValues: {
      gender: 'L',
      status: 'Active',
      entryDate: new Date().toISOString().split('T')[0],
    }
  });

  // Mock data for dropdowns
  const classes = ['1A', '1B', '2A', '2B', '3A', '3B'];
  const dormitories = ['Asrama Putra 1', 'Asrama Putra 2', 'Asrama Putri 1', 'Asrama Putri 2'];
  const statuses = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Graduated', label: 'Graduated' },
  ];

  // Load existing data if editing
  useEffect(() => {
    if (isEdit) {
      // In a real app, this would be an API call to fetch the santri data
      // For demo purposes, we'll set some mock values
      setTimeout(() => {
        setValue('name', 'Ahmad Fauzi');
        setValue('idNumber', 'SNTR001');
        setValue('birthDate', '2005-05-15');
        setValue('gender', 'L');
        setValue('phone', '+6281234567890');
        setValue('email', 'ahmad@example.com');
        setValue('parentName', 'Bapak Fauzi');
        setValue('parentPhone', '+6281234567891');
        setValue('class', '1A');
        setValue('entryDate', '2023-07-01');
        setValue('status', 'Active');
        setValue('previousSchool', 'MTs Negeri 1 Jakarta');
        setValue('dormitory', 'Asrama Putra 1');
        setValue('roomNumber', '101');
      }, 300);
    }
  }, [isEdit, setValue]);

  const onSubmit = async (data: SantriFormData) => {
    setLoading(true);
    
    // In a real app, this would be an API call
    // For demo purposes, we'll simulate the API call
    setTimeout(() => {
      console.log(data);
      setLoading(false);
      navigate('/santri');
    }, 1000);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link 
          to="/santri" 
          className="flex items-center text-primary-accent hover:text-accent-hover mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Santri List
        </Link>
        <h1 className="text-2xl font-bold text-white">
          {isEdit ? 'Edit Santri' : 'Add New Santri'}
        </h1>
        <p className="text-secondary-text">
          {isEdit 
            ? 'Update the information for this santri' 
            : 'Fill in the information for the new santri'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-secondary-bg rounded-lg p-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information Section */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-primary-accent" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-text mb-1">
                  Full Name *
                </label>
                <input
                  id="name"
                  {...register('name')}
                  className={`w-full px-3 py-2 bg-tertiary-bg border rounded-md shadow-sm placeholder-muted-text focus:outline-none focus:ring-primary-accent focus:border-primary-accent ${
                    errors.name ? 'border-danger' : 'border-border-color'
                  }`}
                  placeholder="Enter full name"
                />
                {errors.name && <p className="mt-1 text-sm text-danger">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="idNumber" className="block text-sm font-medium text-secondary-text mb-1">
                  ID Number *
                </label>
                <input
                  id="idNumber"
                  {...register('idNumber')}
                  className={`w-full px-3 py-2 bg-tertiary-bg border rounded-md shadow-sm placeholder-muted-text focus:outline-none focus:ring-primary-accent focus:border-primary-accent ${
                    errors.idNumber ? 'border-danger' : 'border-border-color'
                  }`}
                  placeholder="Enter ID number"
                />
                {errors.idNumber && <p className="mt-1 text-sm text-danger">{errors.idNumber.message}</p>}
              </div>

              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-secondary-text mb-1">
                  Birth Date *
                </label>
                <input
                  id="birthDate"
                  type="date"
                  {...register('birthDate')}
                  className={`w-full px-3 py-2 bg-tertiary-bg border rounded-md shadow-sm placeholder-muted-text focus:outline-none focus:ring-primary-accent focus:border-primary-accent ${
                    errors.birthDate ? 'border-danger' : 'border-border-color'
                  }`}
                />
                {errors.birthDate && <p className="mt-1 text-sm text-danger">{errors.birthDate.message}</p>}
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-secondary-text mb-1">
                  Gender *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="L"
                      {...register('gender')}
                      className="h-4 w-4 text-primary-accent focus:ring-primary-accent border-border-color"
                    />
                    <span className="ml-2 text-secondary-text">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="P"
                      {...register('gender')}
                      className="h-4 w-4 text-primary-accent focus:ring-primary-accent border-border-color"
                    />
                    <span className="ml-2 text-secondary-text">Female</span>
                  </label>
                </div>
                {errors.gender && <p className="mt-1 text-sm text-danger">{errors.gender.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-secondary-text mb-1">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className={`w-full px-3 py-2 bg-tertiary-bg border rounded-md shadow-sm placeholder-muted-text focus:outline-none focus:ring-primary-accent focus:border-primary-accent ${
                    errors.phone ? 'border-danger' : 'border-border-color'
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.phone && <p className="mt-1 text-sm text-danger">{errors.phone.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-text mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={`w-full px-3 py-2 bg-tertiary-bg border rounded-md shadow-sm placeholder-muted-text focus:outline-none focus:ring-primary-accent focus:border-primary-accent ${
                    errors.email ? 'border-danger' : 'border-border-color'
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="mt-1 text-sm text-danger">{errors.email.message}</p>}
              </div>
            </div>
          </div>

          {/* Family Information Section */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Home className="h-5 w-5 mr-2 text-primary-accent" />
              Family Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="parentName" className="block text-sm font-medium text-secondary-text mb-1">
                  Parent Name *
                </label>
                <input
                  id="parentName"
                  {...register('parentName')}
                  className={`w-full px-3 py-2 bg-tertiary-bg border rounded-md shadow-sm placeholder-muted-text focus:outline-none focus:ring-primary-accent focus:border-primary-accent ${
                    errors.parentName ? 'border-danger' : 'border-border-color'
                  }`}
                  placeholder="Enter parent name"
                />
                {errors.parentName && <p className="mt-1 text-sm text-danger">{errors.parentName.message}</p>}
              </div>

              <div>
                <label htmlFor="parentPhone" className="block text-sm font-medium text-secondary-text mb-1">
                  Parent Phone
                </label>
                <input
                  id="parentPhone"
                  type="tel"
                  {...register('parentPhone')}
                  className={`w-full px-3 py-2 bg-tertiary-bg border rounded-md shadow-sm placeholder-muted-text focus:outline-none focus:ring-primary-accent focus:border-primary-accent ${
                    errors.parentPhone ? 'border-danger' : 'border-border-color'
                  }`}
                  placeholder="Enter parent phone number"
                />
                {errors.parentPhone && <p className="mt-1 text-sm text-danger">{errors.parentPhone.message}</p>}
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary-accent" />
              Academic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="class" className="block text-sm font-medium text-secondary-text mb-1">
                  Class *
                </label>
                <select
                  id="class"
                  {...register('class')}
                  className={`w-full px-3 py-2 bg-tertiary-bg border rounded-md shadow-sm placeholder-muted-text focus:outline-none focus:ring-primary-accent focus:border-primary-accent ${
                    errors.class ? 'border-danger' : 'border-border-color'
                  }`}
                >
                  <option value="">Select class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                {errors.class && <p className="mt-1 text-sm text-danger">{errors.class.message}</p>}
              </div>

              <div>
                <label htmlFor="entryDate" className="block text-sm font-medium text-secondary-text mb-1">
                  Entry Date *
                </label>
                <input
                  id="entryDate"
                  type="date"
                  {...register('entryDate')}
                  className={`w-full px-3 py-2 bg-tertiary-bg border rounded-md shadow-sm placeholder-muted-text focus:outline-none focus:ring-primary-accent focus:border-primary-accent ${
                    errors.entryDate ? 'border-danger' : 'border-border-color'
                  }`}
                />
                {errors.entryDate && <p className="mt-1 text-sm text-danger">{errors.entryDate.message}</p>}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-secondary-text mb-1">
                  Status *
                </label>
                <select
                  id="status"
                  {...register('status')}
                  className={`w-full px-3 py-2 bg-tertiary-bg border rounded-md shadow-sm placeholder-muted-text focus:outline-none focus:ring-primary-accent focus:border-primary-accent ${
                    errors.status ? 'border-danger' : 'border-border-color'
                  }`}
                >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
                {errors.status && <p className="mt-1 text-sm text-danger">{errors.status.message}</p>}
              </div>

              <div>
                <label htmlFor="previousSchool" className="block text-sm font-medium text-secondary-text mb-1">
                  Previous School
                </label>
                <input
                  id="previousSchool"
                  {...register('previousSchool')}
                  className={`w-full px-3 py-2 bg-tertiary-bg border rounded-md shadow-sm placeholder-muted-text focus:outline-none focus:ring-primary-accent focus:border-primary-accent ${
                    errors.previousSchool ? 'border-danger' : 'border-border-color'
                  }`}
                  placeholder="Enter previous school"
                />
                {errors.previousSchool && <p className="mt-1 text-sm text-danger">{errors.previousSchool.message}</p>}
              </div>
            </div>
          </div>

          {/* Dormitory Assignment Section */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Home className="h-5 w-5 mr-2 text-primary-accent" />
              Dormitory Assignment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dormitory" className="block text-sm font-medium text-secondary-text mb-1">
                  Dormitory
                </label>
                <select
                  id="dormitory"
                  {...register('dormitory')}
                  className={`w-full px-3 py-2 bg-tertiary-bg border rounded-md shadow-sm placeholder-muted-text focus:outline-none focus:ring-primary-accent focus:border-primary-accent ${
                    errors.dormitory ? 'border-danger' : 'border-border-color'
                  }`}
                >
                  <option value="">Select dormitory</option>
                  {dormitories.map(dorm => (
                    <option key={dorm} value={dorm}>{dorm}</option>
                  ))}
                </select>
                {errors.dormitory && <p className="mt-1 text-sm text-danger">{errors.dormitory.message}</p>}
              </div>

              <div>
                <label htmlFor="roomNumber" className="block text-sm font-medium text-secondary-text mb-1">
                  Room Number
                </label>
                <input
                  id="roomNumber"
                  {...register('roomNumber')}
                  className={`w-full px-3 py-2 bg-tertiary-bg border rounded-md shadow-sm placeholder-muted-text focus:outline-none focus:ring-primary-accent focus:border-primary-accent ${
                    errors.roomNumber ? 'border-danger' : 'border-border-color'
                  }`}
                  placeholder="Enter room number"
                />
                {errors.roomNumber && <p className="mt-1 text-sm text-danger">{errors.roomNumber.message}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-8 flex justify-end space-x-4">
          <Link
            to="/santri"
            className="px-6 py-2 border border-border-color text-secondary-text rounded-md hover:bg-tertiary-bg"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary-accent text-white rounded-md hover:bg-accent-hover disabled:opacity-50"
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Santri' : 'Create Santri')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SantriForm;