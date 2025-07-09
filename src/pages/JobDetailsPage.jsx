import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Users, Building2, Star, Share2, Bookmark, ArrowLeft, CheckCircle } from 'lucide-react';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    linkedin: ''
  });

  // Mock job data - in a real app, this would come from an API
  const job = {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    salary: '$120k - $160k',
    type: 'Full-time',
    experience: 'Senior',
    posted: '2 days ago',
    description: `We are looking for a Senior Frontend Developer to join our innovative team and help build cutting-edge web applications using React, TypeScript, and modern frontend technologies.

As a Senior Frontend Developer, you will be responsible for developing user-facing features, optimizing applications for maximum speed and scalability, and collaborating with our design and backend teams to deliver exceptional user experiences.

This is an excellent opportunity to work with a talented team on challenging projects that impact millions of users worldwide.`,
    requirements: [
      '5+ years of experience with React and modern JavaScript',
      'Strong proficiency in TypeScript',
      'Experience with modern CSS frameworks (Tailwind, Styled Components)',
      'Knowledge of state management libraries (Redux, Zustand)',
      'Experience with testing frameworks (Jest, React Testing Library)',
      'Familiarity with build tools and CI/CD pipelines',
      'Strong problem-solving skills and attention to detail',
      'Excellent communication and collaboration skills'
    ],
    responsibilities: [
      'Develop and maintain high-quality frontend applications',
      'Collaborate with designers to implement pixel-perfect UI components',
      'Optimize applications for maximum speed and scalability',
      'Write clean, maintainable, and well-documented code',
      'Participate in code reviews and mentor junior developers',
      'Stay up-to-date with the latest frontend technologies and best practices',
      'Work closely with backend developers to integrate APIs',
      'Contribute to technical architecture decisions'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      'Flexible work arrangements and remote work options',
      '401(k) matching up to 6%',
      'Professional development budget ($2,000/year)',
      'Unlimited PTO policy',
      'Modern office with free meals and snacks',
      'Team building events and company retreats'
    ],
    logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    featured: true,
    urgent: false,
    remote: true,
    companySize: '500-1000',
    industry: 'Technology',
    founded: 2010,
    companyRating: 4.8,
    companyReviews: 1247
  };

  const similarJobs = [
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      salary: '$90k - $120k',
      logo: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '3',
      title: 'React Developer',
      company: 'InnovateHub',
      location: 'New York, NY',
      salary: '$100k - $140k',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '4',
      title: 'Full Stack Developer',
      company: 'TechStart Inc',
      location: 'Austin, TX',
      salary: '$85k - $115k',
      logo: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    if (applicationData.firstName && applicationData.lastName && applicationData.email) {
      alert('Application submitted successfully! We will contact you soon.');
      setShowApplicationForm(false);
      setApplicationData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        resume: null,
        coverLetter: '',
        linkedin: ''
      });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const ApplicationForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h2>
            <button 
              onClick={() => setShowApplicationForm(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">at {job.company}</p>
        </div>
        
        <form onSubmit={handleApplicationSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <input
                type="text"
                value={applicationData.firstName}
                onChange={(e) => setApplicationData({...applicationData, firstName: e.target.value})}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <input
                type="text"
                value={applicationData.lastName}
                onChange={(e) => setApplicationData({...applicationData, lastName: e.target.value})}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              value={applicationData.email}
              onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john.doe@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={applicationData.phone}
              onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resume *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <div className="text-gray-600">
                <p className="mb-2">Drop your resume here or click to browse</p>
                <p className="text-sm">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>
              <input 
                type="file" 
                onChange={(e) => setApplicationData({...applicationData, resume: e.target.files[0]})}
                className="hidden" 
                accept=".pdf,.doc,.docx" 
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                {applicationData.resume ? (
                  <span className="text-green-600 font-medium">{applicationData.resume.name}</span>
                ) : (
                  <span className="text-blue-600 font-medium">Choose File</span>
                )}
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
            <textarea
              rows={4}
              value={applicationData.coverLetter}
              onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us why you're interested in this position..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
            <input
              type="url"
              value={applicationData.linkedin}
              onChange={(e) => setApplicationData({...applicationData, linkedin: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
          
          <div className="flex space-x-4">
            <button 
              type="button"
              onClick={() => setShowApplicationForm(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            to="/jobs"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Jobs</span>
          </Link>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <img src={job.logo} alt={job.company} className="w-20 h-20 rounded-xl object-cover" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <Link 
                  to={`/companies/${job.id}`}
                  className="text-xl text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  {job.company}
                </Link>
                <div className="flex items-center space-x-4 mt-2 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Posted {job.posted}</span>
                  </div>
                  {job.remote && (
                    <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                      Remote OK
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-3 rounded-lg border transition-colors ${
                  isBookmarked 
                    ? 'bg-blue-50 border-blue-200 text-blue-600' 
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowApplicationForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <DollarSign className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{job.salary}</div>
                  <div className="text-sm text-gray-600">Salary</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{job.type}</div>
                  <div className="text-sm text-gray-600">Employment</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{job.experience}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Building2 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{job.companySize}</div>
                  <div className="text-sm text-gray-600">Company Size</div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
              <div className="prose prose-gray max-w-none">
                {job.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Industry</span>
                  <span className="font-medium text-gray-900">{job.industry}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Founded</span>
                  <span className="font-medium text-gray-900">{job.founded}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Company Size</span>
                  <span className="font-medium text-gray-900">{job.companySize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-900">{job.companyRating}</span>
                    <span className="text-sm text-gray-600">({job.companyReviews})</span>
                  </div>
                </div>
              </div>
              <Link 
                to={`/companies/${job.id}`}
                className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors text-center block"
              >
                View Company Profile
              </Link>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
              <div className="space-y-4">
                {similarJobs.map((similarJob) => (
                  <Link 
                    key={similarJob.id}
                    to={`/jobs/${similarJob.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={similarJob.logo} alt={similarJob.company} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{similarJob.title}</h4>
                        <p className="text-sm text-gray-600">{similarJob.company}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                          <span>{similarJob.location}</span>
                          <span>•</span>
                          <span>{similarJob.salary}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Apply CTA */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">Ready to Apply?</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Join {job.company} and take your career to the next level.
              </p>
              <button 
                onClick={() => setShowApplicationForm(true)}
                className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && <ApplicationForm />}
    </div>
  );
};

export default JobDetailsPage;