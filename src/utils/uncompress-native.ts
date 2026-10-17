import { gunzipSync } from "node:zlib";

const uncompress = (val: Uint8Array): Uint8Array<ArrayBuffer> => {
  return new Uint8Array(gunzipSync(val));
};

export { uncompress };
