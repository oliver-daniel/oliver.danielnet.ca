import Carousel from "@/components/Carousel";
import Image from "next/image";
import { renderToString } from "react-dom/server";

const carouselContents = {
  vaccine: {
    lofi: {
      mobile: [
        "/portfolio/design/vaccineontario/lofi/mobile/home",
        "/portfolio/design/vaccineontario/lofi/mobile/CancellingModal",
        "/portfolio/design/vaccineontario/lofi/mobile/CardEntryForm",
        "/portfolio/design/vaccineontario/lofi/mobile/ConfirmDetails",
        "/portfolio/design/vaccineontario/lofi/mobile/DateTimeSelect_prefilled",
      ],
    },
  },
};

const GenericCarousel = ({ contents }) => (
  <Carousel>
    {contents.map((src) => (
      <Image fill key={src} src={src} />
    ))}
  </Carousel>
);

export const REPLACEMENTS = {
  "vaccine-lofi-mobile": (
    <GenericCarousel contents={carouselContents.vaccine.lofi.mobile} />
  ),
};
// // https://stackoverflow.com/a/75878571
// const replacePortfolioFigure = (input, uri) => {
//   if (!(uri in REPLACEMENTS)) {
//     throw new Error(`Figure with id ${uri} not found`);
//   }

//   //   const tokens = typeof input === "string" ? input.split("\n") : input;

//   const re = new RegExp(`<figure id="${uri}"></figure>`, "g");
//   const replacement = renderToString(REPLACEMENTS[uri]);

//   return input.replaceAll(re, replacement);

//   //   return tokens.map((tkn) => (re.test(tkn) ? replacement : tkn));

//   //   return tokens.reduce(
//   //     (acc, tkn) => (acc === null ? [x] : [acc, replacement, tkn]),
//   //     null
//   //   );
// };

// export default replacePortfolioFigure;

// export const replaceAll = (input) =>
//   Object.keys(REPLACEMENTS).reduce(
//     ([acc, uri]) => replacePortfolioFigure(acc, uri),
//     input
//   );
