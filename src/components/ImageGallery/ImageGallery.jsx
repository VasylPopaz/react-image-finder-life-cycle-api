import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <List>
      {images.map((elem, index) => {
        return <ImageGalleryItem key={index} onClick={onClick} {...elem} />;
      })}
    </List>
  );
};
