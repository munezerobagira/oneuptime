import mongoose, {
    RequiredFields,
    UniqueFields,
    EncryptedFields,
   Schema
} from '../Infrastructure/ORM';


const schema: Schema = new Schema({
    from: String,
    to: String,
    projectId: { type: String, ref: 'Project', index: true },
    createdAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    deletedAt: {
        type: Date,
    },

    deletedById: { type: String, ref: 'User', index: true },
    content: String,
    status: String,
    error: String,
});

export const requiredFields: RequiredFields = schema.requiredPaths();

export const uniqueFields: UniqueFields = [];
export const encryptedFields: EncryptedFields = [];

export const slugifyField: string = '';

export default mongoose.model('callLogs', schema);
