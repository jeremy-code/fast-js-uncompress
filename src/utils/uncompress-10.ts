const uncompress = async (
  val: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  const decompressionStream = new DecompressionStream("gzip");
  const response = new Response(decompressionStream.readable);
  const writer = decompressionStream.writable.getWriter();
  return Promise.all([
    response.bytes(),
    writer.write(val),
    writer.close(),
  ]).then(([data]) => data);
};

export { uncompress };
