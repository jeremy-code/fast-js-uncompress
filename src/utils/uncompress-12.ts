const uncompress = async (
  val: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  const stream = new DecompressionStream("gzip");
  const output = new Response(stream.readable).bytes();
  const writer = stream.writable.getWriter();

  await writer.write(val);
  await writer.close();

  return output;
};

export { uncompress };
