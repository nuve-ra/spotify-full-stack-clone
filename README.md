# Spotify Clone Full Stack Application

A full-stack Spotify clone with admin panel for managing songs and albums.

## Features

- Song Management (Upload, List, Delete)
- Album Management (Create, List, Delete)
- Cloud Storage Integration with Cloudinary
- Modern UI with Tailwind CSS
- Responsive Design
- Audio Player with Play/Pause Controls

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Cloudinary
- Multer

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Toastify

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary Account
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/nuve-ra/spotify-full-stack-clone.git
cd spotify-full-stack-clone
```

2. Install Backend Dependencies
```bash
cd spotify\ backend
npm install
cp .env.example .env
# Update .env with your MongoDB and Cloudinary credentials
```

3. Install Frontend Dependencies
```bash
cd ../spotify-admin
npm install
cp .env.example .env
# Update .env with your backend URL
```

### Running Locally

1. Start Backend Server
```bash
cd spotify\ backend
npm run dev
```

2. Start Frontend Development Server
```bash
cd spotify-admin
npm run dev
```

## Deployment

### Backend Deployment (Render.com)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add Environment Variables from your .env file

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure Environment Variables:
   - Add `VITE_API_URL` pointing to your Render backend URL
4. Deploy

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
PORT=4000
```

### Frontend (.env)
```
VITE_API_URL=your_backend_url
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
