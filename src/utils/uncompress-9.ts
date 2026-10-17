const uncompress = async (
  val: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  const decompressionStream = new DecompressionStream("gzip");
  const response = new Response(decompressionStream.readable);
  const writer = decompressionStream.writable.getWriter();
  return (
    await Promise.all([response.bytes(), writer.write(val), writer.close()])
  )[0];
};

export { uncompress };
