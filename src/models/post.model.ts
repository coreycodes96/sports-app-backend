import mongoose from "mongoose";
import { prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Post {
    populate: any;

    //_id
    _id: mongoose.Types.ObjectId;

    //user
    @prop({ ref: () => User })
    user: Ref<User>;

    //type
    @prop({ type: () => String, required: true })
    type: string; //vent, poll, prediction etc

    // title
    @prop({ type: () => String, required: true })
    title: string;

    //description
    @prop({ type: () => String, required: true })
    description: string;

    //favourites
    @prop({ type: () => Array, default: [] })
    favourites: Array<string>;

    //viewers
    @prop({ type: () => Array, default: [] })
    viewers: Array<string>;

    //hashtags
    @prop({ type: () => Array, default: [] })
    hashtags: Array<string>;

    //answers
    @prop({ type: () => Array, default: [] })
    answers: Array<string>
}

const PostModel = getModelForClass(Post, {
    schemaOptions: {
        versionKey: false,
        timestamps: true
    }
});

export default PostModel;