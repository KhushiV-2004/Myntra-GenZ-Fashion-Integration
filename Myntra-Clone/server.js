import express from 'express';
import multer from 'multer';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('HTML'));
// Serve static files from the "public" directory
app.use(express.static('public'));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'HTML/uploads')));

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'HTML/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /pdf/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'));
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// Google Sheets API configuration
const auth = new google.auth.GoogleAuth({
    keyFile: "myntra-429416-40a4dd2f9e71.json", // Replace with your service account key file path
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });

// Handle file upload
app.post('/upload', upload.single('design'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        // Get file details
        const fileUrl = `http://localhost:${port}/uploads/${file.filename}`;
        
        // Append file details to Google Sheet
        const spreadsheetId = process.env.SPREADSHEET_ID;
        const range = 'Sheet1!A:C';
        const valueInputOption = 'RAW';
        const resource = {
            values: [
                [file.originalname, fileUrl, new Date().toISOString()]
            ],
        };
        
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption,
            resource,
        });

        res.status(200).send('File uploaded');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
