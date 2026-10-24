import { useState } from 'react';
import { FileSearch, Send, Loader2, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export function PrivacyAnalyzerScreenPro() {
  const [policyText, setPolicyText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!policyText.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    try {
      // Need to import aiApi at the top: import { aiApi } from '../../lib/api';
      const { aiApi } = await import('../../lib/api');
      const response = await aiApi.analyzePolicy(policyText);
      
      setResults({
        trustScore: response.score || 5,
        riskLevel: response.score >= 7 ? 'Safe' : response.score >= 4 ? 'Caution' : 'Avoid',
        summary: response.summary || 'Analysis complete.',
        dataSharing: [response.dataSharing || 'Unknown sharing practices'],
        thirdParty: response.keyRisks || ['Review policy carefully'],
        userControl: ['AI evaluation complete. Review the actual policy text for full user control options.']
      });
      setShowResults(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze policy');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-5 pt-12 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <FileSearch className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl text-slate-800">Policy Analyzer</h1>
          </div>
          <p className="text-sm text-slate-500">AI-powered privacy assessment</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="px-5 py-5">
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <label className="block text-xs text-slate-600 uppercase tracking-wide mb-3">
            Privacy Policy Text
          </label>
          
          <textarea
            value={policyText}
            onChange={(e) => setPolicyText(e.target.value)}
            placeholder="Paste privacy policy text here for analysis..."
            rows={6}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />

          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              {policyText.length} characters
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!policyText.trim() || isAnalyzing}
              className={`px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm transition-colors ${
                !policyText.trim() || isAnalyzing
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Analyze
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isAnalyzing && (
        <div className="px-5">
          <div className="bg-white border border-slate-200 rounded-lg p-8 text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
            </div>
            <div className="text-sm text-slate-800 mb-1">Analyzing Privacy Policy</div>
            <div className="text-xs text-slate-500">Processing with AI engine...</div>
          </div>
        </div>
      )}

      {/* Results */}
      {showResults && !isAnalyzing && (
        <div className="px-5 space-y-3">
          {/* Score Summary */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Trust Score</div>
                <div className="text-3xl text-amber-600">{results.trustScore}<span className="text-lg text-slate-400">/10</span></div>
              </div>
              <div className="px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-sm">
                {results.riskLevel}
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {results.summary}
            </p>
          </div>

          {/* Data Sharing */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <div className="text-sm text-slate-800">Data Sharing Practices</div>
                <div className="text-xs text-slate-500">Moderate risk detected</div>
              </div>
            </div>
            
            <div className="space-y-2">
              {results.dataSharing.map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Third Party */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Info className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-slate-800">Third-Party Involvement</div>
                <div className="text-xs text-slate-500">Multiple partners identified</div>
              </div>
            </div>
            
            <div className="space-y-2">
              {results.thirdParty.map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Control */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="text-sm text-slate-800">User Control Options</div>
                <div className="text-xs text-slate-500">Adequate controls available</div>
              </div>
            </div>
            
            <div className="space-y-2">
              {results.userControl.map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!showResults && !isAnalyzing && (
        <div className="px-5">
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileSearch className="w-8 h-8 text-slate-400" />
            </div>
            <div className="text-sm text-slate-800 mb-2">No Analysis Yet</div>
            <div className="text-xs text-slate-500 max-w-xs mx-auto">
              Paste a privacy policy above to receive AI-powered insights and risk assessment
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
