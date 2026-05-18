import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User as UserIcon, Activity } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-slate-200 px-4 py-4 sm:px-6 lg:px-8 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-blue-600 rounded-lg p-2 mr-3 shadow-md">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            Perform<span className="text-blue-600">Sync</span>
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <UserIcon className="h-4 w-4 mr-2 text-blue-500" />
            <span className="text-sm font-medium">{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-1.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
