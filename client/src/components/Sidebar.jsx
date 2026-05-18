import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, BarChart3, BrainCircuit } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5 mr-3" /> },
    { name: 'Employees', path: '/employees', icon: <Users className="w-5 h-5 mr-3" /> },
    { name: 'Add Employee', path: '/add-employee', icon: <UserPlus className="w-5 h-5 mr-3" /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 className="w-5 h-5 mr-3" /> },
    { name: 'AI Rank & Insights', path: '/ai-insights', icon: <BrainCircuit className="w-5 h-5 mr-3" /> },
  ];

  return (
    <aside className="bg-white w-64 min-h-screen border-r border-slate-200 flex-shrink-0 hidden md:block z-10 relative">
      <div className="py-8 px-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6 px-4">Main Menu</p>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                }`
              }
            >
              <span className={`${item.isActive ? '' : 'transition-colors duration-200'}`}>
                {item.icon}
              </span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
