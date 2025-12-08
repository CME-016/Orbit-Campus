
import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, CheckCircle, Plus } from 'lucide-react';

interface PTMRecord {
    id: number;
    teacher_name: string;
    subject: string;
    date: string;
    time_slot: string;
    mode: 'Online' | 'In-Person';
    status: 'Available' | 'Booked';
}

const PTMSchedule: React.FC = () => {
  // Mock data for the schedule
  const [slots, setSlots] = useState<PTMRecord[]>([
    { id: 1, teacher_name: 'Mr. Davis', subject: 'Mathematics', date: '2024-05-20', time_slot: '10:00 - 10:15', mode: 'Online', status: 'Available' },
    { id: 2, teacher_name: 'Ms. Garcia', subject: 'History', date: '2024-05-20', time_slot: '10:30 - 10:45', mode: 'In-Person', status: 'Available' },
    { id: 3, teacher_name: 'Mr. Davis', subject: 'Mathematics', date: '2024-05-21', time_slot: '11:00 - 11:15', mode: 'Online', status: 'Booked' },
  ]);

  const handleBooking = (id: number) => {
    alert('This is a demo. Booking functionality is not live yet.');
    // To simulate booking in mock data:
    setSlots(prevSlots => 
        prevSlots.map(slot => 
            slot.id === id ? { ...slot, status: 'Booked' } : slot
        )
    );
  };

  const bookedSlots = slots.filter(s => s.status === 'Booked');
  const availableSlots = slots.filter(s => s.status === 'Available');

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Parent-Teacher Meetings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center"><CheckCircle className="mr-3 text-green-500"/>My Booked Slots</h2>
          {bookedSlots.length > 0 ? (
            <div className="space-y-4">
              {bookedSlots.map(slot => (
                <div key={slot.id} className="p-4 border rounded-lg bg-green-50 border-green-200">
                  <p className="font-bold text-gray-800">{slot.subject} with {slot.teacher_name}</p>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <Calendar className="h-4 w-4 mr-2"/> {slot.date}
                    <Clock className="h-4 w-4 ml-4 mr-2"/> {slot.time_slot}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    {slot.mode === 'Online' ? <Video className="h-4 w-4 mr-2"/> : <Users className="h-4 w-4 mr-2"/>}
                    <span>{slot.mode}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You have no upcoming meetings.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center"><Plus className="mr-3 text-blue-500"/>Book a New Slot</h2>
          {availableSlots.length > 0 ? (
            <div className="space-y-4">
               {availableSlots.map(slot => (
                <div key={slot.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div>
                      <p className="font-bold text-gray-800">{slot.subject} with {slot.teacher_name}</p>
                      <div className="flex items-center text-sm text-gray-600 mt-2">
                        <Calendar className="h-4 w-4 mr-2"/> {slot.date}
                        <Clock className="h-4 w-4 ml-4 mr-2"/> {slot.time_slot}
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-0">
                        <button 
                            onClick={() => handleBooking(slot.id)}
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                        >
                            Book Now
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
           ) : (
            <p className="text-gray-500">No more slots available for booking.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PTMSchedule;
