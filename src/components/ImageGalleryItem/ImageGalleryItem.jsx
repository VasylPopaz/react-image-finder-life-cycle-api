import React from 'react';
import { ItemImg, ListItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, alt_description, urls, onClick }) => {
  return (
    <ListItem>
      <ItemImg
        src={urls.small}
        alt={alt_description}
        onClick={() => {
          onClick({ id, alt_description, urls });
        }}
      />
    </ListItem>
  );
};
