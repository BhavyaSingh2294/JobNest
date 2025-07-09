import React, { useState } from 'react';
import { Search, BookOpen, Users, Award, TrendingUp, Clock, Star, ArrowRight, Play, Download } from 'lucide-react';

const CareerAdvicePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [subscribedNewsletter, setSubscribedNewsletter] = useState(false);
  const [email, setEmail] = useState('');
  const [registeredWebinars, setRegisteredWebinars] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Topics', count: 24 },
    { id: 'resume', name: 'Resume Writing', count: 8 },
    { id: 'interview', name: 'Interview Prep', count: 6 },
    { id: 'career-growth', name: 'Career Growth', count: 5 },
    { id: 'networking', name: 'Networking', count: 3 },
    { id: 'salary', name: 'Salary Negotiation', count: 2 }
  ];

  const articles = [
    {
      id: 1,
      title: 'How to Write a Resume That Gets You Hired in 2025',
      category: 'resume',
      author: 'Sarah Johnson',
      readTime: '8 min read',
      publishedAt: '2 days ago',
      views: 12500,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      excerpt: 'Learn the latest resume trends and formatting techniques that will make your application stand out to recruiters and ATS systems.',
      tags: ['Resume', 'ATS', 'Job Search', 'Career Tips'],
      featured: true
    },
    {
      id: 2,
      title: 'Mastering the Technical Interview: A Complete Guide',
      category: 'interview',
      author: 'Michael Chen',
      readTime: '12 min read',
      publishedAt: '1 day ago',
      views: 18200,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      excerpt: 'Comprehensive strategies for acing technical interviews, including coding challenges, system design, and behavioral questions.',
      tags: ['Interview', 'Technical', 'Coding', 'System Design'],
      featured: true
    },
    {
      id: 3,
      title: 'Negotiating Your Salary: Scripts and Strategies That Work',
      category: 'salary',
      author: 'Emily Rodriguez',
      readTime: '10 min read',
      publishedAt: '3 days ago',
      views: 9800,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      excerpt: 'Proven negotiation tactics and conversation scripts to help you secure the salary you deserve.',
      tags: ['Salary', 'Negotiation', 'Career Growth', 'Communication'],
      featured: false
    },
    {
      id: 4,
      title: 'Building Your Professional Network: A Step-by-Step Guide',
      category: 'networking',
      author: 'David Park',
      readTime: '7 min read',
      publishedAt: '5 days ago',
      views: 7300,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      excerpt: 'Learn how to build meaningful professional relationships that can accelerate your career growth.',
      tags: ['Networking', 'Professional Development', 'Career Growth'],
      featured: false
    },
    {
      id: 5,
      title: 'Career Pivot: How to Successfully Change Industries',
      category: 'career-growth',
      author: 'Lisa Thompson',
      readTime: '15 min read',
      publishedAt: '1 week ago',
      views: 11400,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      excerpt: 'Strategic advice for professionals looking to transition to a new industry or career path.',
      tags: ['Career Change', 'Industry Transition', 'Professional Development'],
      featured: false
    },
    {
      id: 6,
      title: 'Remote Work Interview Tips: Standing Out in Virtual Interviews',
      category: 'interview',
      author: 'Alex Kumar',
      readTime: '6 min read',
      publishedAt: '1 week ago',
      views: 8900,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      excerpt: 'Essential tips for succeeding in remote job interviews and making a great impression virtually.',
      tags: ['Remote Work', 'Interview', 'Virtual', 'Technology'],
      featured: false
    }
  ];

  const resources = [
    {
      type: 'template',
      title: 'Modern Resume Template',
      description: 'ATS-friendly resume template with modern design',
      downloads: 15200,
      icon: Download
    },
    {
      type: 'checklist',
      title: 'Interview Preparation Checklist',
      description: 'Complete checklist to prepare for any interview',
      downloads: 8900,
      icon: BookOpen
    },
    {
      type: 'guide',
      title: 'Salary Negotiation Email Templates',
      description: 'Professional email templates for salary discussions',
      downloads: 6700,
      icon: Award
    }
  ];

  const webinars = [
    {
      title: 'Landing Your Dream Job in Tech',
      date: 'Dec 15, 2024',
      time: '2:00 PM EST',
      speaker: 'Sarah Johnson',
      attendees: 1200,
      upcoming: true
    },
    {
      title: 'Advanced Interview Techniques',
      date: 'Dec 20, 2024',
      time: '1:00 PM EST',
      speaker: 'Michael Chen',
      attendees: 890,
      upcoming: true
    },
    {
      title: 'Building Your Personal Brand',
      date: 'Dec 10, 2024',
      time: '3:00 PM EST',
      speaker: 'Emily Rodriguez',
      attendees: 1500,
      upcoming: false
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribedNewsletter(true);
      alert(`Successfully subscribed ${email} to our newsletter!`);
      setEmail('');
    }
  };

  const registerForWebinar = (webinarTitle) => {
    const newRegistered = new Set(registeredWebinars);
    newRegistered.add(webinarTitle);
    setRegisteredWebinars(newRegistered);
    alert(`Successfully registered for "${webinarTitle}"!`);
  };

  const downloadResource = (resourceTitle) => {
    alert(`Downloading "${resourceTitle}"...`);
  };

  const ArticleCard = ({ article }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 group overflow-hidden">
      <div className="relative">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {article.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
            <Star className="w-3 h-3 fill-current text-yellow-400" />
            <span>{article.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
            {categories.find(cat => cat.id === article.category)?.name}
          </span>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{article.readTime}</span>
          </div>
          <span>{article.publishedAt}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors cursor-pointer">
          {article.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {article.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{article.author}</div>
              <div className="text-xs text-gray-600">{article.views.toLocaleString()} views</div>
            </div>
          </div>
          
          <button 
            onClick={() => alert(`Opening article: ${article.title}`)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <span>Read More</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Career Advice & Resources
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Expert guidance, practical tips, and proven strategies to accelerate your career growth and land your dream job.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles, tips, and resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">150+</div>
              <div className="text-sm text-gray-600">Expert Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50k+</div>
              <div className="text-sm text-gray-600">Career Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">25+</div>
              <div className="text-sm text-gray-600">Industry Experts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Free Resources */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Free Resources</h3>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <div 
                    key={index} 
                    onClick={() => downloadResource(resource.title)}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <resource.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{resource.title}</h4>
                      <p className="text-xs text-gray-600 mb-1">{resource.description}</p>
                      <div className="text-xs text-gray-500">
                        {resource.downloads.toLocaleString()} downloads
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Webinars */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Webinars</h3>
              <div className="space-y-4">
                {webinars.filter(w => w.upcoming).map((webinar, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 text-sm mb-2">{webinar.title}</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>{webinar.date} at {webinar.time}</div>
                      <div>Speaker: {webinar.speaker}</div>
                      <div>{webinar.attendees} registered</div>
                    </div>
                    <button 
                      onClick={() => registerForWebinar(webinar.title)}
                      disabled={registeredWebinars.has(webinar.title)}
                      className={`mt-3 w-full text-xs py-2 px-3 rounded-lg transition-colors ${
                        registeredWebinars.has(webinar.title)
                          ? 'bg-green-100 text-green-800 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {registeredWebinars.has(webinar.title) ? 'Registered ✓' : 'Register Now'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Articles' : categories.find(cat => cat.id === selectedCategory)?.name}
              </h2>
              <div className="text-sm text-gray-600">
                {filteredArticles.length} articles found
              </div>
            </div>

            {/* Featured Articles */}
            {selectedCategory === 'all' && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Featured Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articles.filter(article => article.featured).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )}

            {/* All Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or browse different categories.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  View All Articles
                </button>
              </div>
            )}

            {/* Load More */}
            {filteredArticles.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-medium transition-colors">
                  Load More Articles
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Ahead in Your Career</h2>
          <p className="text-xl text-purple-100 mb-8">
            Get weekly career tips, industry insights, and job opportunities delivered to your inbox.
          </p>
          {subscribedNewsletter ? (
            <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✓</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Successfully Subscribed!</h3>
                <p className="text-purple-100">
                  Thank you for joining our community. You'll receive your first newsletter soon.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-300 focus:outline-none"
              />
              <button 
                type="submit"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
          {!subscribedNewsletter && (
            <p className="text-sm text-purple-200 mt-4">
              Join 50,000+ professionals. Unsubscribe anytime.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerAdvicePage;