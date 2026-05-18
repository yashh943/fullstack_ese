import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Users, TrendingUp, Award, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    avgPerformance: 0,
    topPerformer: null,
    departments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await api.get('/employees');
        
        if (data.length > 0) {
          const totalEmployees = data.length;
          const avgPerformance = data.reduce((acc, emp) => acc + emp.performanceScore, 0) / totalEmployees;
          const topPerformer = data.reduce((prev, current) => (prev.performanceScore > current.performanceScore) ? prev : current);
          const departments = new Set(data.map(emp => emp.department)).size;

          setStats({
            totalEmployees,
            avgPerformance: avgPerformance.toFixed(1),
            topPerformer,
            departments,
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  const statCards = [
    { title: 'Total Employees', value: stats.totalEmployees, icon: <Users className="h-8 w-8 text-blue-500" />, color: 'bg-blue-50' },
    { title: 'Avg Performance', value: `${stats.avgPerformance}/100`, icon: <TrendingUp className="h-8 w-8 text-green-500" />, color: 'bg-green-50' },
    { title: 'Departments', value: stats.departments, icon: <BarChart2 className="h-8 w-8 text-purple-500" />, color: 'bg-purple-50' },
    { title: 'Top Performer', value: stats.topPerformer ? stats.topPerformer.name : 'N/A', icon: <Award className="h-8 w-8 text-yellow-500" />, color: 'bg-yellow-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <Link to="/add-employee" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Add Employee
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/employees" className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all flex items-center space-x-3 group">
            <div className="bg-gray-50 p-2 rounded-md group-hover:bg-indigo-50 group-hover:text-indigo-600 text-gray-500">
              <Users className="h-5 w-5" />
            </div>
            <span className="font-medium text-gray-700 group-hover:text-indigo-600">View All Employees</span>
          </Link>
          <Link to="/ai-insights" className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all flex items-center space-x-3 group">
            <div className="bg-gray-50 p-2 rounded-md group-hover:bg-indigo-50 group-hover:text-indigo-600 text-gray-500">
              <Award className="h-5 w-5" />
            </div>
            <span className="font-medium text-gray-700 group-hover:text-indigo-600">Get AI Rankings</span>
          </Link>
          <Link to="/analytics" className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all flex items-center space-x-3 group">
            <div className="bg-gray-50 p-2 rounded-md group-hover:bg-indigo-50 group-hover:text-indigo-600 text-gray-500">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="font-medium text-gray-700 group-hover:text-indigo-600">View Analytics Charts</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
