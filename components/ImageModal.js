/* eslint-disable @next/next/no-img-element */
import cls from "classnames";
import { useLayoutEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const ImageModal = () => {
  const [srcset, setSrcset] = useState(null);
  const [alt, setAlt] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const selectors = [".mockup img"];
    const images = selectors.reduce((acc, selector) => {
      const results = document.querySelectorAll(selector);
      return acc.concat([...results]);
    }, []);

    for (const img of images) {
      if (img.onclick) continue;
      img.onclick = () => {
        setSrcset(img.srcset);
        setAlt(img.alt);
        setLoading(true);
      };
    }

    return () => {
      for (const img of images) {
        img.onclick = null;
      }
    };
  }, []);

  const active = !!srcset;
  const onClose = () => {
    setSrcset(null);
    setAlt(null);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <aside open={active} className={cls("modal", { active })} id="image-modal">
      <div className="modal-overlay" onClick={onClose} aria-label="close"></div>
      <div className="modal-container">
        <div className="modal-header">
          <a className="btn btn-clear float-right" aria-label="close">
            <FiX onClick={onClose} />
          </a>
        </div>
        <div className="modal-body">
          <img
            className={cls(
              "img-responsive img-fit-contain",
              isLoading && "d-invisible"
            )}
            srcset={srcset}
            alt={alt}
            onLoad={handleLoad}
          />
          {isLoading && <div className="loading"></div>}
        </div>
      </div>
    </aside>
  );
};

export default ImageModal;
