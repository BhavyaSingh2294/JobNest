import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, Briefcase, Calendar, Edit3, Save, X, Camera, Award, Star } from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setEditData(userData);
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

  const mockSavedJobs = [
    {
      id: 1,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      salary: '$85k - $115k',
      savedDate: '2024-01-16'
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'Analytics Plus',
      location: 'Boston, MA',
      salary: '$90k - $130k',
      savedDate: '2024-01-14'
    }
  ];

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
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
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
                    <span className="font-semibold text-gray-900">2</span>
                  </div>
                </div>
              </div>

              {/* Account Type */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-3">Account Type</h3>
                <p className="text-blue-100 mb-4 text-sm capitalize">
                  {user.userType} Account
                </p>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                  Upgrade Account
                </button>
              </div>
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
              {mockSavedJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-red-500 hover:text-red-700">
                        <X className="w-5 h-5" />
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;