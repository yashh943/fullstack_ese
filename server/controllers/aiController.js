import axios from 'axios';
import Employee from '../models/Employee.js';

// OpenRouter API URL
const AI_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Updated working free models
const FREE_MODELS = [
  'meta-llama/llama-3.2-3b-instruct:free',
  'google/gemma-4-31b-it:free',
  'qwen/qwen3-coder:free',
  'openai/gpt-oss-20b:free',
  'z-ai/glm-4.5-air:free'
];

// Helper function with fallback models
const callOpenRouterWithFallback = async (prompt) => {
  let lastError = null;

  // Check API key first
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error(
      'OPENROUTER_API_KEY missing in .env file'
    );
  }

  console.log('OpenRouter API Key Loaded');

  for (const model of FREE_MODELS) {
    try {
      console.log(`Trying model: ${model}`);

      const response = await axios.post(
        AI_API_URL,
        {
          model: model,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:5173',
            'X-Title': 'AI Employee Analytics',
          },
          timeout: 30000,
        }
      );

      // Success response
      if (
        response.data &&
        response.data.choices &&
        response.data.choices.length > 0
      ) {
        console.log(`Success with ${model}`);

        return response.data.choices[0].message.content;
      }
    } catch (error) {
      lastError = error;

      console.log(
        `Failed Model: ${model}`
      );

      console.log(
        error.response?.data || error.message
      );

      const statusCode = error.response?.status;

      // Stop retry if API key invalid
      if (statusCode === 401) {
        throw new Error(
          'Invalid OpenRouter API Key'
        );
      }

      continue;
    }
  }

  throw new Error(
    `All AI models failed. Last Error: ${
      lastError?.response?.data?.error?.message ||
      lastError?.message ||
      'Unknown Error'
    }`
  );
};

// =======================================
// AI Recommendation Controller
// =======================================

export const getRecommendation = async (req, res) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(400).json({
        message: 'Employee ID is required',
      });
    }

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        message: 'Employee not found',
      });
    }

    const prompt = `
You are an expert HR Analyst.

Analyze this employee and provide:

1. Performance Summary
2. Promotion Recommendation
3. Training Suggestions
4. Improvement Feedback

Employee Details:

Name: ${employee.name}
Department: ${employee.department}
Skills: ${employee.skills.join(', ')}
Performance Score: ${employee.performanceScore}/100
Experience: ${employee.experience} years

Keep response professional and concise.
`;

    const recommendation =
      await callOpenRouterWithFallback(prompt);

    res.status(200).json({
      success: true,
      recommendation,
    });
  } catch (error) {
    console.error(
      'AI Recommendation Error:',
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        'Failed to generate AI recommendation',
      error: error.message,
    });
  }
};

// =======================================
// AI Employee Ranking Controller
// =======================================

export const rankEmployees = async (req, res) => {
  try {
    const { department } = req.body;

    let query = {};

    if (department && department !== 'All Departments') {
      query.department = department;
    }

    const employees = await Employee.find(query);

    if (!employees.length) {
      return res.status(404).json({
        message: 'No employees found',
      });
    }

    const employeeData = employees
      .map(
        (emp) => `
Name: ${emp.name}
Department: ${emp.department}
Performance Score: ${emp.performanceScore}
Experience: ${emp.experience}
Skills: ${emp.skills.join(', ')}
`
      )
      .join('\n');

    const prompt = `
You are an expert HR Analyst.

Analyze and rank these employees.

Provide:
1. Ranking from best to worst
2. Reason for top performers
3. Skill gap analysis
4. Team improvement suggestions

Employee Data:
${employeeData}

Keep response clear and professional.
`;

    const ranking =
      await callOpenRouterWithFallback(prompt);

    res.status(200).json({
      success: true,
      ranking,
    });
  } catch (error) {
    console.error(
      'AI Ranking Error:',
      error.message
    );

    res.status(500).json({
      success: false,
      message: 'Failed to generate AI ranking',
      error: error.message,
    });
  }
};