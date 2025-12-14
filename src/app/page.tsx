'use client'

import { useState } from 'react'
import { Upload, CheckCircle, Zap, Shield, ArrowRight } from 'lucide-react'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      if (selectedFile.type === 'text/plain') {
        const text = await selectedFile.text()
        setResumeText(text)
      }
    }
  }

  const handleSubmit = async () => {
    if (!email || (!resumeText && !file)) return
    setLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('resumeText', resumeText)
      formData.append('jobDescription', jobDescription)
      if (file) formData.append('file', file)

      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        body: formData,
      })
      
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl font-bold mb-8 tracking-tight">
            Resume<span className="text-yellow-300">ATS</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Get Past the Robots.<br />Land the Interview.
          </h1>
          <p className="text-xl opacity-90 mb-8">
            75% of resumes are rejected by ATS before a human sees them.
            <br />Our AI rewrites yours to beat the system.
          </p>
          <div className="flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={20} />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={20} />
              <span>ATS-Optimized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="max-w-2xl mx-auto -mt-10 px-4">
        <div className="bg-white rounded-2xl card-shadow p-8">
          <div className="text-center mb-6">
            <span className="bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-medium">
              Only $4.99
            </span>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste Your Resume
                </label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume text here..."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>
              
              <button
                onClick={() => setStep(2)}
                disabled={!email || !resumeText}
                className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue <ArrowRight size={20} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Job Description (Optional - for better optimization)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job posting you're applying to..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-4 border border-gray-200 rounded-lg font-medium hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Optimize My Resume - $4.99'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Social Proof */}
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <p className="text-gray-500 mb-8">Trusted by job seekers worldwide</p>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-bold text-primary-600">3x</div>
            <div className="text-gray-600">More Interviews</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600">10K+</div>
            <div className="text-gray-600">Resumes Optimized</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600">95%</div>
            <div className="text-gray-600">ATS Pass Rate</div>
          </div>
        </div>
      </div>
    </main>
  )
}

