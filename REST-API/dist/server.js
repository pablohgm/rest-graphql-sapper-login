"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
dotenv_1.config({ path: path_1.resolve(__dirname, "../.env") });
const port = process.env.PORT;
const server = express_1.default();
server.get('/', (req, res) => {
    res.send('Hello World !!');
});
server.listen(port, () => {
    console.log(`Rest API - 🌎 is listening on port ${port}`);
});
