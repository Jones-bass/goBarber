import { extname, resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '../', '../', 'tmp', 'uploads'),
    filename(request, file, callback) {
      crypto.randomBytes(16, (err, res) => {
        if (err) return callback(err);

        return callback(null, res.toString('HEX') + extname(file.originalname));
      });
    },
  }),
};
