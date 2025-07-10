import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, Bell, User, Settings, LogOut, Menu, X, Search, Plus, Target, Crown } from 'lucide-react';
import AuthModal from './AuthModal';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New job match found', message: 'Senior Frontend Developer at TechCorp', time: '2 min ago', unread: true },
    { id: 2, title: 'Application viewed', message: 'Your application for Product Manager was viewed', time: '1 hour ago', unread: true },
    { id: 3, title: 'Interview scheduled', message: 'Interview with InnovateHub on Dec 15', time: '3 hours ago', unread: false }
  ]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  const clearAllNotifications = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setUserMenuOpen(false);
  };

  const handleQuickUpgrade = (planType) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    
    // Open Razorpay.me links based on plan type
    if (planType === 'jobseeker') {
      window.open('https://razorpay.me/@bharatbhushannathsharma?amount=01vVMe2nRmlnNjFkqNNI6w%3D%3D', '_blank');
    } else if (planType === 'employer') {
      window.open('https://razorpay.me/@bharatbhushannathsharma?amount=YZdaFwx2QK8VytVM0yRD2w%3D%3D', '_blank');
    }
  };

  // Check for stored user on component mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const navigation = [
    { name: 'Jobs', href: '/jobs' },
    { name: 'Companies', href: '/companies' },
    { name: 'Campaigns', href: '/campaigns' },
    { name: 'Salary Guide', href: '/salary-guide' },
    { name: 'Career Advice', href: '/career-advice' },
  ];

  const isActive = (path) => location.pathname === path;

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setUserMenuOpen(false);
        setNotificationOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(quickSearch.trim())}`);
      setSearchOpen(false);
      setQuickSearch('');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">JobNest</span>
              </Link>
              
              <nav className="hidden md:flex space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 border-b-2 border-blue-600 pb-4'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Post Job Button - Only for Employers */}
              {user && user.userType === 'employer' && (
                <Link
                  to="/post-job"
                  className="hidden md:flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Job</span>
                </Link>
              )}
              
              {/* Quick Upgrade for Free Users */}
              {user && !user.subscription?.status && (
                <button
                  onClick={() => handleQuickUpgrade(
                    user.userType === 'employer' ? 'employer' : 'jobseeker'
                  )}
                  className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Crown className="w-4 h-4" />
                  <span>Upgrade</span>
                </button>
              )}
              
              {/* Quick Search */}
              <div className="relative dropdown-container">
                <button 
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
                
                {searchOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <form onSubmit={handleQuickSearch} className="px-4 py-2">
                      <input
                        type="text"
                        placeholder="Quick search jobs, companies..."
                        value={quickSearch}
                        onChange={(e) => setQuickSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        autoFocus
                      />
                    </form>
                    <div className="px-4 py-2 text-xs text-gray-500">
                      Press Enter to search jobs or click below for quick access
                    </div>
                    <div className="border-t border-gray-100 py-2">
                      <Link to="/jobs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Browse All Jobs
                      </Link>
                      <Link to="/companies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Explore Companies
                      </Link>
                      <Link to="/salary-guide" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Salary Insights
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative dropdown-container">
                <button 
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="relative text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <button 
                          onClick={clearAllNotifications}
                          className="text-xs text-blue-600 hover:text-blue-700"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
                            notification.unread ? 'border-blue-500 bg-blue-50' : 'border-transparent'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 px-4 py-2">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {user ? (
                <div className="relative dropdown-container">
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.firstName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="hidden md:block font-medium">{user.firstName} {user.lastName}</span>
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                        <div className="text-xs text-gray-600">{user.email}</div>
                        <div className="text-xs text-blue-600 capitalize">{user.userType}</div>
                      </div>
                      <button 
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate('/profile');
                        }}
                        className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </div>
                      </button>
                      <button 
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate('/settings');
                        }}
                        className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </div>
                      </button>
                      <hr className="my-2" />
                      <button 
                        onClick={() => {
                          if (confirm('Are you sure you want to logout?')) {
                            handleLogout();
                          }
                        }}
                        className="w-full text-left block px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Sign In
                </button>
              )}
              
              <button 
                className="md:hidden" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">JobNest</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting talented professionals with amazing opportunities worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/jobs" className="hover:text-white transition-colors">Browse Jobs</Link></li>
                <li><Link to="/career-advice" className="hover:text-white transition-colors">Career Advice</Link></li>
                <li><Link to="/salary-guide" className="hover:text-white transition-colors">Salary Guide</Link></li>
                <Link to="/campaigns" className="hover:text-white transition-colors">Campaigns</Link>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Post a Job</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Find Candidates</a></li>
                <li><Link to="/companies" className="hover:text-white transition-colors">Company Directory</Link></li>
                <li><Link to="/campaigns" className="hover:text-white transition-colors">Launch Campaigns</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 JobNest. All rights reserved. Built with ❤️ for connecting talent with opportunity.</p>
          </div>
        </div>
      </footer>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Layout;