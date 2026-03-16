const Resume     = require('../models/Resume');
const pdfService = require('../services/pdfService');

// GET /api/resumes
exports.getAll = async (req, res) => {
  try {
    const resumes = await Resume.find().select('title updatedAt createdAt').sort('-updatedAt');
    res.json(resumes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// GET /api/resumes/:id
exports.getOne = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// POST /api/resumes
exports.create = async (req, res) => {
  try {
    const resume = await Resume.create(req.body);
    res.status(201).json(resume);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// PUT /api/resumes/:id
exports.update = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// DELETE /api/resumes/:id
exports.remove = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json({ message: 'Resume deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// GET /api/resumes/:id/pdf
exports.exportPdf = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });

    const pdfBuffer = await pdfService.generate(resume.toObject());

    const name = resume.personalInfo?.name
      ? resume.personalInfo.name.replace(/\s+/g, '_')
      : 'resume';

    res.set({
      'Content-Type':        'application/pdf',
      'Content-Disposition': `attachment; filename="${name}_resume.pdf"`,
      'Content-Length':      pdfBuffer.length,
    });
    res.send(pdfBuffer);
  } catch (e) {
    console.error('PDF generation error:', e);
    res.status(500).json({ error: e.message });
  }
};
