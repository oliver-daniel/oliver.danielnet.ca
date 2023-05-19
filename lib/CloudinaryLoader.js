// For some stupid fucking reason, as of Next 13, you can no longer globally specify loaders using a provider name.
// https://github.com/colbyfayock/cloudinary-examples/tree/main/examples/nextjs-next-image-loader

const normalizeSrc = (src) => (src[0] === "/" ? src.slice(1) : src);

export default function loader({ src, width, quality }) {
  const params = [
    "f_auto",
    "c_limit",
    "w_" + width,
    "q_" + (quality || "auto"),
  ];
  return `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload/${params.join(",")}/${normalizeSrc(src)}`;
}
