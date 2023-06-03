import Carousel from "@/components/Carousel";
import Image from "next/image";

const GenericCarousel = ({ contents }) => (
  <Carousel>
    {contents.map((src) => (
      <Image fill key={src} src={src} />
    ))}
  </Carousel>
);

module.exports = {
  "vaccine-lofi-mobile": (
    <GenericCarousel
      contents={[
        "/portfolio/design/vaccineontario/lofi/mobile/home",
        "/portfolio/design/vaccineontario/lofi/mobile/CancellingModal",
        "/portfolio/design/vaccineontario/lofi/mobile/CardEntryForm",
        "/portfolio/design/vaccineontario/lofi/mobile/ConfirmDetails",
        "/portfolio/design/vaccineontario/lofi/mobile/DateTimeSelect_prefilled",
      ]}
    />
  ),
  "vaccine-lofi-watch": (
    <GenericCarousel
      contents={[
        "/portfolio/design/vaccineontario/lofi/watch/Splash",
        "/portfolio/design/vaccineontario/lofi/watch/Home",
        "/portfolio/design/vaccineontario/lofi/watch/Pending",
        "/portfolio/design/vaccineontario/lofi/watch/List",
        "/portfolio/design/vaccineontario/lofi/watch/Confirmation",
      ]}
    />
  ),
  "vaccine-prototypes": (
    <div class="columns">
      <div class="column col-xs-12 col-md-6">
        <iframe
          loading="lazy"
          height="450"
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FFXMYQDBe6L6f8VJi3SFOq7%2FAssignment-2%3Fnode-id%3D62%253A7255%26scaling%3Dscale-down%26page-id%3D62%253A2450%26starting-point-node-id%3D62%253A7177%26hide-ui%3D1"
          allowFullScreen
        ></iframe>
      </div>
      <div class="column col-xs-12 col-md-6">
        <iframe
          loading="lazy"
          height="450"
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FFXMYQDBe6L6f8VJi3SFOq7%2FAssignment-2%3Fnode-id%3D44%253A33778%26scaling%3Dcontain%26page-id%3D1%253A3%26starting-point-node-id%3D44%253A33778%26show-proto-sidebar%3D0%26hide-ui%3D1"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  ),
};
