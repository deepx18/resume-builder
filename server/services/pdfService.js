const puppeteer    = require('puppeteer-core');
const { execSync } = require('child_process');
const fs           = require('fs');
const buildHtml    = require('../templates/resumeTemplate');

<<<<<<< HEAD
=======
/**
 * Find the system Chrome/Chromium executable.
 * Priority: CHROME_PATH env var → known paths → `which` command.
 */
>>>>>>> 1b585c7 (Ready, Set, Go!)
function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  const candidates = [
<<<<<<< HEAD
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome-beta',
    '/opt/google/chrome/chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/mnt/c/Program Files/Google/Chrome/Application/chrome.exe',
    '/snap/bin/chromium',
=======
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/mnt/c/Program Files/Google/Chrome/Application/chrome.exe',
    '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',
>>>>>>> 1b585c7 (Ready, Set, Go!)
  ];

  for (const p of candidates) {
    try { if (fs.existsSync(p)) return p; } catch {}
  }

<<<<<<< HEAD
  for (const bin of ['chromium', 'google-chrome', 'google-chrome-stable', 'chromium-browser']) {
    try {
      const found = execSync(`which ${bin} 2>/dev/null`).toString().trim();
      if (found && !found.includes('/snap/')) return found;
=======
  for (const bin of ['google-chromsudo apt install chromium-browsere', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    try {
      const found = execSync(`which ${bin} 2>/dev/null`).toString().trim();
      if (found) return found;
>>>>>>> 1b585c7 (Ready, Set, Go!)
    } catch {}
  }

  throw new Error(
<<<<<<< HEAD
    'No compatible Chrome/Chromium found.\n' +
    'Install: sudo apt install -y chromium\n' +
    'Or set CHROME_PATH in server/.env'
=======
    'Chrome/Chromium not found.\n' +
    'Install:   sudo apt install chromium-browser\n' +
    'Or set in server/.env:   CHROME_PATH=/path/to/chrome'
>>>>>>> 1b585c7 (Ready, Set, Go!)
  );
}

exports.generate = async (resumeData) => {
  let browser;
  try {
    const executablePath = findChrome();
<<<<<<< HEAD
    console.log(`[PDF] Using Chrome at: ${executablePath}`);

    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      timeout: 60000,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-extensions',
        '--no-first-run',
        '--no-default-browser-check',
        '--no-zygote',
        '--single-process'
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123 });

    const html = buildHtml(resumeData);
    await page.setContent(html, { waitUntil: 'load', timeout: 30000 });
    await new Promise(r => setTimeout(r, 300));
=======
    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', "--single-process", "--no-zygote"],
    });

    const page = await browser.newPage();
    await page.setContent(buildHtml(resumeData), { waitUntil: 'domcontentloaded', timeout: 60000 });
>>>>>>> 1b585c7 (Ready, Set, Go!)

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
<<<<<<< HEAD
      preferCSSPageSize: false,
      margin: { top: '15mm', bottom: '15mm', left: '12mm', right: '12mm' },
    });

    console.log(`[PDF] Generated successfully, size: ${pdf.length} bytes`);
    return Buffer.from(pdf);
=======
      margin: { top: '15mm', bottom: '15mm', left: '12mm', right: '12mm' },
    });

    return pdf;
>>>>>>> 1b585c7 (Ready, Set, Go!)
  } finally {
    if (browser) await browser.close();
  }
};
<<<<<<< HEAD
=======

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
>>>>>>> 1b585c7 (Ready, Set, Go!)
