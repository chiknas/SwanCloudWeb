import React, { useCallback, useEffect, useState } from "react";
import Gallery, { PhotoProps } from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { FilesResponse } from "components/gallery/types";

export const SwanGallery: React.FunctionComponent = () => {
  const [photos, setPhotos] = useState<PhotoProps[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/files?limit=50")
      .then((response) => response.json())
      .then((response: FilesResponse) => {
        const data = response.nodes.map((node) => {
          return {
            src: `http://localhost:8080/api/files/thumbnail/${node.id}`,
            height: 1,
            width: 1,
            alt: node.fileName,
          };
        });
        setPhotos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((photo) => ({
                source: photo.src,
                alt: photo.alt,
                caption: photo.alt,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </>
  );
};
