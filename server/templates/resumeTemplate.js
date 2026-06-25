/**
 * resumeTemplate.js  —  Template router.
 * Delegates to the correct per-template module based on r.template.
 */

const classic   = require('./classic');
const modern    = require('./modern');
const minimal   = require('./minimal');
const executive = require('./executive');
const creative  = require('./creative');

const TEMPLATES = { classic, modern, minimal, executive, creative };

module.exports = function buildHtml(r) {
  const key      = r.template && TEMPLATES[r.template] ? r.template : 'classic';
  const renderer = TEMPLATES[key];
  return renderer(r);
};

/** Exported list — keep in sync with client TEMPLATES constant */
module.exports.TEMPLATE_KEYS = Object.keys(TEMPLATES);
