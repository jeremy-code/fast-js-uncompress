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

  for await (let chunk of decompressionStream.readable) {
    output.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return output;
};

export { uncompress };
