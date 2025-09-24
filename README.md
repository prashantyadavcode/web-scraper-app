# Web Scraper Application

A minimalistic web scraping application that extracts data from any URL and generates a formatted PDF report.

## Features

- 🎨 **Minimalistic Interface**: Clean, modern UI with gradient background
- 🔗 **URL Input**: Simple text field to paste or type any website URL
- 📊 **Comprehensive Data Extraction**: Scrapes titles, headings, paragraphs, links, images, and metadata
- 📄 **PDF Generation**: Automatically formats scraped data into a professional PDF report
- ⬇️ **Direct Download**: Users can download the generated PDF directly from the browser
- 🚀 **Fast & Reliable**: Built with Express.js and Puppeteer for robust web scraping

## What Gets Scraped

- Page title and metadata (description, keywords, author)
- All headings (H1, H2, H3)
- Main content paragraphs
- Lists (ordered and unordered)
- Links with their text and URLs
- Images with alt text and sources
- Timestamp of when the data was scraped

## Installation

1. **Clone or download the project files**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser and go to:**
   ```
   http://localhost:3000
   ```

## Usage

1. Open the application in your web browser
2. Paste or type the URL of the website you want to scrape
3. Click "Scrape Data" button
4. Wait for the scraping process to complete
5. Download the generated PDF report

## Development

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

- `GET /` - Main application interface
- `POST /api/scrape` - Scrape data from provided URL
- `GET /api/health` - Health check endpoint

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Web Scraping**: Puppeteer, Cheerio
- **PDF Generation**: Puppeteer PDF generation
- **Styling**: Custom CSS with gradient backgrounds and modern design

## Requirements

- Node.js (v14 or higher)
- npm or yarn package manager

## Notes

- The application respects robots.txt and uses appropriate delays
- Some websites may block automated scraping - this is normal behavior
- Large websites may take longer to scrape
- Generated PDFs are automatically cleaned up after download

## License

MIT License - feel free to use and modify as needed!
