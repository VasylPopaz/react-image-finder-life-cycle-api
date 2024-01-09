import axios from 'axios';

export async function getPhotos(query, page) {
  const config = {
    url: 'https://pixabay.com/api/',
    params: {
      key: '41201504-c11fb7d7c33d31898285d0b81',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 12,
    },
  };

  const { data } = await axios(config);
  return data;
}
