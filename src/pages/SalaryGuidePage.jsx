import React, { useState } from 'react';
import { Search, DollarSign, TrendingUp, BarChart3, MapPin, Briefcase, Award, Users } from 'lucide-react';

const SalaryGuidePage = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorData, setCalculatorData] = useState({
    role: '',
    experience: '',
    location: '',
    skills: '',
    education: ''
  });
  const [calculatorResult, setCalculatorResult] = useState(null);

  // Dropdown options
  const jobRoles = [
    'Software Engineer',
    'Product Manager', 
    'Data Scientist',
    'UX/UI Designer',
    'DevOps Engineer',
    'Marketing Manager',
    'Sales Manager',
    'Business Analyst',
    'Project Manager',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Mobile Developer',
    'QA Engineer',
    'Cybersecurity Analyst',
    'Cloud Architect',
    'Machine Learning Engineer',
    'Digital Marketing Specialist',
    'Content Writer',
    'HR Manager'
  ];

  const locations = [
    'Mumbai, Maharashtra',
    'Bangalore, Karnataka', 
    'Delhi, NCR',
    'Hyderabad, Telangana',
    'Chennai, Tamil Nadu',
    'Pune, Maharashtra',
    'Kolkata, West Bengal',
    'Ahmedabad, Gujarat',
    'Jaipur, Rajasthan',
    'Surat, Gujarat',
    'Lucknow, Uttar Pradesh',
    'Kanpur, Uttar Pradesh',
    'Nagpur, Maharashtra',
    'Indore, Madhya Pradesh',
    'Thane, Maharashtra',
    'Bhopal, Madhya Pradesh',
    'Visakhapatnam, Andhra Pradesh',
    'Pimpri-Chinchwad, Maharashtra',
    'Patna, Bihar',
    'Vadodara, Gujarat',
    'Ghaziabad, Uttar Pradesh',
    'Ludhiana, Punjab',
    'Agra, Uttar Pradesh',
    'Nashik, Maharashtra',
    'Faridabad, Haryana',
    'Meerut, Uttar Pradesh',
    'Rajkot, Gujarat',
    'Kalyan-Dombivali, Maharashtra',
    'Vasai-Virar, Maharashtra',
    'Varanasi, Uttar Pradesh',
    'Remote'
  ];

  const skillsOptions = [
    'JavaScript, React, Node.js',
    'Python, Django, Flask',
    'Java, Spring Boot, Hibernate',
    'C#, .NET, ASP.NET',
    'PHP, Laravel, CodeIgniter',
    'Ruby, Ruby on Rails',
    'Go, Gin, Echo',
    'Rust, Actix, Rocket',
    'Swift, iOS Development',
    'Kotlin, Android Development',
    'Flutter, Dart',
    'React Native',
    'Angular, TypeScript',
    'Vue.js, Nuxt.js',
    'HTML, CSS, SASS',
    'Bootstrap, Tailwind CSS',
    'MySQL, PostgreSQL',
    'MongoDB, NoSQL',
    'Redis, Elasticsearch',
    'AWS, Azure, GCP',
    'Docker, Kubernetes',
    'Jenkins, CI/CD',
    'Git, GitHub, GitLab',
    'Figma, Adobe XD',
    'Photoshop, Illustrator',
    'Machine Learning, TensorFlow',
    'Data Analysis, Pandas',
    'Power BI, Tableau',
    'SEO, SEM, Google Analytics',
    'Social Media Marketing'
  ];

  const salaryData = [
    {
      role: 'Software Engineer',
      location: 'San Francisco, CA',
      experience: 'Entry Level',
      salary: { min: 7885000, max: 10790000, median: 9296000 },
      growth: 8.5,
      demand: 'High',
      skills: ['JavaScript', 'React', 'Node.js', 'Python']
    },
    {
      role: 'Software Engineer',
      location: 'San Francisco, CA',
      experience: 'Mid Level',
      salary: { min: 10790000, max: 14940000, median: 12865000 },
      growth: 12.3,
      demand: 'Very High',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'System Design']
    },
    {
      role: 'Software Engineer',
      location: 'San Francisco, CA',
      experience: 'Senior Level',
      salary: { min: 14940000, max: 20750000, median: 17845000 },
      growth: 15.7,
      demand: 'Very High',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'System Design', 'Leadership']
    },
    {
      role: 'Product Manager',
      location: 'New York, NY',
      experience: 'Entry Level',
      salary: { min: 7055000, max: 9545000, median: 8300000 },
      growth: 6.8,
      demand: 'High',
      skills: ['Product Strategy', 'Analytics', 'Agile', 'User Research']
    },
    {
      role: 'Product Manager',
      location: 'New York, NY',
      experience: 'Mid Level',
      salary: { min: 9545000, max: 13280000, median: 11371000 },
      growth: 10.2,
      demand: 'High',
      skills: ['Product Strategy', 'Analytics', 'Agile', 'User Research', 'Roadmapping']
    },
    {
      role: 'Product Manager',
      location: 'New York, NY',
      experience: 'Senior Level',
      salary: { min: 13280000, max: 18260000, median: 15770000 },
      growth: 13.5,
      demand: 'High',
      skills: ['Product Strategy', 'Analytics', 'Agile', 'User Research', 'Roadmapping', 'Team Leadership']
    },
    {
      role: 'Data Scientist',
      location: 'Boston, MA',
      experience: 'Entry Level',
      salary: { min: 6225000, max: 8715000, median: 7470000 },
      growth: 7.2,
      demand: 'High',
      skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics']
    },
    {
      role: 'Data Scientist',
      location: 'Boston, MA',
      experience: 'Mid Level',
      salary: { min: 8715000, max: 12035000, median: 10375000 },
      growth: 11.8,
      demand: 'Very High',
      skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Deep Learning']
    },
    {
      role: 'UX Designer',
      location: 'Austin, TX',
      experience: 'Entry Level',
      salary: { min: 4565000, max: 6225000, median: 5395000 },
      growth: 5.5,
      demand: 'Medium',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems']
    },
    {
      role: 'UX Designer',
      location: 'Austin, TX',
      experience: 'Mid Level',
      salary: { min: 6225000, max: 8715000, median: 7470000 },
      growth: 8.9,
      demand: 'High',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Interaction Design']
    },
    {
      role: 'DevOps Engineer',
      location: 'Seattle, WA',
      experience: 'Mid Level',
      salary: { min: 9130000, max: 12450000, median: 10790000 },
      growth: 14.2,
      demand: 'Very High',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code']
    },
    {
      role: 'DevOps Engineer',
      location: 'Seattle, WA',
      experience: 'Senior Level',
      salary: { min: 12450000, max: 16600000, median: 14525000 },
      growth: 18.5,
      demand: 'Very High',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code', 'Security']
    }
  ];

  const topPayingRoles = [
    { role: 'Staff Software Engineer', salary: 23655000, growth: 22.1 },
    { role: 'Principal Product Manager', salary: 21995000, growth: 18.7 },
    { role: 'Senior Data Scientist', salary: 16185000, growth: 16.3 },
    { role: 'Senior DevOps Engineer', salary: 14525000, growth: 18.5 },
    { role: 'Senior UX Designer', salary: 11205000, growth: 12.4 }
  ];

  const salaryTrends = [
    { year: '2020', avgSalary: 7885000 },
    { year: '2021', avgSalary: 8466000 },
    { year: '2022', avgSalary: 9545000 },
    { year: '2023', avgSalary: 10624000 },
    { year: '2024', avgSalary: 11786000 }
  ];

  const filteredSalaryData = salaryData.filter(item => {
    const matchesRole = selectedRole === '' || item.role.toLowerCase().includes(selectedRole.toLowerCase());
    const matchesLocation = selectedLocation === '' || item.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesExperience = selectedExperience === '' || item.experience === selectedExperience;
    
    return matchesRole && matchesLocation && matchesExperience;
  });

  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', 
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const SalaryCalculator = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Salary Calculator</h2>
            <button 
              onClick={() => setShowCalculator(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">Get personalized salary estimates based on your profile</p>
        </div>
        
        {calculatorResult ? (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Salary Estimate</h3>
              <p className="text-gray-600">Based on your profile and market data</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {formatSalary(calculatorResult.min)} - {formatSalary(calculatorResult.max)}
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  Median: <span className="font-semibold text-blue-600">{formatSalary(calculatorResult.median)}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{formatSalary(calculatorResult.min)}</div>
                    <div className="text-gray-600">25th percentile</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{formatSalary(calculatorResult.median)}</div>
                    <div className="text-gray-600">Median</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{formatSalary(calculatorResult.max)}</div>
                    <div className="text-gray-600">75th percentile</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Role</span>
                <span className="font-medium text-gray-900">{calculatorData.role}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Experience</span>
                <span className="font-medium text-gray-900">{calculatorData.experience}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Location</span>
                <span className="font-medium text-gray-900">{calculatorData.location}</span>
              </div>
              {calculatorData.education && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Education</span>
                  <span className="font-medium text-gray-900">{calculatorData.education}</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  setCalculatorResult(null);
                  setCalculatorData({
                    role: '',
                    experience: '',
                    location: '',
                    skills: '',
                    education: ''
                  });
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Calculate Again
              </button>
              <button 
                onClick={() => setShowCalculator(false)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Role *</label>
              <select
                value={calculatorData.role}
                onChange={(e) => setCalculatorData({...calculatorData, role: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Job Role</option>
                {jobRoles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
                <select
                  value={calculatorData.experience}
                  onChange={(e) => setCalculatorData({...calculatorData, experience: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Level</option>
                  <option value="Entry Level">Entry Level (0-2 years)</option>
                  <option value="Mid Level">Mid Level (3-5 years)</option>
                  <option value="Senior Level">Senior Level (6+ years)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <select
                  value={calculatorData.location}
                  onChange={(e) => setCalculatorData({...calculatorData, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Skills</label>
              <select
                value={calculatorData.skills}
                onChange={(e) => setCalculatorData({...calculatorData, skills: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Key Skills</option>
                {skillsOptions.map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
              <select
                value={calculatorData.education}
                onChange={(e) => setCalculatorData({...calculatorData, education: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Education</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's Degree</option>
                <option value="Master's">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowCalculator(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (calculatorData.role && calculatorData.experience && calculatorData.location) {
                    // Calculate salary based on inputs
                    let baseMin = 60000;
                    let baseMax = 120000;
                    
                    // Adjust based on experience
                    if (calculatorData.experience === 'Entry Level') {
                      baseMin = 4980000;
                      baseMax = 7470000;
                    } else if (calculatorData.experience === 'Mid Level') {
                      baseMin = 6640000;
                      baseMax = 10790000;
                    } else if (calculatorData.experience === 'Senior Level') {
                      baseMin = 9960000;
                      baseMax = 16600000;
                    }
                    
                    // Adjust based on location
                    if (calculatorData.location.toLowerCase().includes('san francisco') || 
                        calculatorData.location.toLowerCase().includes('new york')) {
                      baseMin *= 1.4;
                      baseMax *= 1.4;
                    } else if (calculatorData.location.toLowerCase().includes('seattle') || 
                               calculatorData.location.toLowerCase().includes('boston')) {
                      baseMin *= 1.2;
                      baseMax *= 1.2;
                    }
                    
                    // Adjust based on education
                    if (calculatorData.education === 'Master\'s') {
                      baseMin *= 1.1;
                      baseMax *= 1.1;
                    } else if (calculatorData.education === 'PhD') {
                      baseMin *= 1.2;
                      baseMax *= 1.2;
                    }
                    
                    const median = Math.round((baseMin + baseMax) / 2);
                    
                    setCalculatorResult({
                      min: Math.round(baseMin),
                      max: Math.round(baseMax),
                      median: median
                    });
                  } else {
                    alert('Please fill in all required fields (Role, Experience, Location)');
                  }
                }}
                disabled={!calculatorData.role || !calculatorData.experience || !calculatorData.location}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Calculate Salary
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'Very High': return 'text-emerald-600 bg-emerald-50';
      case 'High': return 'text-blue-600 bg-blue-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Salary Guide & Market Insights
            </h1>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Get comprehensive salary data, market trends, and compensation insights to make informed career decisions.
            </p>
            
            {/* Search Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Role</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="e.g. Software Engineer"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="City, State"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">All Levels</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior Level">Senior Level</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Market Overview</h2>
            <p className="text-gray-600">Current salary trends and market insights</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <span className="text-4xl text-blue-600 mx-auto mb-4 block">₹</span>
              <div className="text-2xl font-bold text-gray-900">₹1.18Cr</div>
              <div className="text-sm text-gray-600">Average Tech Salary</div>
              <div className="text-xs text-emerald-600 mt-1">↑ 11% from last year</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
              <TrendingUp className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900">12.5%</div>
              <div className="text-sm text-gray-600">Average Growth Rate</div>
              <div className="text-xs text-emerald-600 mt-1">Year over year</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <div className="text-sm text-gray-600">Active Job Openings</div>
              <div className="text-xs text-emerald-600 mt-1">↑ 156 this week</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900">892</div>
              <div className="text-sm text-gray-600">Hiring Companies</div>
              <div className="text-xs text-emerald-600 mt-1">Active recruiters</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Salary Data */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Salary Data ({filteredSalaryData.length} results)
              </h3>
              
              <div className="space-y-4">
                {filteredSalaryData.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{item.role}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{item.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{item.experience}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatSalary(item.salary.median)}
                        </div>
                        <div className="text-sm text-gray-600">median</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">Min</div>
                        <div className="font-semibold text-gray-900">{formatSalary(item.salary.min)}</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm text-gray-600">Median</div>
                        <div className="font-semibold text-blue-600">{formatSalary(item.salary.median)}</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">Max</div>
                        <div className="font-semibold text-gray-900">{formatSalary(item.salary.max)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm text-emerald-600 font-medium">+{item.growth}% growth</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDemandColor(item.demand)}`}>
                          {item.demand} Demand
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm text-gray-600 mb-2">Key Skills:</div>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredSalaryData.length === 0 && (
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No salary data found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria to see more results.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Paying Roles */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Paying Roles</h3>
              <div className="space-y-4">
                {topPayingRoles.map((role, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{role.role}</div>
                      <div className="text-sm text-emerald-600">+{role.growth}% growth</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{formatSalary(role.salary)}</div>
                      <div className="text-xs text-gray-600">median</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Salary Trends */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Trends</h3>
              <div className="space-y-3">
                {salaryTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{trend.year}</span>
                    <span className="font-semibold text-gray-900">{formatSalary(trend.avgSalary)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                <div className="text-sm text-emerald-800">
                  <strong>5-Year Growth:</strong> 49.5% increase in average tech salaries
                </div>
              </div>
            </div>
            
            {/* Salary Calculator CTA */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">Salary Calculator</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Get personalized salary estimates based on your specific skills and experience.
              </p>
              <button 
                onClick={() => setShowCalculator(true)}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors w-full"
              >
                Calculate My Worth
              </button>
            </div>
            
            {/* Market Report */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Report</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-700">Remote work increased salaries by 15%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">AI/ML roles show highest growth</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Tech hubs expanding beyond SF/NYC</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Skills-based hiring on the rise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Calculator Modal */}
      {showCalculator && <SalaryCalculator />}
    </div>
  );
};

export default SalaryGuidePage;