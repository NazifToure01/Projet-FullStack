const mongoose = require('mongoose');
const express = require('express');
const http = require('http'); // Importer le module HTTP
const socketIo = require('socket.io');
const app = express();
const path = require('path');
const server = http.createServer(app); // Créer un serveur HTTP
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",  // le port où votre client React est hébergé
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
 // Intégrer socket.io avec le serveur HTTP
const MessageRouter = require('./routes/Messages.Router');

app.use(express.json());
const port = 4000;
const cors = require('cors');
app.use(cors());

// Serve static files from the React app
const public_path = path.join(__dirname, './build');
app.use(express.static(public_path));




// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/projetFullStack', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));


// Passer l'instance de socket.io au routeur de messages
app.use("/api/messages", MessageRouter(io));

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});





server.listen(port, () => console.log(`Listening on port ${port}...`)); // Écouter avec le serveur HTTP au lieu de l'application Express
