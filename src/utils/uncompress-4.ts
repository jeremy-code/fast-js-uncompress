const uncompress = async (
  val: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  const decompressionStream = new DecompressionStream("gzip");
  const response = new Response(decompressionStream.readable);
  const writer = decompressionStream.writable.getWriter();
  const writePromise = writer.write(val);
  const closePromise = writer.close();
  return (await Promise.all([response.bytes(), writePromise, closePromise]))[0];
};

export { uncompress };
