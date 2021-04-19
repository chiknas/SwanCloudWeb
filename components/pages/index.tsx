import React from "react";
import { PageContainer } from "./PageContainer";
import { SwanGallery } from "components/gallery/SwanGallery";

export const Index: React.FunctionComponent = () => {
  return (
    <PageContainer>
      <SwanGallery />
    </PageContainer>
  );
};
