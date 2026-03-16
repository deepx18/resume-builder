const puppeteer    = require('puppeteer-core');
const { execSync } = require('child_process');
const fs           = require('fs');
const buildHtml    = require('../templates/resumeTemplate');

/**
 * Find the system Chrome/Chromium executable.
 * Priority: CHROME_PATH env var → known paths → `which` command.
 */
function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  const candidates = [
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/mnt/c/Program Files/Google/Chrome/Application/chrome.exe',
    '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  ];

  for (const p of candidates) {
    try { if (fs.existsSync(p)) return p; } catch {}
  }

  for (const bin of ['google-chromsudo apt install chromium-browsere', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    try {
      const found = execSync(`which ${bin} 2>/dev/null`).toString().trim();
      if (found) return found;
    } catch {}
  }

  throw new Error(
    'Chrome/Chromium not found.\n' +
    'Install:   sudo apt install chromium-browser\n' +
    'Or set in server/.env:   CHROME_PATH=/path/to/chrome'
  );
}

exports.generate = async (resumeData) => {
  let browser;
  try {
    const executablePath = findChrome();
    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', "--single-process", "--no-zygote"],
    });

    const page = await browser.newPage();
    await page.setContent(buildHtml(resumeData), { waitUntil: 'domcontentloaded', timeout: 60000 });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '15mm', bottom: '15mm', left: '12mm', right: '12mm' },
    });

    return pdf;
  } finally {
    if (browser) await browser.close();
  }
};

// exports.generate = async (html) => {
//   const browser = await puppeteer.launch({
//     executablePath: "/usr/bin/chromium-browser", // adjust if needed
//     headless: true,
//     args: [
//       "--no-sandbox",
//       "--disable-setuid-sandbox",
//       "--disable-dev-shm-usage",
//       "--disable-gpu",
//       "--no-first-run",
//       "--no-zygote"
//     ],
//     timeout: 30000
//   });

//   const page = await browser.newPage();

//   await page.setContent(html, {
//     waitUntil: "networkidle0"
//   });

//   const pdf = await page.pdf({
//     format: "A4",
//     printBackground: true
//   });

//   await browser.close();

//   return pdf;
// };