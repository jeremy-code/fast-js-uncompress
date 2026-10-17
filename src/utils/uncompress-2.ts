const uncompress = async (
  val: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  const decompressionStream = new DecompressionStream("gzip");
  new Response(val).body?.pipeTo(decompressionStream.writable);
  return new Response(decompressionStream.readable).bytes();
};

export { uncompress };
