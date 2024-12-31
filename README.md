# Musique - Spotify Clone

A full-stack Spotify clone application with admin panel for managing songs and albums.

## Features

- Song upload and management
- Album creation and management
- Admin dashboard
- Music player functionality
- Cloudinary integration for media storage
- MongoDB database integration

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- React Toastify
- React Color Picker

### Backend
- Node.js
- Express.js
- MongoDB
- Cloudinary
- Multer

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/nuve-ra/Musique.git
cd Musique
```

2. Install dependencies
```bash
# Install backend dependencies
cd spotify\ backend
npm install

# Install frontend dependencies
cd ../spotify-admin
npm install
```

3. Set up environment variables
Create a `.env` file in the backend directory with the following variables:
```env
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
MONGODB_URI=your_mongodb_uri
PORT=4000
```

4. Run the application
```bash
# Start backend server
cd spotify\ backend
npm run dev

# Start frontend development server
cd ../spotify-admin
npm run dev
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
