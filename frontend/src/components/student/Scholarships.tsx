import React, { useState, useEffect } from 'react';
import { DollarSign, Calendar, Award, Filter, Search } from 'lucide-react';

interface Scholarship {
  id: number;
  title: string;
  description: string;
  eligibility: string;
  amount: number;
  deadline: string;
}

const Scholarships: React.FC = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost/php/api/scholarships.php');
      if (response.ok) {
        const data = await response.json();
        setScholarships(data);
      }
    } catch (error) {
      console.error("Failed to fetch scholarships:", error);
    }
    setLoading(false);
  };

  const filteredScholarships = scholarships
    .filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(s => {
      if (filter === 'undergraduate') return s.eligibility.toLowerCase().includes('undergraduate');
      if (filter === 'graduate') return s.eligibility.toLowerCase().includes('graduate');
      return true;
    });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Scholarships & Financial Aid</h1>
          <p className="mt-2 text-lg text-gray-600">Explore opportunities to fund your education.</p>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select 
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Levels</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p>Loading scholarships...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map(scholarship => (
              <div key={scholarship.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <Award className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{scholarship.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-4">{scholarship.description}</p>
                  <div className="text-sm text-gray-500 space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Amount: <span className="font-semibold">${scholarship.amount.toLocaleString()}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: <span className="font-semibold">{new Date(scholarship.deadline).toLocaleDateString()}</span></span>
                    </div>
                  </div>
                </div>
                <button className="mt-6 w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  View & Apply
                </button>
              </div>
            ))}
          </div>
        )}

        {filteredScholarships.length === 0 && !loading && (
            <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-200">
              <Award className="h-16 w-16 mx-auto text-gray-300" />
              <h2 className="mt-4 text-xl font-semibold text-gray-700">No Matching Scholarships Found</h2>
              <p className="mt-1 text-gray-500">Try adjusting your search or filters.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Scholarships;
