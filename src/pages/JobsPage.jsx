import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign, Clock, Filter, Briefcase, Building2, Star } from 'lucide-react';

const JobsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get search params from URL
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  const initialLocation = searchParams.get('location') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedType, setSelectedType] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  const jobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      type: 'Full-time',
      experience: 'Senior',
      posted: '2 days ago',
      description: 'Join our innovative team to build cutting-edge web applications using React, TypeScript, and modern frontend technologies.',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'Modern CSS frameworks'],
      logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      featured: true,
      urgent: false,
      remote: false
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'InnovateHub',
      location: 'New York, NY',
      salary: '$100k - $140k',
      type: 'Full-time',
      experience: 'Mid',
      posted: '1 day ago',
      description: 'Lead product strategy and development for our flagship SaaS platform used by thousands of businesses worldwide.',
      requirements: ['3+ years product management', 'Agile methodologies', 'Data analysis'],
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      featured: true,
      urgent: true,
      remote: false
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      company: 'DesignStudio Pro',
      location: 'Austin, TX',
      salary: '$70k - $95k',
      type: 'Full-time',
      experience: 'Mid',
      posted: '3 days ago',
      description: 'Create beautiful, intuitive user experiences for web and mobile applications in a collaborative environment.',
      requirements: ['Portfolio required', 'Figma expertise', 'Design systems'],
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      featured: false,
      urgent: false,
      remote: true
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      company: 'CloudTech Systems',
      location: 'Remote',
      salary: '$110k - $150k',
      type: 'Full-time',
      experience: 'Senior',
      posted: '4 days ago',
      description: 'Build and maintain scalable cloud infrastructure supporting millions of users across our platform ecosystem.',
      requirements: ['AWS/Azure experience', 'Kubernetes', 'CI/CD pipelines'],
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      featured: false,
      urgent: false,
      remote: true
    },
    {
      id: '5',
      title: 'Data Scientist',
      company: 'Analytics Plus',
      location: 'Boston, MA',
      salary: '$90k - $130k',
      type: 'Full-time',
      experience: 'Mid',
      posted: '1 week ago',
      description: 'Extract insights from complex datasets to drive business decisions and build predictive models.',
      requirements: ['Python/R expertise', 'Machine learning', 'Statistical analysis'],
      logo: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      featured: false,
      urgent: false,
      remote: false
    },
    {
      id: '6',
      title: 'Marketing Manager',
      company: 'GrowthLab Agency',
      location: 'Chicago, IL',
      salary: '$65k - $85k',
      type: 'Full-time',
      experience: 'Mid',
      posted: '5 days ago',
      description: 'Lead marketing campaigns and brand strategy for exciting B2B and B2C clients across diverse industries.',
      requirements: ['Digital marketing', 'Campaign management', 'Analytics tools'],
      logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      featured: false,
      urgent: false,
      remote: false
    },
    {
      id: '7',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Seattle, WA',
      salary: '$85k - $115k',
      type: 'Full-time',
      experience: 'Mid',
      posted: '6 days ago',
      description: 'Join our fast-growing startup to build scalable web applications using modern technologies.',
      requirements: ['Node.js', 'React', 'Database design'],
      logo: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      featured: false,
      urgent: false,
      remote: true
    },
    {
      id: '8',
      title: 'Junior Software Engineer',
      company: 'TechStart Inc',
      location: 'Austin, TX',
      salary: '$60k - $80k',
      type: 'Full-time',
      experience: 'Entry',
      posted: '1 week ago',
      description: 'Perfect opportunity for new graduates to start their career in software development.',
      requirements: ['Computer Science degree', 'Programming fundamentals', 'Eagerness to learn'],
      logo: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      featured: false,
      urgent: false,
      remote: false
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocation === '' || 
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    const matchesType = selectedType === '' || job.type === selectedType;
    const matchesExperience = selectedExperience === '' || job.experience === selectedExperience;
    
    return matchesSearch && matchesLocation && matchesType && matchesExperience;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.posted) - new Date(a.posted);
      case 'salary-high':
        return parseInt(b.salary.split('$')[1]) - parseInt(a.salary.split('$')[1]);
      case 'salary-low':
        return parseInt(a.salary.split('$')[1]) - parseInt(b.salary.split('$')[1]);
      case 'company':
        return a.company.localeCompare(b.company);
      default:
        return 0;
    }
  });

  const toggleBookmark = (jobId) => {
    const newBookmarked = new Set(bookmarkedJobs);
    if (newBookmarked.has(jobId)) {
      newBookmarked.delete(jobId);
    } else {
      newBookmarked.add(jobId);
    }
    setBookmarkedJobs(newBookmarked);
  };

  const applyToJob = (jobId) => {
    setAppliedJobs(new Set([...appliedJobs, jobId]));
    alert('Application submitted successfully!');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedLocation) params.set('location', selectedLocation);
    if (selectedType) params.set('type', selectedType);
    if (selectedExperience) params.set('experience', selectedExperience);
    navigate(`/jobs?${params.toString()}`);
  };

  const JobCard = ({ job }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img src={job.logo} alt={job.company} className="w-14 h-14 rounded-lg object-cover" />
          <div>
            <Link 
              to={`/jobs/${job.id}`}
              className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {job.title}
            </Link>
            <Link 
              to={`/companies/${job.id}`}
              className="text-gray-600 font-medium hover:text-blue-600 transition-colors"
            >
              {job.company}
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          {job.featured && (
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
          {job.urgent && (
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium animate-pulse">
              Urgent
            </span>
          )}
          {job.remote && (
            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
              Remote OK
            </span>
          )}
          {appliedJobs.has(job.id) && (
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
              Applied
            </span>
          )}
        </div>
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
        <div className="flex items-center space-x-1">
          <Briefcase className="w-4 h-4" />
          <span>{job.experience} Level</span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {job.requirements.slice(0, 3).map((req, index) => (
          <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
            {req}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{job.posted}</span>
        <div className="flex space-x-2">
          <button 
            onClick={() => toggleBookmark(job.id)}
            className={`transition-colors ${
              bookmarkedJobs.has(job.id) 
                ? 'text-red-500' 
                : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Star className={`w-5 h-5 ${bookmarkedJobs.has(job.id) ? 'fill-current' : ''}`} />
          </button>
          {appliedJobs.has(job.id) ? (
            <Link 
              to={`/jobs/${job.id}`}
              className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg font-medium"
            >
              View Application
            </Link>
          ) : (
            <button 
              onClick={() => applyToJob(job.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Quick Apply
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Job</h1>
          <p className="text-gray-600 mb-6">Discover opportunities that match your skills and career goals</p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="bg-gray-50 rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
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
                    placeholder="City, state, or remote"
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
            
            {/* Popular Searches */}
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
      </div>

      {/* Filters and Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">{sortedJobs.length} jobs found</span>
            {bookmarkedJobs.size > 0 && (
              <span className="text-sm text-gray-600">
                {bookmarkedJobs.size} bookmarked
              </span>
            )}
            {appliedJobs.size > 0 && (
              <span className="text-sm text-green-600">
                {appliedJobs.size} applied
              </span>
            )}
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
            <option value="recent">Most Recent</option>
            <option value="salary-high">Salary: High to Low</option>
            <option value="salary-low">Salary: Low to High</option>
            <option value="company">Company A-Z</option>
          </select>
        </div>
        
        {showFilters && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select 
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Levels</option>
                  <option value="Entry">Entry Level</option>
                  <option value="Mid">Mid Level</option>
                  <option value="Senior">Senior Level</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <select
                  value={selectedSalary}
                  onChange={(e) => setSelectedSalary(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Salary</option>
                  <option value="0-50k">$0 - $50k</option>
                  <option value="50k-100k">$50k - $100k</option>
                  <option value="100k-150k">$100k - $150k</option>
                  <option value="150k+">$150k+</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button 
                  onClick={() => {
                    setSelectedType('');
                    setSelectedExperience('');
                    setSelectedSalary('');
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

        {/* Job Listings */}
        <div className="grid grid-cols-1 gap-6">
          {sortedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
          
          {sortedJobs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No jobs found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters to find more opportunities.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLocation('');
                  setSelectedType('');
                  setSelectedExperience('');
                  setSelectedSalary('');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Load More */}
        {sortedJobs.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-medium transition-colors">
              Load More Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;