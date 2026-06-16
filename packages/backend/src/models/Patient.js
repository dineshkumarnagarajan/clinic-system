"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
var mongoose_1 = require("mongoose");
var encryption_1 = require("../utils/encryption");
var patientSchema = new mongoose_1.Schema({
    patientId: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    hospital: { type: String, required: true },
    department: { type: String, required: true },
}, { timestamps: true });
// Encrypt sensitive fields before saving
patientSchema.pre('save', function (next) {
    if (this.isModified('phoneNumber')) {
        this.phoneNumber = (0, encryption_1.encryptData)(this.phoneNumber);
    }
    if (this.isModified('email') && this.email) {
        this.email = (0, encryption_1.encryptData)(this.email);
    }
    next();
});
// Decrypt sensitive fields after fetching
patientSchema.post('find', function (docs) {
    if (Array.isArray(docs)) {
        docs.forEach(function (doc) {
            if (doc.phoneNumber)
                doc.phoneNumber = (0, encryption_1.decryptData)(doc.phoneNumber);
            if (doc.email)
                doc.email = (0, encryption_1.decryptData)(doc.email);
        });
    }
});
patientSchema.post('findOne', function (doc) {
    if (doc) {
        if (doc.phoneNumber)
            doc.phoneNumber = (0, encryption_1.decryptData)(doc.phoneNumber);
        if (doc.email)
            doc.email = (0, encryption_1.decryptData)(doc.email);
    }
});
exports.Patient = (0, mongoose_1.model)('Patient', patientSchema);
