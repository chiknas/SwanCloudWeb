import React, { useCallback, useContext, useEffect, useState } from "react";
import Gallery, { PhotoProps } from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { useFiles } from "hooks/useFiles";
import { GlobalContextType, GlobalContext } from "services/GlobalContext";
import { ThumbnailRenderer } from "components/gallery/ThumbnailRenderer";
import { CarouselImageView } from "components/gallery/CarouselImageView";

export const SwanGallery: React.FunctionComponent = () => {
  const [photos, setPhotos] = useState<PhotoProps[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const { serverUrl, serverKey } = useContext<GlobalContextType>(GlobalContext);
  const files = useFiles(serverUrl, serverKey, undefined);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
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
      <Gallery
        photos={photos}
        onClick={openLightbox}
        renderImage={(details) => {
          return <ThumbnailRenderer details={details} />;
        }}
      />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              trackProps={{
                onViewChange: (view: number) => {
                  setCurrentImage(view);
                },
              }}
              currentIndex={currentImage}
              components={{ View: CarouselImageView }}
              views={photos.map((photo) => ({
                source: photo.src,
                alt: photo.key,
                caption: photo.alt,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </>
  );
};
