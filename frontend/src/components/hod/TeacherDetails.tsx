
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, MapPin, Briefcase, Info } from 'lucide-react';

interface TeacherDetails {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  department?: string;
  bio?: string;
  avatar_url?: string;
}

const TeacherDetails: React.FC = () => {
  const { teacherId } = useParams<{ teacherId: string }>();
  const [teacher, setTeacher] = useState<TeacherDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      if (!teacherId) {
        setError('Teacher ID is missing.');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost/php/api/get_teacher_details.php?id=${teacherId}`);
        if (response.data.success) {
          setTeacher(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch teacher details.');
        }
      } catch (err) {
        setError('An error occurred while fetching teacher details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherDetails();
  }, [teacherId]);

  const renderDetailItem = (Icon: React.ElementType, label: string, value?: string) => {
    if (!value) return null;
    return (
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 text-gray-400 mt-1" />
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-gray-900">{value}</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="p-6">Loading teacher details...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!teacher) {
    return <div className="p-6">No teacher details found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Teacher Details</h1>
      
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-4xl">
              {teacher.name.charAt(0)}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">{teacher.name}</h2>
            <p className="text-indigo-100">{teacher.department || 'Department not specified'}</p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {renderDetailItem(Mail, 'Email', teacher.email)}
            {renderDetailItem(Phone, 'Phone', teacher.phone)}
            {renderDetailItem(MapPin, 'Address', teacher.address)}
          </div>
          <div className="space-y-4">
            {renderDetailItem(Briefcase, 'Department', teacher.department)}
            {teacher.bio && (
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Bio</p>
                  <p className="text-gray-900 whitespace-pre-wrap">{teacher.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
