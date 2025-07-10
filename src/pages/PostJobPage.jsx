import React, { useState } from 'react';
import { ArrowLeft, Building2, MapPin, DollarSign, Clock, Users, Save, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const PostJobPage = () => {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    experience: 'Mid Level',
    salary: {
      min: '',
      max: '',
      currency: 'INR'
    },
    description: '',
    requirements: [''],
    responsibilities: [''],
    benefits: [''],
    skills: '',
    remote: false,
    urgent: false,
    featured: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setJobData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setJobData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setJobData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setJobData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setJobData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    alert('Job posted successfully! It will be reviewed and published within 24 hours.');
    // Reset form or redirect
  };

  const JobPreview = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{jobData.title || 'Job Title'}</h1>
          <p className="text-xl text-blue-600 font-medium">{jobData.company || 'Company Name'}</p>
          <div className="flex items-center space-x-4 mt-2 text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{jobData.location || 'Location'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{jobData.type}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{jobData.experience}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {jobData.salary.min && jobData.salary.max 
              ? `₹${parseInt(jobData.salary.min).toLocaleString()} - ₹${parseInt(jobData.salary.max).toLocaleString()}`
              : 'Salary Range'
            }
          </div>
          <div className="text-sm text-gray-600">per year</div>
        </div>
      </div>

      {jobData.description && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{jobData.description}</p>
        </div>
      )}

      {jobData.requirements.some(req => req.trim()) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
          <ul className="space-y-2">
            {jobData.requirements.filter(req => req.trim()).map((req, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {jobData.responsibilities.some(resp => resp.trim()) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h3>
          <ul className="space-y-2">
            {jobData.responsibilities.filter(resp => resp.trim()).map((resp, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {jobData.benefits.some(benefit => benefit.trim()) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {jobData.benefits.filter(benefit => benefit.trim()).map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-emerald-50 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setPreviewMode(false)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Edit</span>
              </button>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setPreviewMode(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Edit Job
                </button>
                <button 
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Publish Job
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <JobPreview />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            to="/jobs"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Jobs</span>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Post a Job</h1>
              <p className="text-gray-600 mt-2">Find the perfect candidate for your team</p>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setPreviewMode(true)}
                className="flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button 
                onClick={handleSubmit}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Publish Job</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                <input
                  type="text"
                  value={jobData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input
                  type="text"
                  value={jobData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  value={jobData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, State or Remote"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
                <select
                  value={jobData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
                <select
                  value={jobData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills/Technologies</label>
                <input
                  type="text"
                  value={jobData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, Node.js, Python (comma separated)"
                />
              </div>
            </div>
          </div>

          {/* Salary Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Salary Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Salary</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">₹</span>
                  <input
                    type="number"
                    value={jobData.salary.min}
                    onChange={(e) => handleInputChange('salary.min', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="6640000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Salary</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">₹</span>
                  <input
                    type="number"
                    value={jobData.salary.max}
                    onChange={(e) => handleInputChange('salary.max', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="9960000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  value={jobData.salary.currency}
                  onChange={(e) => handleInputChange('salary.currency', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Job Description</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                rows={6}
                value={jobData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
              />
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Requirements</h2>
            
            <div className="space-y-3">
              {jobData.requirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. 3+ years of React experience"
                  />
                  {jobData.requirements.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('requirements', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem('requirements')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add Requirement
              </button>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Key Responsibilities</h2>
            
            <div className="space-y-3">
              {jobData.responsibilities.map((resp, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Develop and maintain frontend applications"
                  />
                  {jobData.responsibilities.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('responsibilities', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem('responsibilities')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add Responsibility
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Benefits & Perks</h2>
            
            <div className="space-y-3">
              {jobData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Health insurance, 401k matching"
                  />
                  {jobData.benefits.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('benefits', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem('benefits')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add Benefit
              </button>
            </div>
          </div>

          {/* Additional Options */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Additional Options</h2>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={jobData.remote}
                  onChange={(e) => handleInputChange('remote', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">Remote work available</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={jobData.urgent}
                  onChange={(e) => handleInputChange('urgent', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">Urgent hiring (appears with urgent badge)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={jobData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">Featured job (+$50 - appears at top of listings)</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Link
              to="/jobs"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setPreviewMode(true)}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button 
                onClick={handleSubmit}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Publish Job</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;