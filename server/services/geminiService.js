const { GoogleGenerativeAI } = require('@google/generative-ai');

function getClient() {
  if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not set');
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

/**
 * Generate resume bullet points for a given job role.
 */
exports.getSuggestions = async (jobRole, context = '') => {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  const prompt = `
You are a professional resume writer with 10+ years of experience.
Generate exactly 6 strong, concise resume bullet points for a "${jobRole}" role.
${context ? `Additional context: ${context}` : ''}

Requirements:
- Each bullet must start with a powerful action verb (e.g., Developed, Optimized, Led, Built, Reduced)
- Include specific, quantifiable achievements where possible (%, numbers, metrics)
- Keep each bullet under 20 words
- Make them ATS-friendly with relevant keywords

Return ONLY a valid JSON array of strings, no markdown, no explanation, no backticks.
Example format: ["Built REST APIs with Node.js and Express serving 10k+ requests/day", "Reduced database query time by 40% through indexing"]
`;

  const result = await model.generateContent(prompt);
  const text   = result.response.text().trim();
  const clean  = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
};

/**
 * Improve/rewrite a professional summary.
 */
exports.improveSummary = async (summary, jobRole = '') => {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  const prompt = `
You are a professional resume writer.
Improve this professional summary${jobRole ? ` for a ${jobRole} role` : ''}:

"${summary}"

Requirements:
- Keep it under 3 sentences
- Make it impactful and specific
- Use active voice
- Highlight key value proposition

Return ONLY the improved summary text, no quotes, no explanation.
`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
};
