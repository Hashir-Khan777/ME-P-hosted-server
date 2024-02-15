import { Document } from "mongoose";
import UserDocument from "../interface/auth.interface";
import PartDocument from "../interface//part.interface";

export default interface ReviewDocument extends Document {
    user : UserDocument;
    part: PartDocument;
    rating: number;
    review: string;
}