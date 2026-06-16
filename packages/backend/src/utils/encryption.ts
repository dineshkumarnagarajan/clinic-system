import crypto from 'crypto';

const ENCRYPTION_KEY = (process.env.ENCRYPTION_KEY || '').padEnd(32, '0').slice(0, 32);

export const encryptData = (data: string): string => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted;
};

export const decryptData = (encryptedData: string): string => {
    const [iv, encrypted] = encryptedData.split(':');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), Buffer.from(iv, 'hex'));

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
};

export const hashData = (data: string): string => {
    return crypto.createHash('sha256').update(data).digest('hex');
};
