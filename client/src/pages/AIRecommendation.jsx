import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { BrainCircuit, Sparkles, Users } from 'lucide-react';

const AIRecommendation = () => {
  const [searchParams] = useSearchParams();
  const initialEmployeeId = searchParams.get('employeeId') || '';
  
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(initialEmployeeId);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  
  const [recommendation, setRecommendation] = useState('');
  const [ranking, setRanking] = useState('');
  const [loading, setLoading] = useState(false);
  
  const departments = [...new Set(employees.map(emp => emp.department))];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await api.get('/employees');
        setEmployees(data);
        if (initialEmployeeId && !selectedEmployee) {
          setSelectedEmployee(initialEmployeeId);
        }
      } catch (error) {
        toast.error('Failed to load employees');
      }
    };
    fetchEmployees();
  }, [initialEmployeeId, selectedEmployee]);

  const handleGetRecommendation = async () => {
    if (!selectedEmployee) return toast.error('Please select an employee');
    
    setLoading(true);
    setRecommendation('');
    try {
      const { data } = await api.post('/ai/recommend', { employeeId: selectedEmployee });
      setRecommendation(data.recommendation);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to get recommendation');
    } finally {
      setLoading(false);
    }
  };

  const handleGetRanking = async () => {
    setLoading(true);
    setRanking('');
    try {
      const { data } = await api.post('/ai/rank', { department: selectedDepartment });
      setRanking(data.ranking);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to get ranking');
    } finally {
      setLoading(false);
    }
  };

  const formatMarkdown = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      if (line.startsWith('###')) return <h3 key={i} className="text-lg font-bold mt-4 mb-2">{line.replace('###', '')}</h3>;
      if (line.startsWith('##')) return <h2 key={i} className="text-xl font-bold mt-5 mb-2">{line.replace('##', '')}</h2>;
      if (line.startsWith('#')) return <h1 key={i} className="text-2xl font-bold mt-6 mb-3">{line.replace('#', '')}</h1>;
      if (line.startsWith('-') || line.startsWith('*')) return <li key={i} className="ml-4 mb-1 list-disc">{line.substring(1)}</li>;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="mb-2">{line}</p>;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <BrainCircuit className="h-6 w-6 text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">AI Intelligence Hub</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Individual Recommendation Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
            Individual Employee Analysis
          </h2>
          <p className="text-sm text-gray-500 mb-4">Select an employee to generate an AI-powered comprehensive performance review, promotion recommendation, and training suggestions.</p>
          
          <div className="flex space-x-2 mb-6">
            <select
              className="flex-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">Select Employee...</option>
              {employees.map(emp => (
                <option key={emp._id} value={emp._id}>{emp.name} ({emp.department})</option>
              ))}
            </select>
            <button
              onClick={handleGetRecommendation}
              disabled={loading || !selectedEmployee}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading && !ranking ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>

          {recommendation && (
            <div className="mt-4 p-6 bg-white rounded-xl border border-indigo-100 shadow-inner prose-custom overflow-y-auto max-h-[500px]">
              {formatMarkdown(recommendation)}
            </div>
          )}
        </div>

        {/* Department Ranking Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-500" />
            Team Ranking & Insights
          </h2>
          <p className="text-sm text-gray-500 mb-4">Analyze multiple employees to determine rankings, identify top performers, and discover team-wide skill gaps.</p>
          
          <div className="flex space-x-2 mb-6">
            <select
              className="flex-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <button
              onClick={handleGetRanking}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading && !recommendation ? 'Ranking...' : 'Generate Rank'}
            </button>
          </div>

          {ranking && (
            <div className="mt-4 p-6 bg-white rounded-xl border border-indigo-100 shadow-inner prose-custom overflow-y-auto max-h-[500px]">
              {formatMarkdown(ranking)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendation;
