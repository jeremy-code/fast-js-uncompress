const uncompress = async (
  val: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  const decompressionStream = new DecompressionStream("gzip");
  const writer = decompressionStream.writable.getWriter();
  writer.write(val);
  writer.close();

  let totalLength = 0;
  const chunks: Uint8Array<ArrayBuffer>[] = [];

  for await (let chunk of decompressionStream.readable) {
    chunks.push(chunk);
    totalLength += chunk.byteLength;
  }

  const output = new Uint8Array(totalLength);
  let offset = 0;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]!;
    output.set(chunk, offset);
    offset += chunk.length;
  }

  return output;
};

export { uncompress };
