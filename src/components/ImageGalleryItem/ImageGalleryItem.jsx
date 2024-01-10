import React from 'react';
import { ItemImg, ListItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ alt_description, urls, onClick }) => {
  return (
    <ListItem>
      <ItemImg
        src={urls.small}
        alt={alt_description}
        onClick={() => {
          onClick(urls.full);
        }}
      />
    </ListItem>
  );
};
