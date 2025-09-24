const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Create downloads directory if it doesn't exist
const downloadsDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir);
}

// Web scraping endpoint
app.post('/api/scrape', async (req, res) => {
    try {
        const { url } = req.body;
        
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        // Validate URL
        try {
            new URL(url);
        } catch {
            return res.status(400).json({ error: 'Invalid URL format' });
        }

        console.log(`Scraping data from: ${url}`);

        // Launch Puppeteer browser
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ]
        });

        let page;
        try {
            page = await browser.newPage();
            
            // Set user agent to avoid blocking
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
            
            // Navigate to the page
            await page.goto(url, { 
                waitUntil: 'domcontentloaded',
                timeout: 30000 
            });

            // Wait a bit for dynamic content
            await page.waitForTimeout(2000);

            // Get page content
            const content = await page.content();
            const $ = cheerio.load(content);

            // Extract structured data
            const scrapedData = {
                url: url,
                title: $('title').text().trim() || 'No title found',
                timestamp: new Date().toISOString(),
                meta: {
                    description: $('meta[name="description"]').attr('content') || 'No description',
                    keywords: $('meta[name="keywords"]').attr('content') || 'No keywords',
                    author: $('meta[name="author"]').attr('content') || 'No author'
                },
                headings: {
                    h1: $('h1').map((i, el) => $(el).text().trim()).get(),
                    h2: $('h2').map((i, el) => $(el).text().trim()).get(),
                    h3: $('h3').map((i, el) => $(el).text().trim()).get()
                },
                links: $('a[href]').map((i, el) => ({
                    text: $(el).text().trim(),
                    href: $(el).attr('href')
                })).get().filter(link => link.text && link.href),
                images: $('img[src]').map((i, el) => ({
                    alt: $(el).attr('alt') || 'No alt text',
                    src: $(el).attr('src')
                })).get(),
                paragraphs: $('p').map((i, el) => $(el).text().trim()).get().filter(p => p.length > 20),
                lists: $('ul, ol').map((i, el) => ({
                    type: el.tagName.toLowerCase(),
                    items: $(el).find('li').map((j, li) => $(li).text().trim()).get()
                })).get()
            };

            await browser.close();

            // Generate PDF content
            const pdfContent = generatePDFContent(scrapedData);
            
            // Create PDF using Puppeteer (simplified approach)
            const pdfBrowser = await puppeteer.launch({
                headless: true,
                args: [
                    '--no-sandbox', 
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process',
                    '--disable-gpu'
                ]
            });
            
            const pdfPage = await pdfBrowser.newPage();
            await pdfPage.setContent(pdfContent, { waitUntil: 'domcontentloaded' });
            
            const pdfBuffer = await pdfPage.pdf({
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '20mm',
                    right: '20mm',
                    bottom: '20mm',
                    left: '20mm'
                }
            });
            
            await pdfBrowser.close();

            // Set response headers for PDF download
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="scraped-data-${Date.now()}.pdf"`);
            res.setHeader('Content-Length', pdfBuffer.length);
            
            res.send(pdfBuffer);

        } catch (browserError) {
            console.error('Browser error:', browserError);
            try {
                await browser.close();
            } catch (closeError) {
                console.error('Error closing browser:', closeError);
            }
            throw browserError;
        }

    } catch (error) {
        console.error('Scraping error:', error);
        res.status(500).json({ 
            error: 'Failed to scrape data', 
            details: error.message 
        });
    }
});

// Generate HTML content for PDF
function generatePDFContent(data) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #667eea;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .header h1 {
                color: #667eea;
                font-size: 28px;
                margin-bottom: 10px;
            }
            .header .url {
                color: #666;
                font-size: 14px;
                word-break: break-all;
            }
            .section {
                margin-bottom: 25px;
            }
            .section h2 {
                color: #333;
                font-size: 20px;
                margin-bottom: 15px;
                border-left: 4px solid #667eea;
                padding-left: 15px;
            }
            .section h3 {
                color: #555;
                font-size: 16px;
                margin-bottom: 10px;
            }
            .meta-info {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            .meta-info p {
                margin: 5px 0;
            }
            .meta-info strong {
                color: #667eea;
            }
            ul, ol {
                margin-left: 20px;
            }
            li {
                margin-bottom: 5px;
            }
            .link-item, .image-item {
                margin-bottom: 8px;
                padding: 8px;
                background: #f8f9fa;
                border-radius: 4px;
            }
            .link-item a {
                color: #667eea;
                text-decoration: none;
            }
            .link-item a:hover {
                text-decoration: underline;
            }
            .paragraph {
                margin-bottom: 15px;
                text-align: justify;
            }
            .timestamp {
                text-align: center;
                color: #999;
                font-size: 12px;
                margin-top: 30px;
                border-top: 1px solid #eee;
                padding-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>${data.title}</h1>
            <div class="url">${data.url}</div>
        </div>

        <div class="meta-info">
            <h3>Page Information</h3>
            <p><strong>Description:</strong> ${data.meta.description}</p>
            <p><strong>Keywords:</strong> ${data.meta.keywords}</p>
            <p><strong>Author:</strong> ${data.meta.author}</p>
        </div>

        ${data.headings.h1.length > 0 ? `
        <div class="section">
            <h2>Main Headings (H1)</h2>
            <ul>
                ${data.headings.h1.map(h => `<li>${h}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        ${data.headings.h2.length > 0 ? `
        <div class="section">
            <h2>Sub Headings (H2)</h2>
            <ul>
                ${data.headings.h2.map(h => `<li>${h}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        ${data.paragraphs.length > 0 ? `
        <div class="section">
            <h2>Main Content</h2>
            ${data.paragraphs.slice(0, 10).map(p => `<div class="paragraph">${p}</div>`).join('')}
            ${data.paragraphs.length > 10 ? `<p><em>... and ${data.paragraphs.length - 10} more paragraphs</em></p>` : ''}
        </div>
        ` : ''}

        ${data.lists.length > 0 ? `
        <div class="section">
            <h2>Lists</h2>
            ${data.lists.slice(0, 5).map(list => `
                <h3>${list.type.toUpperCase()} List</h3>
                <${list.type}>
                    ${list.items.slice(0, 10).map(item => `<li>${item}</li>`).join('')}
                </${list.type}>
            `).join('')}
        </div>
        ` : ''}

        ${data.links.length > 0 ? `
        <div class="section">
            <h2>Links (${data.links.length} found)</h2>
            ${data.links.slice(0, 20).map(link => `
                <div class="link-item">
                    <strong>${link.text}</strong><br>
                    <a href="${link.href}">${link.href}</a>
                </div>
            `).join('')}
            ${data.links.length > 20 ? `<p><em>... and ${data.links.length - 20} more links</em></p>` : ''}
        </div>
        ` : ''}

        ${data.images.length > 0 ? `
        <div class="section">
            <h2>Images (${data.images.length} found)</h2>
            ${data.images.slice(0, 10).map(img => `
                <div class="image-item">
                    <strong>Alt:</strong> ${img.alt}<br>
                    <strong>Source:</strong> ${img.src}
                </div>
            `).join('')}
            ${data.images.length > 10 ? `<p><em>... and ${data.images.length - 10} more images</em></p>` : ''}
        </div>
        ` : ''}

        <div class="timestamp">
            Generated on: ${new Date(data.timestamp).toLocaleString()}
        </div>
    </body>
    </html>
    `;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Web scraper API is running' });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Web scraper server running on http://localhost:${PORT}`);
    console.log(`📄 Open your browser and navigate to the URL above to start scraping!`);
});

module.exports = app;
