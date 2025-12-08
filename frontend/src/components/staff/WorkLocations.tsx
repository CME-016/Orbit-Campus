
import React, { useState } from 'react';
import { MapPin, Building, Clock, Search } from 'lucide-react';

// Mock data for work locations and schedules
const mockLocations = [
  {
    id: 1,
    building: 'Main Administration Building',
    floor: '2nd Floor',
    department: 'Admissions Office',
    schedule: {
      Monday: '09:00 - 17:00',
      Tuesday: '09:00 - 17:00',
      Wednesday: '09:00 - 17:00',
      Thursday: '09:00 - 17:00',
      Friday: '09:00 - 13:00',
      Saturday: 'Closed',
      Sunday: 'Closed',
    },
  },
  {
    id: 2,
    building: 'Library Complex',
    floor: 'Ground Floor',
    department: 'Library Services',
    schedule: {
        Monday: '08:00 - 18:00',
        Tuesday: '08:00 - 18:00',
        Wednesday: '08:00 - 18:00',
        Thursday: '08:00 - 18:00',
        Friday: '08:00 - 18:00',
        Saturday: '10:00 - 16:00',
        Sunday: 'Closed',
      },
  },
  {
    id: 3,
    building: 'Engineering Block B',
    floor: '3rd Floor',
    department: 'IT Support Helpdesk',
    schedule: {
        Monday: '08:30 - 17:30',
        Tuesday: '08:30 - 17:30',
        Wednesday: '08:30 - 17:30',
        Thursday: '08:30 - 17:30',
        Friday: '08:30 - 17:30',
        Saturday: 'Closed',
        Sunday: 'Closed',
      },
  },
];

const WorkLocations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = mockLocations.filter(loc => 
    loc.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Work Locations & Schedules</h1>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by building or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredLocations.length > 0 ? filteredLocations.map(location => (
          <div key={location.id} className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-purple-500">
            <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                        <Building className="h-6 w-6 text-purple-600 mr-3" />
                        <p className="font-bold text-lg text-gray-800">{location.building}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 ml-9">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{location.floor}, {location.department}</span>
                    </div>
                </div>
                <div className="flex-shrink-0 md:text-right w-full md:w-auto">
                    <p className="font-semibold text-gray-700 mb-2 flex items-center justify-start md:justify-end"><Clock className="h-5 w-5 mr-2"/>Weekly Schedule</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-1 text-sm text-gray-600">
                    {Object.entries(location.schedule).map(([day, time]) => (
                        <div key={day} className="flex justify-between">
                            <span className="font-medium">{day.substring(0,3)}:</span>
                            <span>{time}</span>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
          </div>
        )) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600">No locations match your search.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default WorkLocations;
