"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
var mongoose_1 = require("mongoose");
var documentSchema = new mongoose_1.Schema({
    documentId: { type: String, unique: true, required: true },
    patientId: { type: String, required: true, index: true },
    staffId: { type: String, required: true },
    documentType: {
        type: String,
        enum: ['discharge_summary', 'lab_report', 'clinical_note', 'other'],
        required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    s3Url: { type: String },
    fileSize: { type: Number },
    mimeType: { type: String },
    uploadedAt: { type: Date, default: Date.now },
    isEncrypted: { type: Boolean, default: true },
}, { timestamps: true });
// Index for fast patient document lookup
documentSchema.index({ patientId: 1, createdAt: -1 });
exports.Document = (0, mongoose_1.model)('Document', documentSchema);
