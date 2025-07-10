import React, { useState, useEffect } from 'react';
import { Camera, Upload, Plus, X, MapPin, Calendar, Briefcase, Crown, Star, Trash2, ExternalLink } from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    location: 'Mumbai, India',
    userType: 'jobseeker',
    profilePicture: null,
    resume: null,
    subscription: null
  });

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedExperiences = localStorage.getItem('experiences');
    const savedJobsData = localStorage.getItem('savedJobs');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedExperiences) {
      setExperiences(JSON.parse(savedExperiences));
    }
    if (savedJobsData) {
      setSavedJobs(JSON.parse(savedJobsData));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser(prev => ({
          ...prev,
          profilePicture: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUser(prev => ({
        ...prev,
        resume: {
          name: file.name,
          size: file.size,
          uploadDate: new Date().toLocaleDateString()
        }
      }));
    }
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setExperiences([...experiences, newExperience]);
  };

  const updateExperience = (id, field, value) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const deleteExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const removeSavedJob = (jobId) => {
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
  };

  const handlePayment = (planType) => {
    // Open Razorpay.me links based on plan type
    if (planType === 'jobseeker') {
      window.open('https://razorpay.me/@bharatbhushannathsharma?amount=01vVMe2nRmlnNjFkqNNI6w%3D%3D', '_blank');
    } else if (planType === 'employer') {
      window.open('https://razorpay.me/@bharatbhushannathsharma?amount=YZdaFwx2QK8VytVM0yRD2w%3D%3D', '_blank');
    }
    setShowUpgradeModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden shadow-lg">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-white">
                    {(user.firstName && user.lastName) 
                      ? `${user.firstName[0]}${user.lastName[0]}` 
                      : user.name ? user.name.split(' ').map(n => n[0]).join('') : 'JD'
                    }
                  </span>
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 bg-white border-2 border-gray-200 text-gray-600 p-3 rounded-full cursor-pointer hover:bg-gray-50 transition-colors shadow-lg">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {(user.firstName && user.lastName) 
                    ? `${user.firstName} ${user.lastName}` 
                    : user.name || 'John Doe'
                  }
                </h1>
                {user.subscription?.status === 'active' && (
                  <Crown className="w-6 h-6 text-yellow-500" />
                )}
              </div>
              <p className="text-lg text-gray-600 mt-1">{user.email}</p>
              <div className="flex items-center space-x-4 mt-2 text-gray-600">
                <div className="flex items-center space-x-1">
                  <span className="text-gray-500">📞</span>
                  <span>{user.phone}</span>
                </div>
              </div>
              <p className="text-gray-600 flex items-center mt-2">
                <MapPin className="w-4 h-4 mr-1" />
                {user.location}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.userType === 'employer' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {user.userType === 'employer' ? 'Employer' : 'Job Seeker'}
                </span>
                {user.subscription?.status === 'active' && (
                  <span className="ml-2 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    ✨ Premium Active
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Resume Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-blue-600" />
                Resume
              </h2>
              {user.resume ? (
                <div className="flex items-center justify-between p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.resume.name}</p>
                      <p className="text-sm text-gray-500">
                        Uploaded on {user.resume.uploadDate}
                      </p>
                    </div>
                  </div>
                  <label className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium">
                    Replace
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload your resume</h3>
                  <p className="text-gray-600 mb-4">PDF, DOC, or DOCX files only (Max 5MB)</p>
                  <span className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">Choose File</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Work Experience
                </h2>
                <button
                  onClick={addExperience}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              {experiences.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No work experience added yet</h3>
                  <p className="text-gray-600 mb-6">Add your work experience to showcase your professional journey</p>
                  <button
                    onClick={addExperience}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Add Your First Experience
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="border border-gray-200 rounded-xl p-6 hover:border-blue-200 transition-colors">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={exp.jobTitle}
                          onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label className="text-sm text-gray-700">Currently working here</label>
                        </div>
                        <input
                          type="month"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {!exp.current && (
                          <input
                            type="month"
                            placeholder="End Date"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        )}
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => deleteExperience(exp.id)}
                          className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Saved Jobs Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Star className="w-5 h-5 mr-2 text-blue-600" />
                Saved Jobs
              </h2>
              {savedJobs.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">No saved jobs yet</h3>
                  <p className="text-xs text-gray-600">Jobs you save will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedJobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
                      <div className="flex items-start space-x-3">
                        <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm truncate">{job.title}</h3>
                          <p className="text-sm text-gray-600 truncate">{job.company}</p>
                          <p className="text-xs text-gray-500 mt-1">{job.location} • {job.salary}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-3">
                        <button className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1">
                          <ExternalLink className="w-3 h-3" />
                          <span>Apply</span>
                        </button>
                        <button
                          onClick={() => removeSavedJob(job.id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Account Type Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Crown className="w-5 h-5 mr-2 text-blue-600" />
                Account Type
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Current Plan</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {user.subscription?.status === 'active' ? user.subscription.plan : 'Free'}
                    </span>
                  </div>
                  {user.subscription?.status === 'active' && (
                    <p className="text-xs text-green-600">
                      Active since {new Date(user.subscription.startDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {user.subscription?.status !== 'active' && (
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center space-x-2 font-medium"
                  >
                    <Crown className="w-4 h-4" />
                    <span>Upgrade Account</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Choose Your Premium Plan</h2>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Job Seeker Premium */}
                <div className="border-2 border-blue-200 rounded-lg p-6 relative">
                  <div className="absolute -top-3 left-6 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Job Seeker Premium</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-1">₹1,577</div>
                    <div className="text-gray-500">per month</div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Priority job applications</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Advanced salary insights</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Resume optimization tools</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Direct messaging with recruiters</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Job alerts & notifications</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Profile visibility boost</span>
                    </li>
                  </ul>
                  
                  <button
                    onClick={() => handlePayment('jobseeker')}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Upgrade Now
                  </button>
                </div>

                {/* Employer Premium */}
                <div className="border-2 border-purple-200 rounded-lg p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Employer Premium</h3>
                    <div className="text-3xl font-bold text-purple-600 mb-1">₹8,217</div>
                    <div className="text-gray-500">per month</div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Unlimited job postings</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Advanced candidate filtering</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Priority job listing placement</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Detailed analytics & insights</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Bulk messaging to candidates</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Company branding options</span>
                    </li>
                  </ul>
                  
                  <button
                    onClick={() => handlePayment('employer')}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
                      <input
                        type="month"
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved Jobs Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Jobs</h2>
          {savedJobs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No saved jobs yet.</p>
          ) : (
            <div className="space-y-4">
              {savedJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                      <p className="text-sm text-gray-500">{job.location} • {job.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1">
                      <ExternalLink className="w-4 h-4" />
                      <span>Apply</span>
                    </button>
                    <button
                      onClick={() => removeSavedJob(job.id)}
                      className="text-red-600 hover:text-red-800 transition-colors p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Type Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Type</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">
                Current Plan: <span className="font-medium">
                  {user.subscription?.status === 'active' ? user.subscription.plan : 'Free'}
                </span>
              </p>
              {user.subscription?.status === 'active' && (
                <p className="text-sm text-green-600">
                  Active since {new Date(user.subscription.startDate).toLocaleDateString()}
                </p>
              )}
            </div>
            {user.subscription?.status !== 'active' && (
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center space-x-2"
              >
                <Crown className="w-4 h-4" />
                <span>Upgrade Account</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Choose Your Premium Plan</h2>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Job Seeker Premium */}
                <div className="border-2 border-blue-200 rounded-lg p-6 relative">
                  <div className="absolute -top-3 left-6 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Job Seeker Premium</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-1">₹1,577</div>
                    <div className="text-gray-500">per month</div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Priority job applications</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Advanced salary insights</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Resume optimization tools</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Direct messaging with recruiters</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Job alerts & notifications</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Profile visibility boost</span>
                    </li>
                  </ul>
                  
                  <button
                    onClick={() => handlePayment('jobseeker')}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Upgrade Now
                  </button>
                </div>

                {/* Employer Premium */}
                <div className="border-2 border-purple-200 rounded-lg p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Employer Premium</h3>
                    <div className="text-3xl font-bold text-purple-600 mb-1">₹8,217</div>
                    <div className="text-gray-500">per month</div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Unlimited job postings</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Advanced candidate filtering</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Priority job listing placement</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Detailed analytics & insights</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Bulk messaging to candidates</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Company branding options</span>
                    </li>
                  </ul>
                  
                  <button
                    onClick={() => handlePayment('employer')}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;