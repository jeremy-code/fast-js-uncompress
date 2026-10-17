const uncompress = async (
  val: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  return new Response(
    new Blob([val]).stream().pipeThrough(new DecompressionStream("gzip")),
  ).bytes();
};

export { uncompress };
