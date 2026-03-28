const geminiService = require('../services/geminiService');

// POST /api/ai/suggestions
exports.getSuggestions = async (req, res) => {
  try {
    const { jobRole, context } = req.body;
    if (!jobRole || !jobRole.trim()) {
      return res.status(400).json({ error: 'jobRole is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'Gemini API key not configured. Add GEMINI_API_KEY to your .env file.',
      });
    }

    const bullets = await geminiService.getSuggestions(jobRole.trim(), context || '');
    res.json({ bullets });
  } catch (e) {
    console.error('AI suggestion error:', e.message);
    res.status(500).json({ error: e.message });
  }
};

// POST /api/ai/improve
exports.improveSummary = async (req, res) => {
  try {
    const { summary, jobRole } = req.body;
    if (!summary) return res.status(400).json({ error: 'summary is required' });

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'Gemini API key not configured.' });
    }

    const improved = await geminiService.improveSummary(summary, jobRole || '');
    res.json({ improved });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
