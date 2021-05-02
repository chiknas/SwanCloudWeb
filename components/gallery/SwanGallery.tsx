import React, { useCallback, useContext, useEffect, useState } from "react";
import Gallery, { PhotoProps } from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { useFiles } from "hooks/useFiles";
import { GlobalContextType, GlobalContext } from "services/GlobalContext";
import { ThumbnailRenderer } from "components/gallery/ThumbnailRenderer";
import { CarouselImageView } from "components/gallery/CarouselImageView";
import { Button } from "@material-ui/core";

export const SwanGallery: React.FunctionComponent = () => {
  const [photos, setPhotos] = useState<PhotoProps[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const { serverUrl, serverKey } = useContext<GlobalContextType>(GlobalContext);
  const [cursor, setCursor] = useState<string | undefined>();
  const files = useFiles(serverUrl, serverKey, cursor);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setCarouselIndex(0);
    setViewerIsOpen(false);
  };

  useEffect(() => {
    const data =
      files &&
      files.nodes &&
      files.nodes.map((node) => {
        return {
          src: `${serverUrl}/api/files/thumbnail/${node.id}`,
          height: 1,
          width: 1,
          alt: node.fileName,
          key: node.id,
        };
      });
    setPhotos(data ?? []);
  }, [files]);

  return (
    <>
      {photos.length > 0 && [
        <Gallery
          photos={photos}
          columns={(width) => {
            if (width < 600) {
              return 4;
            } else if (width > 600 && width < 1200) {
              return 6;
            } else {
              return 8;
            }
          }}
          direction="column"
          onClick={openLightbox}
          renderImage={(details) => {
            return <ThumbnailRenderer details={details} />;
          }}
        />,
        <Button
          onClick={() => {
            setPhotos([]);
            setCursor(files?.nextCursor);
            window.scrollTo(0, 0);
          }}
        >
          Next Page
        </Button>,
      ]}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              trackProps={{
                onViewChange: (view: number) => {
                  setCarouselIndex(view);
                },
              }}
              currentIndex={carouselIndex}
              components={{ View: CarouselImageView }}
              views={[
                {
                  source: "/loading.gif",
                  // @ts-ignore: carousel can accept a custom type
                  alt: photos[currentImage].key,
                  caption: photos[currentImage].alt,
                },
              ]}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </>
  );
};
