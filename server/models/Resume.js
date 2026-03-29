const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  institution: { type: String, default: '' },
  degree:      { type: String, default: '' },
  field:       { type: String, default: '' },
  startDate:   { type: String, default: '' },
  endDate:     { type: String, default: '' },
  gpa:         { type: String, default: '' },
}, { _id: true });

const ExperienceSchema = new mongoose.Schema({
  company:   { type: String, default: '' },
  role:      { type: String, default: '' },
  location:  { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate:   { type: String, default: '' },
  current:   { type: Boolean, default: false },
  bullets:   [{ type: String }],
}, { _id: true });

const ProjectSchema = new mongoose.Schema({
<<<<<<< HEAD
  name:         { type: String, default: '' },
  description:  { type: String, default: '' },
  technologies: { type: String, default: '' },
  link:         { type: String, default: '' },
}, { _id: true });

const ResumeSchema = new mongoose.Schema({
  owner: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',
    required: true,
    index:    true,
  },

  title: { type: String, default: 'Untitled Resume' },

  // Language used when this resume was last saved — drives PDF section labels
  lang: { type: String, default: 'en', enum: ['en', 'fr', 'ar', 'es'] },

=======
  name:        { type: String, default: '' },
  description: { type: String, default: '' },
  technologies:{ type: String, default: '' },
  link:        { type: String, default: '' },
}, { _id: true });

const ResumeSchema = new mongoose.Schema({
  title: { type: String, default: 'Untitled Resume' },

>>>>>>> 1b585c7 (Ready, Set, Go!)
  personalInfo: {
    name:     { type: String, default: '' },
    email:    { type: String, default: '' },
    phone:    { type: String, default: '' },
    location: { type: String, default: '' },
    website:  { type: String, default: '' },
    linkedin: { type: String, default: '' },
    summary:  { type: String, default: '' },
  },

  education:  [EducationSchema],
  experience: [ExperienceSchema],
  skills:     [{ type: String }],
  projects:   [ProjectSchema],

<<<<<<< HEAD
  template: { type: String, default: 'classic' },
=======
  template:   { type: String, default: 'classic' },
>>>>>>> 1b585c7 (Ready, Set, Go!)
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
