const cors = require('cors');
const express = require('express');

const configureServer = (app) => {
    // CORS configuration
    app.use(cors({
        origin: 'http://localhost:3000', // Your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }));

    // Parse JSON bodies
    app.use(express.json());
    
    // Parse URL-encoded bodies
    app.use(express.urlencoded({ extended: true }));
};

module.exports = configureServer;
