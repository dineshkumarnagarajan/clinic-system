"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashData = exports.decryptData = exports.encryptData = void 0;
var crypto_1 = require("crypto");
var ENCRYPTION_KEY = (process.env.ENCRYPTION_KEY || '').padEnd(32, '0').slice(0, 32);
var encryptData = function (data) {
    var iv = crypto_1.default.randomBytes(16);
    var cipher = crypto_1.default.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    var encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
};
exports.encryptData = encryptData;
var decryptData = function (encryptedData) {
    var _a = encryptedData.split(':'), iv = _a[0], encrypted = _a[1];
    var decipher = crypto_1.default.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), Buffer.from(iv, 'hex'));
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
exports.decryptData = decryptData;
var hashData = function (data) {
    return crypto_1.default.createHash('sha256').update(data).digest('hex');
};
exports.hashData = hashData;
