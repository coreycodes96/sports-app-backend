import mongoose from "mongoose";
import { prop, getModelForClass, Passthrough } from "@typegoose/typegoose";

export class User {
    _id: mongoose.Types.ObjectId;
    // firstname
    @prop({ type: () => String, required: true })
    firstname: string;

    //surname
    @prop({ type: () => String, required: true })
    surname: string;

    //username
    @prop({ type: () => String, required: true })
    username: string;

    //email
    @prop({ type: () => String, required: true, })
    email: string;

    //dob
    @prop({ type: () => Date, required: true })
    dob: Date;

    //password
    @prop({ type: () => String, required: true })
    password: string;

    //interests
    @prop({ type: () => Array, default: [] })
    interests: Array<string>;

    //favourites
    @prop({
        type: () => new Passthrough([{
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: true
            },
            status: {
                type: Number,
                default: 0
            }
        }])
    })
    favourites: [{ user: mongoose.Types.ObjectId, status: number }];

    //favouriting
    @prop({
        type: () => new Passthrough([{
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: true
            },
            status: {
                type: Number,
                default: 0
            }
        }])
    })
    favouriting: [{ user: mongoose.Types.ObjectId, status: number }];

    //blocked
    @prop({ type: () => Array, default: [] })
    blocked: Array<string>;

    @prop({ type: () => Boolean, default: false })
    isActivated: Boolean;

    @prop({ type: () => Number, default: null })
    activationCode: Number | null;

    //private
    @prop({ type: () => Boolean, default: false })
    private: boolean;

    //verified
    @prop({ type: () => Boolean, default: false })
    verified: boolean;

    //warnings
    @prop({ type: () => Number, default: 0 })
    warnings: number;

    //role
    @prop({ type: () => Number, default: 0 })
    role: number;
}

const UserModel = getModelForClass(User, {
    schemaOptions: {
        versionKey: false,
        timestamps: true
    }
});

export default UserModel;