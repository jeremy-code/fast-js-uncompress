const uncompress = async (
  val: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  const decompressionStream = new DecompressionStream("gzip");
  const writer = decompressionStream.writable.getWriter();

  writer.write(val);
  writer.close();

  const uncompressedSize = (
    ArrayBuffer.isView(val) ?
      new DataView(val.buffer, val.byteOffset, val.byteLength)
    : new DataView(val)).getUint32(val.byteLength - 4, true);
  const output = new Uint8Array(uncompressedSize);
  let offset = 0;

  const reader = decompressionStream.readable.getReader();

  let isDone = false;
  while (!isDone) {
    const { done, value } = await reader.read();
    if (done) {
      isDone = true;
    } else {
      output.set(value, offset);
      offset += value.byteLength;
    }
  }

  return output;
};

export { uncompress };
