import React from 'react';
import { ItemImg, ListItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) => {
  return (
    <ListItem>
      <ItemImg
        src={webformatURL}
        alt={tags}
        onClick={() => {
          onClick(largeImageURL);
        }}
      />
    </ListItem>
  );
};
