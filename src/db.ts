import mongoose, {Schema, model, Types} from "mongoose";
const ObjectId = Schema.ObjectId;

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const ContentSchema = new mongoose.Schema({
    link: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref:'tags' }],
    userId: { type: Types.ObjectId, ref:'users' }
});

const TagsSchema = new mongoose.Schema({
    title:{ type: String, required: true },
});

const LinkSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    userId: { type: ObjectId, ref:'users' }
});

const userModel = mongoose.model('users', UserSchema);
const contentModel = mongoose.model('content', ContentSchema);
const tagsModel = mongoose.model('tags', TagsSchema);
const linkModel = mongoose.model('link', LinkSchema);

module.exports = {
    userModel,
    contentModel,
    tagsModel,
    linkModel
};