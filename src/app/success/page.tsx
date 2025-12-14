'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Download, Loader2, Copy, RefreshCw } from 'lucide-react'

type Order = {
  id: string
  status: string
  optimized_resume: string | null
  created_at: string
  completed_at: string | null
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const fetchOrder = async () => {
    if (!orderId) return
    try {
      const res = await fetch(`/api/order/${orderId}`)
      const data = await res.json()
      setOrder(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrder()
    // Poll for updates if still processing
    const interval = setInterval(() => {
      if (order?.status === 'processing' || order?.status === 'paid') {
        fetchOrder()
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [orderId, order?.status])

  const copyToClipboard = () => {
    if (order?.optimized_resume) {
      navigator.clipboard.writeText(order.optimized_resume)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadAsText = () => {
    if (order?.optimized_resume) {
      const blob = new Blob([order.optimized_resume], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'optimized-resume.txt'
      a.click()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-600" size={48} />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Order not found</p>
      </div>
    )
  }

  const isProcessing = order.status === 'processing' || order.status === 'paid'
  const isCompleted = order.status === 'completed'

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-4">
          <a href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
            Resume<span className="text-primary-600">ATS</span>
          </a>
        </div>
        <div className="text-center mb-8">
          {isCompleted ? (
            <>
              <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Optimized Resume is Ready!
              </h1>
              <p className="text-gray-600">
                Copy it below or download as a text file
              </p>
            </>
          ) : (
            <>
              <Loader2 className="mx-auto text-primary-600 animate-spin mb-4" size={64} />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Optimizing Your Resume...
              </h1>
              <p className="text-gray-600">
                Our AI is analyzing and rewriting your resume. This usually takes 30-60 seconds.
              </p>
            </>
          )}
        </div>

        {isCompleted && order.optimized_resume && (
          <div className="bg-white rounded-2xl card-shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-900">Optimized Resume</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
                >
                  <Copy size={16} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={downloadAsText}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg max-h-[600px] overflow-y-auto font-mono">
              {order.optimized_resume}
            </pre>
          </div>
        )}

        {isProcessing && (
          <div className="bg-white rounded-2xl card-shadow p-6 text-center">
            <RefreshCw className="mx-auto text-primary-600 animate-spin mb-4" size={32} />
            <p className="text-gray-600">Checking for updates automatically...</p>
          </div>
        )}
      </div>
    </main>
  )
}

