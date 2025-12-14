import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function optimizeResume(
  resumeText: string,
  jobDescription?: string
): Promise<string> {
  const systemPrompt = `You are an expert ATS (Applicant Tracking System) resume optimizer. Your job is to rewrite resumes to maximize their ATS compatibility score while maintaining accuracy and professionalism.

Key optimization rules:
1. Use standard section headers: "Professional Summary", "Work Experience", "Education", "Skills", "Certifications"
2. Include relevant keywords naturally throughout
3. Use simple formatting - no tables, columns, or graphics descriptions
4. Quantify achievements with numbers and percentages
5. Use action verbs at the start of bullet points
6. Match job description keywords when provided
7. Keep formatting clean and parseable
8. Remove any unusual characters or symbols
9. Ensure dates are in consistent format (MM/YYYY)
10. List skills as comma-separated keywords for easy parsing`

  const userPrompt = jobDescription
    ? `Optimize this resume for ATS systems, specifically targeting this job description:

JOB DESCRIPTION:
${jobDescription}

RESUME TO OPTIMIZE:
${resumeText}

Return ONLY the optimized resume text, ready to copy. Include an ATS Score estimate (0-100) at the top.`
    : `Optimize this resume for ATS systems:

RESUME TO OPTIMIZE:
${resumeText}

Return ONLY the optimized resume text, ready to copy. Include an ATS Score estimate (0-100) at the top.`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_tokens: 4000,
    temperature: 0.3,
  })

  return completion.choices[0].message.content || ''
}

