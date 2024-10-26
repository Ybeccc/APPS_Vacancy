const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Required to ensure folder creation
const ClassesController = require('../interfaces/ClassesController.js');
const CoursesController = require('../interfaces/CoursesController.js');
const ApplicantController = require('../interfaces/ApplicantController.js');

const router = express.Router();

const classesController = new ClassesController();
const coursesController = new CoursesController();
const applicantController = new ApplicantController();

// Helper function to create folders if they don't exist
const ensureFolderExists = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};

// Configure multer storage with specific folders for each file type
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder;
        switch (file.fieldname) {
            case 'aplSuratLamaran':
                folder = 'suratLamaranFiles';
                break;
            case 'aplCv':
                folder = 'cvFiles';
                break;
            case 'aplKhs':
                folder = 'khsFiles';
                break;
            default:
                return cb(new Error('Invalid file field'), false);
        }

        const dirPath = path.join(__dirname, 'uploads', folder);
        ensureFolderExists(dirPath); // Create folder if it doesn't exist
        cb(null, dirPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Initialize multer with storage and PDF-only filter
const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB file size limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    }
});

// Classes routes
router.get('/classes', (req, res) => classesController.getAll(req, res));

// Courses routes
router.get('/courses', (req, res) => coursesController.getAll(req, res));

// Applicant routes
router.post(
    '/applicant',
    upload.fields([
        { name: 'aplSuratLamaran', maxCount: 1 },
        { name: 'aplCv', maxCount: 1 },
        { name: 'aplKhs', maxCount: 1 }
    ]),
    (req, res) => {
        console.log('Files received:', req.files); // Debug log for files
        console.log('Body received:', req.body);   // Debug log for form data
        applicantController.createApplicant(req, res);
    }
);
router.get('/applicant', (req, res) => applicantController.getAll(req, res));

module.exports = router;