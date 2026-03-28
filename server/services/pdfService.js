const puppeteer    = require('puppeteer-core');
const { execSync } = require('child_process');
const fs           = require('fs');
const buildHtml    = require('../templates/resumeTemplate');

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  const candidates = [
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
  ];

  for (const p of candidates) {
    try { if (fs.existsSync(p)) return p; } catch {}
  }

  for (const bin of ['chromium', 'google-chrome', 'google-chrome-stable', 'chromium-browser']) {
    try {
      const found = execSync(`which ${bin} 2>/dev/null`).toString().trim();
      if (found && !found.includes('/snap/')) return found;
    } catch {}
  }

  throw new Error(
    'No compatible Chrome/Chromium found.\n' +
    'Install: sudo apt install -y chromium\n' +
    'Or set CHROME_PATH in server/.env'
  );
}

exports.generate = async (resumeData) => {
  let browser;
  try {
    const executablePath = findChrome();
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

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: '15mm', bottom: '15mm', left: '12mm', right: '12mm' },
    });

    console.log(`[PDF] Generated successfully, size: ${pdf.length} bytes`);
    return Buffer.from(pdf);
  } finally {
    if (browser) await browser.close();
  }
};
