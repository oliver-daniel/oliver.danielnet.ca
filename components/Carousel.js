import { useEffect, useState } from "react";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { UAParser } from "ua-parser-js";

const config = {
  responsive: {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  },
  ssr: true,
  arrows: true,
  showDots: true,
  infinite: true,
  autoPlay: false,
  keyBoardControl: true,
  deviceType: "desktop",
  centerMode: true,
  draggable: false,
};

const Carousel = ({ children, ...overrides }) => {
  const [deviceType, setDeviceType] = useState("desktop");
  useEffect(() => {
    const parser = new UAParser();

    const { type } = parser.getDevice();
    setDeviceType(type);
  }, []);

  overrides = {
    ...overrides,
    deviceType,
    swipeable: deviceType === "mobile",
  }

  return (
    <MultiCarousel {...config} {...overrides}>
      {children}
    </MultiCarousel>
  );
};

export default Carousel;
