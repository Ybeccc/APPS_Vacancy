const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
const fs = require('fs');

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
  }

    // Ensure the upload directories exist at startup
    ensureUploadDirectories() {
        const folders = ['suratLamaranFiles', 'cvFiles', 'khsFiles'];
        folders.forEach(folder => {
            const dirPath = path.join(__dirname, 'uploads', folder);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
                console.log(`Created missing folder: ${dirPath}`);
            }
        });
    }

    initializeMiddleware() {
        this.app.use(express.json()); // Parse JSON requests
        this.app.use(cors({
            origin: 'http://localhost:5173', // Restrict origin for security
            credentials: true
        }));

        // Serve the 'uploads' directory for public access
        this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    }

    initializeRoutes() {
        this.app.use(routes); // Use the API routes
    }

    start() {
        // Ensure the necessary upload folders are created
        this.ensureUploadDirectories();

        // Initialize middleware and routes
        this.initializeMiddleware();
        this.initializeRoutes();

        // Start the server and listen on the configured port
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }
}

// Create and start the server
const server = new Server();
server.start();