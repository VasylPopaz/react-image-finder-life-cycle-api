import React from 'react';
import { LoadMoreButton } from './Button.styled';

export const Button = ({ onClick }) => {
  return <LoadMoreButton onClick={onClick}>Load more</LoadMoreButton>;
};
