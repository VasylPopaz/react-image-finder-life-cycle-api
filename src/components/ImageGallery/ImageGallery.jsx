import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import { List } from './ImageGallery.styled';
import { nanoid } from 'nanoid';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <List>
      {images.map(elem => {
        return <ImageGalleryItem key={nanoid()} onClick={onClick} {...elem} />;
      })}
    </List>
  );
};
