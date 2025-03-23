"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_routes_1 = __importDefault(require("./routes/app.routes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';
// Connect to MongoDB
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully!'))
    .catch((error) => console.error('❗ MongoDB connection error:', error));
// Middleware
app.use(express_1.default.json());
app.use('/posts', app_routes_1.default);
// Example Route
app.get('/ping', (req, res) => {
    res.json({ message: 'Pong! 🏓' });
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
