const puppeteer    = require('puppeteer-core');
const { execSync } = require('child_process');
const fs           = require('fs');
const buildHtml    = require('../templates/resumeTemplate');

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  const candidates = [
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/snap/bin/chromium',
    '/usr/lib/chromium-browser/chromium-browser',
    '/usr/lib/chromium/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/mnt/c/Program Files/Google/Chrome/Application/chrome.exe',
  ];

  for (const p of candidates) {
    try { if (fs.existsSync(p)) return p; } catch {}
  }

  for (const bin of ['chromium-browser', 'chromium', 'google-chrome', 'google-chrome-stable']) {
    try {
      const found = execSync(`which ${bin} 2>/dev/null`).toString().trim();
      if (found) return found;
    } catch {}
  }

  throw new Error(
    'Chrome/Chromium not found. Install it with:\n' +
    '  sudo apt install -y chromium-browser\n' +
    'Or set CHROME_PATH in server/.env'
  );
}

exports.generate = async (resumeData) => {
  let browser;
  try {
    const executablePath = findChrome();
    console.log(`[PDF] Using Chrome at: ${executablePath}`);

    browser = await puppeteer.launch({
      executablePath: "/usr/bin/chromium",
      headless: true,
      timeout: 60000,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--no-zygote',
        '--single-process',
      ],
    });

    const page = await browser.newPage();
    await page.setContent(buildHtml(resumeData), {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

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