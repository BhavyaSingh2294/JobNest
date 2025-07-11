import React, { useState, useEffect } from 'react';
import { Camera, Upload, Briefcase, Star, Crown, MapPin, Phone, Mail, Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    accountType: 'free',
    profilePicture: null
  });

  const [workExperience, setWorkExperience] = useState([]);
  const [savedJobs, setSavedJobs] = useState([
    { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp', location: 'Mumbai', salary: '₹15-20 LPA' },
    { id: 2, title: 'Product Manager', company: 'StartupXYZ', location: 'Bangalore', salary: '₹25-30 LPA' }
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
    const savedUser = localStorage.getItem('currentUser');
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
              
              <div className="space-y-2 text-gray-600">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Resume Upload */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Upload className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Resume</h2>
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
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
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{exp.position}</h3>
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
                <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-4">Add Work Experience</h3>
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
          <div className="space-y-8">
            {/* Saved Jobs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Saved Jobs</h2>
              </div>

              {savedJobs.length === 0 ? (
                <div className="text-center py-8">
                  <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No saved jobs yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedJobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 text-sm">{job.title}</h3>
                      <p className="text-blue-600 text-sm font-medium">{job.company}</p>
                      <p className="text-gray-500 text-xs">{job.location}</p>
                      <p className="text-green-600 text-xs font-medium">{job.salary}</p>
                      <div className="flex gap-2 mt-3">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          Apply
                        </button>
                        <button
                          onClick={() => handleRemoveSavedJob(job.id)}
                          className="text-red-500 hover:text-red-700 transition-colors text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Account Type */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Account Type</h2>
              </div>
              
              <div className="text-center">
                {user.accountType === 'premium' ? (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                    <Crown className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-semibold text-yellow-800">Premium Account</p>
                    <p className="text-sm text-yellow-600">Enjoy unlimited access</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
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
      </div>

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
                  <div className="text-3xl font-bold text-blue-600 mb-1">₹1,577</div>
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
                  <div className="text-3xl font-bold text-purple-600 mb-1">₹8,217</div>
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