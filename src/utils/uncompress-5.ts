const uncompress = async (
  val: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  return new Response(
    new Response(val).body?.pipeThrough(new DecompressionStream("gzip"))!,
  ).bytes();
};

export { uncompress };
