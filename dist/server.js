"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const oeuvre_model_1 = __importDefault(require("./model/oeuvre.model"));
class Server {
    constructor(port) {
        this.port = port;
    }
    start() {
        const app = express_1.default();
        app.use(body_parser_1.default.json());
        const uri = "mongodb://localhost:27017/Artiste";
        mongoose_1.default.connect(uri, (err) => {
            if (err)
                console.log(err);
            else
                console.log("Mongo Data base connected successfuly");
        });
        //app.use(serveStatic("public"));
        app.get("/oeuvres", (req, resp) => {
            let p = parseInt(req.query.page || 1);
            let size = parseInt(req.query.size || 2);
            oeuvre_model_1.default.paginate({}, { page: p, limit: size }, (err, oeuvres) => {
                if (err)
                    resp.status(500).send(err);
                else
                    resp.send(oeuvres);
            });
        });
        app.get("/oeuvres-search", (req, resp) => {
            let p = parseInt(req.query.page || 1);
            let size = parseInt(req.query.size || 2);
            let cat = req.query.cat || "";
            oeuvre_model_1.default.paginate({ categorie: { $regex: ".*(?i)" + cat + ".*" } }, { page: p, limit: size }, (err, oeuvres) => {
                if (err)
                    resp.status(500).send(err);
                else
                    resp.send(oeuvres);
            });
        });
        app.get("/oeuvres/:id", (req, resp) => {
            oeuvre_model_1.default.findById(req.params.id, (err, oeuvre) => {
                if (err)
                    resp.status(500).send(err);
                else
                    resp.send(oeuvre);
            });
        });
        app.post("/oeuvres", (req, resp) => {
            let oeuvre = new oeuvre_model_1.default(req.body);
            oeuvre.save(err => {
                if (err)
                    resp.status(500).send;
                else
                    resp.send(oeuvre);
            });
        });
        app.put("/oeuvres/:id", (req, resp) => {
            oeuvre_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err, oeuvre) => {
                if (err)
                    resp.status(500).send;
                else
                    resp.send("modification avec succès");
            });
        });
        app.listen(this.port, () => {
            console.log("server demmaré avec succes: " + this.port);
        });
    }
}
exports.default = Server;
