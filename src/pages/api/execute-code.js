// API endpoint for code execution using Judge0
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { code, language, input = '' } = req.body

  if (!code || !language) {
    return res.status(400).json({ error: 'Code and language are required' })
  }

  try {
    // Judge0 language mapping
    const languageMap = {
      'javascript': 63, // Node.js
      'js': 63,
      'python': 71,     // Python 3
      'py': 71,
      'cpp': 54,        // C++ (GCC 9.2.0)
      'c++': 54
    }

    const languageId = languageMap[language.toLowerCase()]
    if (!languageId) {
      return res.status(400).json({ error: `Language ${language} not supported` })
    }

    // Judge0 API configuration
    const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com'
    const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY // Set in environment variables
    
    // If no API key, return error for C++ (JavaScript and Python can run client-side)
    if (!JUDGE0_API_KEY && (language === 'cpp' || language === 'c++')) {
      return res.status(503).json({ 
        error: 'C++ execution service temporarily unavailable. Please configure Judge0 API key.',
        output: 'C++ execution requires server-side processing. Please contact administrator to enable this feature.'
      })
    }

    // Submit code for execution
    const submissionResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': JUDGE0_API_KEY || '',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      body: JSON.stringify({
        language_id: languageId,
        source_code: code,
        stdin: input,
        cpu_time_limit: 5,      // 5 seconds max
        memory_limit: 128000,   // 128MB max
        wall_time_limit: 10     // 10 seconds max wall time
      })
    })

    if (!submissionResponse.ok) {
      throw new Error(`Judge0 API error: ${submissionResponse.status}`)
    }

    const result = await submissionResponse.json()

    // Format response
    const response = {
      status: result.status,
      stdout: result.stdout ? Buffer.from(result.stdout, 'base64').toString() : '',
      stderr: result.stderr ? Buffer.from(result.stderr, 'base64').toString() : '',
      compile_output: result.compile_output ? Buffer.from(result.compile_output, 'base64').toString() : '',
      message: result.message || '',
      time: result.time || '0',
      memory: result.memory || '0'
    }

    // Check if execution was successful
    if (result.status?.id === 3) { // Accepted
      response.success = true
      response.output = response.stdout || 'Code executed successfully'
    } else {
      response.success = false
      response.output = response.stderr || response.compile_output || response.message || 'Execution failed'
    }

    res.status(200).json(response)
  } catch (error) {
    console.error('Code execution error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      output: `Execution Error: ${error.message}`,
      success: false
    })
  }
} 