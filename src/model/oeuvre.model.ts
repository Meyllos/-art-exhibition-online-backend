import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let oeuvreSchema= new mongoose.Schema({
    titre:{type:String,required:true},
    categorie:{type:String,required:true},
    auteur:{type:String,required:true},
    prix:{type:Number,required:true,default:0.00},
    auteurphone:{type:String,required:true},
    image1:{type:String,required:true},
    image2:{type:String,required:false},
    disponible:{type:Boolean,required:true,default:true}
});
oeuvreSchema.plugin(mongoosePaginate);
const Oeuvre= mongoose.model("Oeuvre",oeuvreSchema);
export default Oeuvre; 