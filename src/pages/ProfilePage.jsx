import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, Briefcase, Calendar, Edit3, Save, X, Camera, Award, Star, Plus, Trash2, Upload, Download, Building2, Crown } from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [experienceForm, setExperienceForm] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setEditData(userData);
    }

    // Load experiences from localStorage
    const storedExperiences = localStorage.getItem('userExperiences');
    if (storedExperiences) {
      setExperiences(JSON.parse(storedExperiences));
    }

    // Load saved jobs from localStorage
    const storedSavedJobs = localStorage.getItem('savedJobs');
    if (storedSavedJobs) {
      setSavedJobs(JSON.parse(storedSavedJobs));
    } else {
      // Mock saved jobs if none exist
      const mockSavedJobs = [
        {
          id: 1,
          title: 'Full Stack Developer',
          company: 'StartupXYZ',
          location: 'Remote',
          salary: '₹71L - ₹95L',
          savedDate: '2024-01-16',
          type: 'Full-time',
          logo: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        },
        {
          id: 2,
          title: 'Data Scientist',
          company: 'Analytics Plus',
          location: 'Boston, MA',
          salary: '₹75L - ₹1.08Cr',
          savedDate: '2024-01-14',
          type: 'Full-time',
          logo: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        }
      ];
      setSavedJobs(mockSavedJobs);
      localStorage.setItem('savedJobs', JSON.stringify(mockSavedJobs));
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, ...editData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditData(user);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatar = e.target.result;
        const updatedUser = { ...user, avatar: newAvatar };
        setUser(updatedUser);
        setEditData(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedUser = { ...user, resume: { name: file.name, uploadDate: new Date().toISOString() } };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Resume uploaded successfully!');
    }
  };

  const handleAddExperience = () => {
    if (experienceForm.title && experienceForm.company) {
      const newExperience = {
        id: Date.now(),
        ...experienceForm
      };
      const updatedExperiences = [...experiences, newExperience];
      setExperiences(updatedExperiences);
      localStorage.setItem('userExperiences', JSON.stringify(updatedExperiences));
      setExperienceForm({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
      setShowExperienceForm(false);
    }
  };

  const handleDeleteExperience = (id) => {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    setExperiences(updatedExperiences);
    localStorage.setItem('userExperiences', JSON.stringify(updatedExperiences));
  };

  const handleApplyToJob = (jobId) => {
    alert(`Applied to job successfully! You will be redirected to the application form.`);
    // In a real app, this would redirect to the job application page
  };

  const handleRemoveSavedJob = (jobId) => {
    const updatedSavedJobs = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Please Sign In</h2>
          <p className="text-gray-600">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'experience', name: 'Experience' },
    { id: 'applications', name: 'Applications' },
    { id: 'saved', name: 'Saved Jobs' }
  ];

  const mockApplications = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      appliedDate: '2024-01-15',
      status: 'Interview Scheduled',
      statusColor: 'text-blue-600 bg-blue-50'
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      company: 'InnovateHub',
      appliedDate: '2024-01-12',
      status: 'Under Review',
      statusColor: 'text-yellow-600 bg-yellow-50'
    },
    {
      id: 3,
      jobTitle: 'UX Designer',
      company: 'DesignStudio Pro',
      appliedDate: '2024-01-10',
      status: 'Rejected',
      statusColor: 'text-red-600 bg-red-50'
    }
  ];

  const UpgradeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Upgrade to Premium</h2>
            </div>
            <button 
              onClick={() => setShowUpgradeModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">Unlock premium features and accelerate your career growth</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Job Seeker Premium */}
            <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
              <div className="text-center mb-6">
                <User className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-900">Job Seeker Premium</h3>
                <div className="text-3xl font-bold text-blue-600 mt-2">₹1,577<span className="text-lg text-gray-600">/month</span></div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Priority job recommendations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Advanced salary insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Direct messaging with recruiters</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Resume optimization tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Interview preparation resources</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Career coaching sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Unlimited job applications</span>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
                Upgrade Now
              </button>
            </div>

            {/* Employer Premium */}
            <div className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
              <div className="text-center mb-6">
                <Building2 className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-900">Employer Premium</h3>
                <div className="text-3xl font-bold text-purple-600 mt-2">₹8,217<span className="text-lg text-gray-600">/month</span></div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Unlimited job postings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Advanced candidate filtering</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Priority job placement</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Detailed analytics dashboard</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Branded company profile</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Direct candidate outreach</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Dedicated account manager</span>
                </div>
              </div>
              
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">All plans include a 14-day free trial. Cancel anytime.</p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>✓ Secure payment</span>
              <span>✓ No setup fees</span>
              <span>✓ 24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ExperienceForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Add Experience</h2>
            <button 
              onClick={() => setShowExperienceForm(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
            <input
              type="text"
              value={experienceForm.title}
              onChange={(e) => setExperienceForm({...experienceForm, title: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Senior Software Engineer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
            <input
              type="text"
              value={experienceForm.company}
              onChange={(e) => setExperienceForm({...experienceForm, company: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. TechCorp Solutions"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={experienceForm.location}
              onChange={(e) => setExperienceForm({...experienceForm, location: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. San Francisco, CA"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="month"
                value={experienceForm.startDate}
                onChange={(e) => setExperienceForm({...experienceForm, startDate: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="month"
                value={experienceForm.endDate}
                onChange={(e) => setExperienceForm({...experienceForm, endDate: e.target.value})}
                disabled={experienceForm.current}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={experienceForm.current}
              onChange={(e) => setExperienceForm({...experienceForm, current: e.target.checked, endDate: e.target.checked ? '' : experienceForm.endDate})}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">I currently work here</span>
          </label>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={4}
              value={experienceForm.description}
              onChange={(e) => setExperienceForm({...experienceForm, description: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={() => setShowExperienceForm(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddExperience}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Add Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.firstName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={editData.firstName || ''}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1 text-2xl font-bold"
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        value={editData.lastName || ''}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1 text-2xl font-bold"
                        placeholder="Last Name"
                      />
                    </div>
                  ) : (
                    `${user.firstName} ${user.lastName}`
                  )}
                </h1>
                <div className="flex items-center space-x-4 mt-2 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Briefcase className="w-4 h-4" />
                    <span className="capitalize">{user.userType}</span>
                  </div>
                </div>
                {isEditing ? (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                      placeholder="Professional Title (e.g., Senior Software Engineer)"
                    />
                  </div>
                ) : (
                  <p className="text-lg text-blue-600 mt-1">{user.title || 'Add your professional title'}</p>
                )}
              </div>
            </div>
            
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
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
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                {isEditing ? (
                  <textarea
                    value={editData.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Tell us about yourself, your experience, and career goals..."
                  />
                ) : (
                  <p className="text-gray-700">
                    {user.bio || 'Add a bio to tell employers about your background and career goals.'}
                  </p>
                )}
              </div>

              {/* Resume Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Resume</h2>
                {user.resume ? (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Upload className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.resume.name}</div>
                        <div className="text-sm text-gray-600">
                          Uploaded on {new Date(user.resume.uploadDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Download className="w-5 h-5" />
                      </button>
                      <label className="text-gray-600 hover:text-gray-700 cursor-pointer">
                        <Edit3 className="w-5 h-5" />
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-600 mb-4">
                      <p className="mb-2">Upload your resume</p>
                      <p className="text-sm">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                    <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                      Choose File
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="+1 (555) 123-4567"
                      />
                    ) : (
                      <p className="text-gray-700">{user.phone || 'Add phone number'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.location || ''}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="City, State"
                      />
                    ) : (
                      <p className="text-gray-700">{user.location || 'Add location'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={editData.linkedin || ''}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="https://linkedin.com/in/username"
                      />
                    ) : (
                      <p className="text-gray-700">{user.linkedin || 'Add LinkedIn profile'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={editData.website || ''}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="https://yourwebsite.com"
                      />
                    ) : (
                      <p className="text-gray-700">{user.website || 'Add personal website'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.skills || ''}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="JavaScript, React, Node.js, Python (comma separated)"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {(user.skills || 'JavaScript,React,Node.js,Python').split(',').map((skill, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Completion */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Profile Strength</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Add more details to improve your profile visibility
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Profile Views</span>
                    <span className="font-semibold text-gray-900">127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Applications</span>
                    <span className="font-semibold text-gray-900">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Saved Jobs</span>
                    <span className="font-semibold text-gray-900">{savedJobs.length}</span>
                  </div>
                </div>
              </div>

              {/* Account Type */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-3">Account Type</h3>
                <p className="text-blue-100 mb-4 text-sm capitalize">
                  {user.userType} Account
                </p>
                <button 
                  onClick={() => setShowUpgradeModal(true)}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                >
                  Upgrade Account
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
              <button 
                onClick={() => setShowExperienceForm(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience</span>
              </button>
            </div>
            
            <div className="space-y-6">
              {experiences.map((experience) => (
                <div key={experience.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{experience.title}</h3>
                      <p className="text-blue-600 font-medium">{experience.company}</p>
                      {experience.location && (
                        <div className="flex items-center space-x-1 text-gray-600 mt-1">
                          <MapPin className="w-4 h-4" />
                          <span>{experience.location}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1 text-gray-600 mt-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(experience.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                          {experience.current ? ' Present' : ` ${new Date(experience.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                        </span>
                      </div>
                      {experience.description && (
                        <p className="text-gray-700 mt-3">{experience.description}</p>
                      )}
                    </div>
                    <button 
                      onClick={() => handleDeleteExperience(experience.id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              
              {experiences.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No experience added yet</h3>
                  <p className="text-gray-600 mb-6">Add your work experience to showcase your professional background.</p>
                  <button 
                    onClick={() => setShowExperienceForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Add Your First Experience
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Applications</h2>
            <div className="space-y-4">
              {mockApplications.map((application) => (
                <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{application.jobTitle}</h3>
                      <p className="text-gray-600">{application.company}</p>
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                        <Calendar className="w-4 h-4" />
                        <span>Applied on {new Date(application.appliedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${application.statusColor}`}>
                      {application.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Saved Jobs</h2>
            <div className="space-y-4">
              {savedJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <span>{job.salary}</span>
                          <span>{job.type}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Saved on {new Date(job.savedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleRemoveSavedJob(job.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="Remove from saved jobs"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleApplyToJob(job.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {savedJobs.length === 0 && (
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No saved jobs yet</h3>
                  <p className="text-gray-600 mb-6">Save jobs you're interested in to apply later.</p>
                  <a 
                    href="/jobs"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
                  >
                    Browse Jobs
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showUpgradeModal && <UpgradeModal />}
      {showExperienceForm && <ExperienceForm />}
    </div>
  );
};

export default ProfilePage;