const uncompress = async (
  val: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  const stream = new DecompressionStream("gzip");
  const response = new Response(stream.readable);
  const writer = stream.writable.getWriter();
  return Promise.all([
    writer.write(val),
    writer.close(),
    response.bytes(),
  ]).then((res) => res[2]);
};

export { uncompress };
