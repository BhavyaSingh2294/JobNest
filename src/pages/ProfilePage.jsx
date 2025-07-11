import React, { useState, useEffect } from 'react';
import { Camera, Upload, Briefcase, Star, Crown, MapPin, Phone, Mail, Plus, Edit2, Trash2, ExternalLink, User, FileText, Settings, CheckCircle, X, Save, Linkedin, Globe } from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    accountType: 'free',
    profilePicture: null,
    aboutMe: '',
    linkedinProfile: '',
    portfolioWebsite: ''
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [workExperience, setWorkExperience] = useState([]);
  const [skills, setSkills] = useState([
    { id: 1, name: 'JavaScript', level: 'Expert', verified: true },
    { id: 2, name: 'React', level: 'Advanced', verified: true },
    { id: 3, name: 'Node.js', level: 'Intermediate', verified: false },
    { id: 4, name: 'Python', level: 'Beginner', verified: false }
  ]);
  const [savedJobs, setSavedJobs] = useState([
    { 
      id: 1, 
      title: 'Senior Frontend Developer', 
      company: 'TechCorp', 
      location: 'Mumbai', 
      salary: '₹15-20 LPA',
      applied: false,
      postedDate: '2 days ago'
    },
    { 
      id: 2, 
      title: 'Product Manager', 
      company: 'StartupXYZ', 
      location: 'Bangalore', 
      salary: '₹25-30 LPA',
      applied: false,
      postedDate: '1 week ago'
    },
    { 
      id: 3, 
      title: 'Full Stack Developer', 
      company: 'InnovateLab', 
      location: 'Remote', 
      salary: '₹18-25 LPA',
      applied: true,
      postedDate: '3 days ago'
    }
  ]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    duration: '',
    description: ''
  });

  useEffect(() => {
    // Load user data from localStorage if available
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(prevUser => ({
        ...prevUser,
        firstName: userData.firstName || 'John',
        lastName: userData.lastName || 'Doe',
        email: userData.email || 'john.doe@example.com',
        accountType: userData.accountType || 'free'
      }));
    }
  }, []);

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser(prev => ({ ...prev, profilePicture: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    setEditFormData(user);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setUser(editFormData);
    localStorage.setItem('user', JSON.stringify(editFormData));
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setEditFormData({});
    setIsEditingProfile(false);
  };

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position) {
      setWorkExperience(prev => [...prev, { ...newExperience, id: Date.now() }]);
      setNewExperience({ company: '', position: '', duration: '', description: '' });
      setIsEditing(false);
    }
  };

  const handleDeleteExperience = (id) => {
    setWorkExperience(prev => prev.filter(exp => exp.id !== id));
  };

  const handleApplyToJob = (jobId) => {
    setSavedJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, applied: true } : job
    ));
    alert('Application submitted successfully!');
  };

  const handleRemoveSavedJob = (id) => {
    setSavedJobs(prev => prev.filter(job => job.id !== id));
  };

  const handleUpgradeClick = (planType) => {
    const links = {
      jobseeker: 'https://razorpay.me/@bharatbhushannathsharma?amount=01vVMe2nRmlnNjFkqNNI6w%3D%3D',
      employer: 'https://razorpay.me/@bharatbhushannathsharma?amount=YZdaFwx2QK8VytVM0yRD2w%3D%3D'
    };
    window.open(links[planType], '_blank');
    setShowUpgradeModal(false);
  };

  const addSkill = (skillName) => {
    if (skillName.trim()) {
      setSkills(prev => [...prev, {
        id: Date.now(),
        name: skillName.trim(),
        level: 'Beginner',
        verified: false
      }]);
    }
  };

  const removeSkill = (skillId) => {
    setSkills(prev => prev.filter(skill => skill.id !== skillId));
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'applications', name: 'Applications', icon: FileText },
    { id: 'saved-jobs', name: 'Saved Jobs', icon: Star },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  `${user.firstName[0]}${user.lastName[0]}`
                )}
              </div>
              <label className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <Camera className="w-4 h-4 text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                {user.accountType === 'premium' && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Crown className="w-4 h-4" />
                    Premium
                  </span>
                )}
              </div>
              
              <div className="space-y-2 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
              </div>

              <button
                onClick={handleEditProfile}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            {/* Upgrade Button */}
            {user.accountType === 'free' && (
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2"
              >
                <Crown className="w-5 h-5" />
                Upgrade Account
              </button>
            )}
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* About Me */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
                    {user.aboutMe ? (
                      <p className="text-gray-700 leading-relaxed">{user.aboutMe}</p>
                    ) : (
                      <p className="text-gray-500 italic">No description added yet. Click "Edit Profile" to add your bio.</p>
                    )}
                  </div>

                  {/* Resume Upload */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Upload className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Resume</h3>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Drag and drop your resume here, or click to browse</p>
                      <p className="text-sm text-gray-500">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                      >
                        Choose File
                      </label>
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Experience
                      </button>
                    </div>

                    {workExperience.length === 0 ? (
                      <div className="text-center py-12">
                        <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-2">No work experience added yet</p>
                        <p className="text-sm text-gray-400">Add your professional experience to showcase your skills</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {workExperience.map((exp) => (
                          <div key={exp.id} className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                                <p className="text-blue-600 font-medium">{exp.company}</p>
                                <p className="text-sm text-gray-500">{exp.duration}</p>
                                {exp.description && (
                                  <p className="text-gray-600 mt-2">{exp.description}</p>
                                )}
                              </div>
                              <button
                                onClick={() => handleDeleteExperience(exp.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Experience Form */}
                    {isEditing && (
                      <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white">
                        <h4 className="font-semibold text-gray-900 mb-4">Add Work Experience</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Company Name"
                            value={newExperience.company}
                            onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="Position"
                            value={newExperience.position}
                            onChange={(e) => setNewExperience(prev => ({ ...prev, position: e.target.value }))}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="Duration (e.g., Jan 2020 - Present)"
                            value={newExperience.duration}
                            onChange={(e) => setNewExperience(prev => ({ ...prev, duration: e.target.value }))}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                          />
                          <textarea
                            placeholder="Job Description"
                            value={newExperience.description}
                            onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2 h-24 resize-none"
                          />
                        </div>
                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={handleAddExperience}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Add Experience
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      {user.linkedinProfile && (
                        <div className="flex items-center gap-2">
                          <Linkedin className="w-4 h-4 text-blue-600" />
                          <a href={user.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm">
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                      {user.portfolioWebsite && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-green-600" />
                          <a href={user.portfolioWebsite} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 text-sm">
                            Portfolio Website
                          </a>
                        </div>
                      )}
                      {!user.linkedinProfile && !user.portfolioWebsite && (
                        <p className="text-gray-500 text-sm italic">No contact links added yet. Click "Edit Profile" to add them.</p>
                      )}
                    </div>
                  </div>

                  {/* Account Type */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Crown className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Account Type</h3>
                    </div>
                    
                    <div className="text-center">
                      {user.accountType === 'premium' ? (
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                          <Crown className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                          <p className="font-semibold text-yellow-800">Premium Account</p>
                          <p className="text-sm text-yellow-600">Enjoy unlimited access</p>
                        </div>
                      ) : (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
                          <p className="font-semibold text-gray-700">Free Account</p>
                          <p className="text-sm text-gray-500 mb-3">Limited features available</p>
                          <button
                            onClick={() => setShowUpgradeModal(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                          >
                            Upgrade Now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Skills & Applications</h2>
                
                {/* Skills Section */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Skills Mastered</h3>
                    <button
                      onClick={() => {
                        const skillName = prompt('Enter skill name:');
                        if (skillName) addSkill(skillName);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Skill
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills.map((skill) => (
                      <div key={skill.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                          <button
                            onClick={() => removeSkill(skill.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            skill.level === 'Expert' ? 'bg-green-100 text-green-800' :
                            skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                            skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {skill.level}
                          </span>
                          {skill.verified && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'saved-jobs' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Saved Jobs</h2>

                {savedJobs.length === 0 ? (
                  <div className="text-center py-16">
                    <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No saved jobs yet</h3>
                    <p className="text-gray-600">Start saving jobs you're interested in to see them here.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {savedJobs.map((job) => (
                      <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-200 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                              {job.applied && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                  Applied
                                </span>
                              )}
                            </div>
                            <p className="text-blue-600 font-medium mb-1">{job.company}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{job.location}</span>
                              </div>
                              <span className="font-medium text-green-600">{job.salary}</span>
                            </div>
                            <p className="text-sm text-gray-500">Posted {job.postedDate}</p>
                          </div>
                          
                          <div className="flex gap-2 ml-4">
                            {!job.applied ? (
                              <button
                                onClick={() => handleApplyToJob(job.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Apply
                              </button>
                            ) : (
                              <button
                                disabled
                                className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
                              >
                                Applied
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveSavedJob(job.id)}
                              className="text-red-500 hover:text-red-700 transition-colors px-3 py-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-3 text-gray-700">Make my profile visible to recruiters</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-3 text-gray-700">Allow companies to contact me</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-3 text-gray-700">Send me job recommendations</span>
                    </label>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-3 text-gray-700">Email notifications for new jobs</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-3 text-gray-700">Application status updates</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-3 text-gray-700">Weekly newsletter</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                <button 
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={editFormData.firstName || ''}
                    onChange={(e) => setEditFormData({...editFormData, firstName: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={editFormData.lastName || ''}
                    onChange={(e) => setEditFormData({...editFormData, lastName: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editFormData.email || ''}
                  onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={editFormData.phone || ''}
                  onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={editFormData.location || ''}
                  onChange={(e) => setEditFormData({...editFormData, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
                <textarea
                  rows={4}
                  value={editFormData.aboutMe || ''}
                  onChange={(e) => setEditFormData({...editFormData, aboutMe: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                <input
                  type="url"
                  value={editFormData.linkedinProfile || ''}
                  onChange={(e) => setEditFormData({...editFormData, linkedinProfile: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Website</label>
                <input
                  type="url"
                  value={editFormData.portfolioWebsite || ''}
                  onChange={(e) => setEditFormData({...editFormData, portfolioWebsite: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://yourportfolio.com"
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-8">
            <div className="text-center mb-8">
              <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Premium Plan</h2>
              <p className="text-gray-600">Unlock advanced features and boost your career</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Job Seeker Premium */}
              <div className="border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Job Seeker Premium</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-1">₹1,700</div>
                  <p className="text-gray-500">per month</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Unlimited job applications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Priority profile visibility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Advanced job filters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Resume builder tools</span>
                  </li>
                </ul>
                
                <button
                  onClick={() => handleUpgradeClick('jobseeker')}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Upgrade Now
                </button>
              </div>

              {/* Employer Premium */}
              <div className="border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Employer Premium</h3>
                  <div className="text-3xl font-bold text-purple-600 mb-1">₹8,500</div>
                  <p className="text-gray-500">per month</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-700">Unlimited job postings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-700">Advanced candidate search</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-700">Priority job placement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-700">Analytics dashboard</span>
                  </li>
                </ul>
                
                <button
                  onClick={() => handleUpgradeClick('employer')}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Upgrade Now
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowUpgradeModal(false)}
              className="mt-6 w-full text-gray-500 hover:text-gray-700 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;