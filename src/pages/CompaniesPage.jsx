import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, MapPin, Users, Star, Building2, Award, TrendingUp, Filter } from 'lucide-react';
import { companiesData } from '../data/companiesData';

const CompaniesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get search params from URL
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  const initialLocation = searchParams.get('location') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [followedCompanies, setFollowedCompanies] = useState(new Set());

  const filteredCompanies = companiesData.filter(company => {
    const matchesSearch = searchTerm === '' || 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocation === '' || 
      company.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    const matchesSize = selectedSize === '' || company.size === selectedSize;
    const matchesIndustry = selectedIndustry === '' || company.industry === selectedIndustry;
    
    return matchesSearch && matchesLocation && matchesSize && matchesIndustry;
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'jobs':
        return b.openJobs - a.openJobs;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'size':
        return b.size.split('-')[1] - a.size.split('-')[1];
      default:
        return 0;
    }
  });

  const toggleFollow = (companyId) => {
    const newFollowed = new Set(followedCompanies);
    if (newFollowed.has(companyId)) {
      newFollowed.delete(companyId);
    } else {
      newFollowed.add(companyId);
    }
    setFollowedCompanies(newFollowed);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedLocation) params.set('location', selectedLocation);
    if (selectedIndustry) params.set('industry', selectedIndustry);
    if (selectedSize) params.set('size', selectedSize);
    navigate(`/companies?${params.toString()}`);
  };

  const CompanyCard = ({ company }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-xl object-cover" />
          <div>
            <Link 
              to={`/companies/${company.id}`}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {company.name}
            </Link>
            <p className="text-gray-600 font-medium">{company.industry}</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700">{company.rating}</span>
                <span className="text-sm text-gray-500">({company.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
        {company.featured && (
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            Featured
          </span>
        )}
        {followedCompanies.has(company.id) && (
          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
            Following
          </span>
        )}
      </div>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span>{company.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>{company.size} employees</span>
        </div>
        <div className="flex items-center space-x-1">
          <Building2 className="w-4 h-4" />
          <span>Founded {company.founded}</span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 line-clamp-2">{company.description}</p>
      
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Culture & Values</h4>
        <div className="flex flex-wrap gap-2">
          {company.culture.slice(0, 4).map((value, index) => (
            <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
              {value}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-green-600">{company.openJobs}</span> open positions
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => toggleFollow(company.id)}
            className={`transition-colors ${
              followedCompanies.has(company.id) 
                ? 'text-green-500' 
                : 'text-gray-400 hover:text-green-500'
            }`}
          >
            <Star className={`w-5 h-5 ${followedCompanies.has(company.id) ? 'fill-current' : ''}`} />
          </button>
          <Link 
            to={`/companies/${company.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            View Company
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Amazing Companies</h1>
          <p className="text-gray-600 mb-6">Explore company cultures, benefits, and career opportunities</p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="bg-gray-50 rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Company name or industry"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{companiesData.length}</div>
              <div className="text-sm text-gray-600">{companiesData.length} Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{companiesData.reduce((sum, company) => sum + company.openJobs, 0)}</div>
              <div className="text-sm text-gray-600">Open Positions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{(companiesData.reduce((sum, company) => sum + company.rating, 0) / companiesData.length).toFixed(1)}</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{companiesData.filter(c => c.featured).length}</div>
              <div className="text-sm text-gray-600">New This Week</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">{sortedCompanies.length} companies found</span>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 border border-gray-300 rounded-lg"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="rating">Highest Rated</option>
            <option value="jobs">Most Jobs</option>
            <option value="name">Company Name</option>
            <option value="size">Company Size</option>
          </select>
        </div>
        
        {showFilters && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Industries</option>
                  {[...new Set(companiesData.map(c => c.industry))].sort().map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                <select 
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Sizes</option>
                  <option value="1-50">1-50 employees</option>
                  <option value="50-200">50-200 employees</option>
                  <option value="200-500">200-500 employees</option>
                  <option value="500-1000">500-1000 employees</option>
                  <option value="1000-5000">1000-5000 employees</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button 
                  onClick={() => {
                    setSelectedIndustry('');
                    setSelectedSize('');
                    setSearchTerm('');
                    setSelectedLocation('');
                  }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Company Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
          
          {sortedCompanies.length === 0 && (
            <div className="col-span-2 text-center py-16">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No companies found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLocation('');
                  setSelectedIndustry('');
                  setSelectedSize('');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Load More */}
        {sortedCompanies.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-medium transition-colors">
              Load More Companies
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesPage;