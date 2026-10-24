import { useState } from 'react';
import { FileSearch, Link as LinkIcon, Sparkles, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export function PrivacyAnalyzerScreen() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  // Mock analysis results
  const analysisResults = {
    overallScore: 6.5,
    dataSharing: {
      status: 'caution',
      title: 'Moderate Data Sharing',
      details: [
        'Shares user data with 15+ third-party partners',
        'Collects browsing history and purchase data',
        'Uses cookies for advertising purposes',
        'Shares anonymized analytics with parent company'
      ]
    },
    thirdParty: {
      status: 'warning',
      title: 'Extensive Third-Party Network',
      details: [
        'Google Analytics for user behavior tracking',
        'Facebook Pixel for ad targeting',
        'Amazon Web Services for data storage',
        'Salesforce for customer relationship management',
        '11 additional advertising partners'
      ]
    },
    userControl: {
      status: 'good',
      title: 'Good User Control Options',
      details: [
        'Users can request data deletion within 30 days',
        'Opt-out options available for marketing emails',
        'Can download personal data in JSON format',
        'Privacy dashboard for managing preferences'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white px-6 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileSearch className="w-8 h-8" />
          <h1 className="text-2xl">Privacy Analyzer</h1>
        </div>
        <p className="text-sm opacity-90">
          AI-powered privacy policy analysis
        </p>
      </div>

      {/* Input Section */}
      <div className="px-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <label className="block text-sm text-gray-700 mb-3">
            Privacy Policy URL
          </label>
          
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/privacy-policy"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!url || isAnalyzing}
            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-colors ${
              !url || isAnalyzing
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
          </button>

          {/* Quick Examples */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-2">Quick examples:</div>
            <div className="flex flex-wrap gap-2">
              {['Instagram', 'Twitter', 'Amazon'].map((example) => (
                <button
                  key={example}
                  onClick={() => setUrl(`https://${example.toLowerCase()}.com/privacy`)}
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isAnalyzing && (
        <div className="px-6">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" />
            </div>
            <div className="text-gray-900 mb-2">Analyzing Privacy Policy</div>
            <div className="text-sm text-gray-500">
              Our AI is reading through the policy...
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {showResults && !isAnalyzing && (
        <div className="px-6 space-y-4">
          {/* Overall Score */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Privacy Score</div>
              <div className="text-5xl text-yellow-600 mb-2">
                {analysisResults.overallScore}
                <span className="text-2xl text-gray-400">/10</span>
              </div>
              <div className="text-sm text-gray-600">
                Moderate privacy protection
              </div>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg text-gray-900 mb-1">Data Sharing Practices</h3>
                <p className="text-sm text-gray-600">{analysisResults.dataSharing.title}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {analysisResults.dataSharing.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Third-Party Involvement */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg text-gray-900 mb-1">Third-Party Involvement</h3>
                <p className="text-sm text-gray-600">{analysisResults.thirdParty.title}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {analysisResults.thirdParty.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Control */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg text-gray-900 mb-1">User Control</h3>
                <p className="text-sm text-gray-600">{analysisResults.userControl.title}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {analysisResults.userControl.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
            <h3 className="text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              AI Recommendations
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">
                  Review and adjust privacy settings in your account dashboard
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">
                  Opt out of third-party data sharing where possible
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">
                  Consider using a privacy-focused alternative if available
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!showResults && !isAnalyzing && (
        <div className="px-6">
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileSearch className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-gray-900 mb-2">No Analysis Yet</div>
            <div className="text-sm text-gray-500 max-w-xs mx-auto">
              Enter a privacy policy URL above to get AI-powered insights about data practices
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
