"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const oeuvre_model_1 = __importDefault(require("../model/oeuvre.model"));
class Server {
    constructor(port) {
        this.port = port;
    }
    start() {
        const app = express_1.default();
        const uri = "mongodb://localhost:27017/Artiste";
        mongoose_1.default.connect(uri, (err) => {
            if (err)
                console.log(err);
            else
                console.log("Mongo Data base connected successfuly");
        });
        //app.use(serveStatic("public"));
        app.get("/oeuvres", (req, resp) => {
            oeuvre_model_1.default.find((err, oeuvres) => {
                if (err)
                    resp.status(500).send(err);
                else
                    resp.send(oeuvres);
            });
        });
        app.listen(this.port, () => {
            console.log("server demmaré avec succes: " + this.port);
        });
    }
}
exports.default = Server;
