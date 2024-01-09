import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div style={{ margin: '0 auto' }}>
      <InfinitySpin
        height="200"
        width="200"
        radius="9"
        color="rgb(90, 66, 144)"
        ariaLabel="loading"
      />
    </div>
  );
};
