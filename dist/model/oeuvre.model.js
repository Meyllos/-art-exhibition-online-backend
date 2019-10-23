"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let oeuvreSchema = new mongoose_1.default.Schema({
    titre: { type: String, required: true },
    categorie: { type: String, required: true },
    auteur: { type: String, required: true },
    prix: { type: Number, required: true, default: 0.00 },
    auteurphone: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: false },
    disponible: { type: Boolean, required: true, default: true }
});
oeuvreSchema.plugin(mongoose_paginate_1.default);
const Oeuvre = mongoose_1.default.model("Oeuvre", oeuvreSchema);
exports.default = Oeuvre;
