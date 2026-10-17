const uncompress = async (
  val: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  return new Response(
    new ReadableStream<BufferSource>({
      start: (controller) => {
        controller.enqueue(val);
        controller.close();
      },
    }).pipeThrough(new DecompressionStream("gzip")),
  ).bytes();
};

export { uncompress };
