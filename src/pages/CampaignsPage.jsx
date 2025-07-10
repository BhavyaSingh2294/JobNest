import React, { useState } from 'react';
import { Target, Plus, Calendar, DollarSign, Users, TrendingUp, Eye, Heart, Share2, Clock, Award, Zap } from 'lucide-react';

const CampaignsPage = () => {
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    title: '',
    category: '',
    goalAmount: '',
    deadline: '',
    story: '',
    media: null,
    rewards: []
  });

  const categories = [
    'Technology & Innovation',
    'Creative Projects',
    'Social Impact',
    'Business & Entrepreneurship',
    'Education & Training',
    'Health & Wellness',
    'Environment & Sustainability',
    'Arts & Culture'
  ];

  const mockCampaigns = [
    {
      id: 1,
      title: 'Revolutionary AI-Powered Job Matching Platform',
      category: 'Technology & Innovation',
      goalAmount: 50000,
      raisedAmount: 32500,
      deadline: '2024-03-15',
      backers: 127,
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      creator: 'TechCorp Solutions',
      featured: true,
      story: 'We are building the next generation of AI-powered job matching that will revolutionize how people find their dream careers.',
      daysLeft: 23
    },
    {
      id: 2,
      title: 'Green Energy Startup Accelerator Program',
      category: 'Environment & Sustainability',
      goalAmount: 75000,
      raisedAmount: 45200,
      deadline: '2024-02-28',
      backers: 89,
      image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      creator: 'EcoGreen Solutions',
      featured: false,
      story: 'Supporting the next wave of green energy startups with mentorship, funding, and resources.',
      daysLeft: 15
    },
    {
      id: 3,
      title: 'Remote Work Training for Underserved Communities',
      category: 'Social Impact',
      goalAmount: 25000,
      raisedAmount: 18750,
      deadline: '2024-04-01',
      backers: 156,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      creator: 'SkillBridge Foundation',
      featured: true,
      story: 'Providing digital skills training and remote work opportunities to underserved communities worldwide.',
      daysLeft: 45
    }
  ];

  const CreateCampaignWizard = () => {
    const handleNext = () => {
      if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
      if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = () => {
      alert('Campaign created successfully! It will be reviewed and published within 24 hours.');
      setShowCreateWizard(false);
      setCurrentStep(1);
      setCampaignData({
        title: '',
        category: '',
        goalAmount: '',
        deadline: '',
        story: '',
        media: null,
        rewards: []
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Campaign Creation Wizard</h2>
              <button 
                onClick={() => setShowCreateWizard(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
              >
                ×
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`flex-1 h-1 mx-2 ${
                        step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Basic Info</span>
                <span>Goals & Timeline</span>
                <span>Story & Media</span>
                <span>Review & Launch</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Title *</label>
                  <input
                    type="text"
                    value={campaignData.title}
                    onChange={(e) => setCampaignData({...campaignData, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Give your campaign a compelling title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    value={campaignData.category}
                    onChange={(e) => setCampaignData({...campaignData, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                  <textarea
                    rows={3}
                    value={campaignData.shortDescription || ''}
                    onChange={(e) => setCampaignData({...campaignData, shortDescription: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your campaign (max 150 characters)"
                    maxLength={150}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Goals & Timeline</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Funding Goal *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={campaignData.goalAmount}
                      onChange={(e) => setCampaignData({...campaignData, goalAmount: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="25000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Deadline *</label>
                  <input
                    type="date"
                    value={campaignData.deadline}
                    onChange={(e) => setCampaignData({...campaignData, deadline: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Use of Funds</label>
                  <textarea
                    rows={4}
                    value={campaignData.useOfFunds || ''}
                    onChange={(e) => setCampaignData({...campaignData, useOfFunds: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Explain how you plan to use the funds..."
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Story & Media</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Story *</label>
                  <textarea
                    rows={8}
                    value={campaignData.story}
                    onChange={(e) => setCampaignData({...campaignData, story: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell your story... What problem are you solving? Why should people support you? What impact will this have?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Image/Video</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <div className="text-gray-600">
                      <p className="mb-2">Upload campaign media</p>
                      <p className="text-sm">Supported formats: JPG, PNG, MP4 (Max 10MB)</p>
                    </div>
                    <input 
                      type="file" 
                      onChange={(e) => setCampaignData({...campaignData, media: e.target.files[0]})}
                      className="hidden" 
                      accept="image/*,video/*" 
                      id="media-upload"
                    />
                    <label htmlFor="media-upload" className="cursor-pointer">
                      {campaignData.media ? (
                        <span className="text-green-600 font-medium">{campaignData.media.name}</span>
                      ) : (
                        <span className="text-blue-600 font-medium">Choose File</span>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Review & Launch</h3>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Campaign Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Title:</span>
                      <span className="font-medium">{campaignData.title || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{campaignData.category || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Goal:</span>
                      <span className="font-medium">${campaignData.goalAmount ? parseInt(campaignData.goalAmount).toLocaleString() : 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deadline:</span>
                      <span className="font-medium">{campaignData.deadline || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Media:</span>
                      <span className="font-medium">{campaignData.media ? 'Uploaded' : 'None'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Before You Launch</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Your campaign will be reviewed within 24 hours</li>
                    <li>• You can edit your campaign until it goes live</li>
                    <li>• Funds are released when you reach your goal</li>
                    <li>• Platform fee: 5% of funds raised</li>
                  </ul>
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-8">
              <button 
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              {currentStep < 4 ? (
                <button 
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && (!campaignData.title || !campaignData.category)) ||
                    (currentStep === 2 && (!campaignData.goalAmount || !campaignData.deadline)) ||
                    (currentStep === 3 && !campaignData.story)
                  }
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  Next
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  Launch Campaign
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CampaignCard = ({ campaign }) => {
    const progressPercentage = (campaign.raisedAmount / campaign.goalAmount) * 100;
    
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
        <div className="relative">
          <img 
            src={campaign.image} 
            alt={campaign.title}
            className="w-full h-48 object-cover"
          />
          {campaign.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                Featured
              </span>
            </div>
          )}
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
            {campaign.daysLeft} days left
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-3">
            <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
              {campaign.category}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {campaign.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {campaign.story}
          </p>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
              <div className="text-lg font-bold text-gray-900">
                ${campaign.raisedAmount.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">Raised</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">
                ${campaign.goalAmount.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">Goal</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">
                {campaign.backers}
              </div>
              <div className="text-xs text-gray-600">Backers</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              by <span className="font-medium text-gray-900">{campaign.creator}</span>
            </div>
            <div className="flex space-x-2">
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-blue-500 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            Back This Campaign
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Campaign Creation Hub
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Launch innovative campaigns, raise funds for your projects, and connect with supporters who believe in your vision.
            </p>
            
            <button 
              onClick={() => setShowCreateWizard(true)}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Target className="w-6 h-6" />
              <span>Create Campaign</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">$2.4M</div>
              <div className="text-sm text-gray-600">Total Raised</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-gray-600">Active Campaigns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">89%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">12k+</div>
              <div className="text-sm text-gray-600">Supporters</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Campaigns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Campaigns</h2>
          <button 
            onClick={() => setShowCreateWizard(true)}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Start Your Campaign</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Launch your campaign in 4 simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Your Goal</h3>
              <p className="text-gray-600">Define your funding target and campaign timeline</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tell Your Story</h3>
              <p className="text-gray-600">Share your vision and why people should support you</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Community</h3>
              <p className="text-gray-600">Engage with supporters and build momentum</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Achieve Success</h3>
              <p className="text-gray-600">Reach your goal and bring your project to life</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Campaign Wizard Modal */}
      {showCreateWizard && <CreateCampaignWizard />}
    </div>
  );
};

export default CampaignsPage;