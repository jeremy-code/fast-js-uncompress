const uncompress = async (
  val: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  const stream = new DecompressionStream("gzip");
  const output = new Response(stream.readable).bytes();
  const writer = stream.writable.getWriter();
  await Promise.all([writer.write(val), writer.close()]);
  return output;
};

export { uncompress };
