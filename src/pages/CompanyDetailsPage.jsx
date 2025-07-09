import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Star, Building2, Globe, Calendar, Award, ArrowLeft, Briefcase, TrendingUp } from 'lucide-react';

const CompanyDetailsPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock company data - in a real app, this would come from an API
  const company = {
    id: '1',
    name: 'TechCorp Solutions',
    industry: 'Technology',
    location: 'San Francisco, CA',
    size: '1000-5000',
    rating: 4.8,
    reviews: 1247,
    founded: 2010,
    website: 'techcorp.com',
    description: `TechCorp Solutions is a leading technology company specializing in cloud solutions and enterprise software development. We're passionate about building innovative products that help businesses scale and succeed in the digital age.

Our mission is to democratize access to powerful technology tools, making them accessible to businesses of all sizes. We believe in the power of technology to transform industries and improve lives.

Founded in 2010, we've grown from a small startup to a global company with offices in major tech hubs around the world. Our team of talented engineers, designers, and product managers work together to create solutions that our customers love.`,
    logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    coverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop',
    benefits: [
      'Comprehensive health, dental, and vision insurance',
      'Flexible work arrangements and remote work options',
      '401(k) matching up to 6%',
      'Professional development budget ($2,000/year)',
      'Unlimited PTO policy',
      'Stock options and equity participation',
      'Modern office with free meals and snacks',
      'Gym membership and wellness programs',
      'Team building events and company retreats',
      'Parental leave and family support'
    ],
    culture: [
      'Innovation-driven environment',
      'Work-life balance priority',
      'Diversity and inclusion focus',
      'Continuous learning culture',
      'Collaborative team spirit',
      'Results-oriented approach'
    ],
    offices: [
      { city: 'San Francisco, CA', address: '123 Tech Street, SF, CA 94105', employees: 800 },
      { city: 'New York, NY', address: '456 Innovation Ave, NYC, NY 10001', employees: 600 },
      { city: 'Austin, TX', address: '789 Startup Blvd, Austin, TX 73301', employees: 400 },
      { city: 'Seattle, WA', address: '321 Cloud Way, Seattle, WA 98101', employees: 300 }
    ],
    stats: {
      employees: 2100,
      countries: 4,
      products: 12,
      customers: '50,000+'
    },
    featured: true
  };

  const jobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      type: 'Full-time',
      posted: '2 days ago',
      applicants: 45
    },
    {
      id: '2',
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      salary: '$110k - $150k',
      type: 'Full-time',
      posted: '1 day ago',
      applicants: 32
    },
    {
      id: '3',
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      salary: '$100k - $140k',
      type: 'Full-time',
      posted: '3 days ago',
      applicants: 28
    },
    {
      id: '4',
      title: 'UX Designer',
      department: 'Design',
      location: 'Austin, TX',
      salary: '$85k - $115k',
      type: 'Full-time',
      posted: '5 days ago',
      applicants: 19
    },
    {
      id: '5',
      title: 'Data Scientist',
      department: 'Data',
      location: 'Seattle, WA',
      salary: '$95k - $135k',
      type: 'Full-time',
      posted: '1 week ago',
      applicants: 41
    }
  ];

  const reviews = [
    {
      id: 1,
      rating: 5,
      title: 'Amazing company culture and growth opportunities',
      author: 'Software Engineer',
      department: 'Engineering',
      date: '2 weeks ago',
      pros: 'Great work-life balance, excellent benefits, supportive management, cutting-edge technology stack',
      cons: 'Fast-paced environment can be challenging for some, high expectations',
      advice: 'Be prepared to learn quickly and take ownership of your projects. The company invests heavily in employee growth.'
    },
    {
      id: 2,
      rating: 4,
      title: 'Solid company with room for improvement',
      author: 'Product Manager',
      department: 'Product',
      date: '1 month ago',
      pros: 'Good compensation, interesting projects, smart colleagues, flexible remote work policy',
      cons: 'Communication could be better across teams, some processes need streamlining',
      advice: 'Take initiative and don\'t be afraid to suggest improvements. Management is generally receptive to feedback.'
    },
    {
      id: 3,
      rating: 5,
      title: 'Best decision I made for my career',
      author: 'Senior Designer',
      department: 'Design',
      date: '3 weeks ago',
      pros: 'Creative freedom, excellent design tools and resources, collaborative environment, strong mentorship',
      cons: 'Sometimes tight deadlines, need to balance multiple projects',
      advice: 'Come with a growth mindset and be ready to collaborate closely with engineering and product teams.'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'jobs', name: `Jobs (${jobs.length})` },
    { id: 'reviews', name: `Reviews (${reviews.length})` },
    { id: 'culture', name: 'Culture' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            to="/companies"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Companies</span>
          </Link>
          
          {/* Cover Image */}
          <div className="relative h-48 rounded-xl overflow-hidden mb-6">
            <img 
              src={company.coverImage} 
              alt={company.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <img 
                src={company.logo} 
                alt={company.name} 
                className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-lg -mt-12 relative z-10" 
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-2">
                  <div className="flex items-center space-x-1">
                    <Building2 className="w-4 h-4" />
                    <span>{company.industry}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{company.size} employees</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">{company.rating}</span>
                    <span className="text-gray-600">({company.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Founded {company.founded}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <a href={`https://${company.website}`} className="text-blue-600 hover:text-blue-700">
                      {company.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {company.featured && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isFollowing
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isFollowing ? 'Following ✓' : 'Follow Company'}
                </button>
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full font-medium">
                  Featured Company
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{company.stats.employees.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Employees</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{company.stats.countries}</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{company.stats.products}</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{company.stats.customers}</div>
              <div className="text-sm text-gray-600">Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About {company.name}</h2>
                <div className="prose prose-gray max-w-none">
                  {company.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Offices */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Office Locations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {company.offices.map((office, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">{office.city}</h3>
                      <p className="text-sm text-gray-600 mb-2">{office.address}</p>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{office.employees} employees</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industry</span>
                    <span className="font-medium text-gray-900">{company.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Founded</span>
                    <span className="font-medium text-gray-900">{company.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Headquarters</span>
                    <span className="font-medium text-gray-900">{company.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company Size</span>
                    <span className="font-medium text-gray-900">{company.size}</span>
                  </div>
                </div>
              </div>

              {/* Recent Jobs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Job Openings</h3>
                <div className="space-y-3">
                  {jobs.slice(0, 3).map((job) => (
                    <Link 
                      key={job.id}
                      to={`/jobs/${job.id}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 text-sm">{job.title}</h4>
                      <div className="text-xs text-gray-600 mt-1">
                        {job.location} • {job.salary}
                      </div>
                    </Link>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveTab('jobs')}
                  className="mt-4 w-full text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View All Jobs →
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Open Positions</h2>
              <div className="text-sm text-gray-600">{jobs.length} jobs available</div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-blue-200 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link 
                        to={`/jobs/${job.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {job.title}
                      </Link>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                          {job.department}
                        </span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <span>{job.salary}</span>
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                        <span>Posted {job.posted}</span>
                        <span>{job.applicants} applicants</span>
                      </div>
                    </div>
                    <Link 
                      to={`/jobs/${job.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Employee Reviews</h2>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold text-gray-900">{company.rating}</span>
                <span className="text-gray-600">({company.reviews} reviews)</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-900">{review.rating}/5</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{review.title}</h3>
                      <div className="text-sm text-gray-600">
                        {review.author} • {review.department} • {review.date}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-emerald-700 mb-2">Pros</h4>
                      <p className="text-gray-700 text-sm">{review.pros}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-700 mb-2">Cons</h4>
                      <p className="text-gray-700 text-sm">{review.cons}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-2">Advice to Management</h4>
                      <p className="text-gray-700 text-sm">{review.advice}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'culture' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Benefits */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
                <div className="space-y-3">
                  {company.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Award className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Culture Values */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Culture & Values</h2>
                <div className="grid grid-cols-1 gap-4">
                  {company.culture.map((value, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Environment */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-3">Join Our Team</h3>
                <p className="text-blue-100 mb-4 text-sm">
                  Be part of a company that values innovation, growth, and making a positive impact.
                </p>
                <button 
                  onClick={() => setActiveTab('jobs')}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  View Open Positions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetailsPage;