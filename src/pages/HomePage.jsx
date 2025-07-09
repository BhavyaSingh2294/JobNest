import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign, Clock, Users, Star, TrendingUp, Award, Briefcase } from 'lucide-react';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();

  const featuredJobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      type: 'Full-time',
      logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      featured: true
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'InnovateHub',
      location: 'New York, NY',
      salary: '$100k - $140k',
      type: 'Full-time',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      urgent: true
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      company: 'DesignStudio Pro',
      location: 'Austin, TX',
      salary: '$70k - $95k',
      type: 'Full-time',
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedLocation) params.set('location', selectedLocation);
    navigate(`/jobs?${params.toString()}`);
  };

  const stats = [
    { label: 'Active Jobs', value: '2,847', icon: Briefcase, color: 'text-blue-600' },
    { label: 'Companies', value: '892', icon: Users, color: 'text-emerald-600' },
    { label: 'Success Rate', value: '94%', icon: Award, color: 'text-purple-600' },
    { label: 'Avg Salary', value: '$95k', icon: TrendingUp, color: 'text-orange-600' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find Your Dream Job with
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"> JobNest</span>
          </h1>
          <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto">
            Connect with top employers and discover opportunities that match your skills and aspirations. 
            Join thousands of professionals who found their perfect career match.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl p-8 shadow-2xl max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="City, state, or remote"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg"
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 text-lg"
              >
                <Search className="w-5 h-5" />
                <span>Search Jobs</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="text-gray-600 font-medium">Popular searches:</span>
              {['Frontend Developer', 'Product Manager', 'Data Scientist', 'UX Designer', 'DevOps Engineer'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
                >
                  {term}
                </button>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover hand-picked job opportunities from top companies looking for talented professionals like you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                  </div>
                  {job.featured && (
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                  {job.urgent && (
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      Urgent
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                </div>
                
                <Link 
                  to={`/jobs/${job.id}`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center block"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              to="/jobs"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              <span>View All Jobs</span>
              <Search className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/companies" className="group">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <Users className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Explore Companies</h3>
                <p className="text-blue-100 mb-4">
                  Discover amazing companies, their culture, benefits, and open positions.
                </p>
                <span className="text-yellow-300 font-semibold">Browse Companies →</span>
              </div>
            </Link>
            
            <Link to="/salary-guide" className="group">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <DollarSign className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Salary Insights</h3>
                <p className="text-emerald-100 mb-4">
                  Get detailed salary information and market trends for your role.
                </p>
                <span className="text-yellow-300 font-semibold">View Salaries →</span>
              </div>
            </Link>
            
            <Link to="/career-advice" className="group">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <Star className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Career Advice</h3>
                <p className="text-orange-100 mb-4">
                  Expert tips on resume writing, interviews, and career growth.
                </p>
                <span className="text-yellow-300 font-semibold">Get Advice →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;