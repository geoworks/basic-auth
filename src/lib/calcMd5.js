import crypto from 'crypto';

export default function (data) {
  const md5sum = crypto.createHash('md5');
  md5sum.update(data);
  return md5sum.digest('hex');
}
