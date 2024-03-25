import * as jwtSecret from 'tweetnacl';

const key = jwtSecret.randomBytes(jwtSecret.secretbox.keyLength);
const getKey = Buffer.from(key).toString('hex');

export const jwtConstants = {
  secret: getKey,
};
