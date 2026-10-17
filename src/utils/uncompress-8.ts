const uncompress = async (
  val: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  const stream = new DecompressionStream("gzip");
  const response = new Response(stream.readable);
  const writer = stream.writable.getWriter();
  writer.ready.then(() => writer.write(val));
  writer.ready.then(() => writer.close());
  return response.bytes();
};

export { uncompress };
