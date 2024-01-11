import axios from 'axios';

export async function getPhotos(query, page) {
  const config = {
    url: 'https://api.unsplash.com//search/photos',
    params: {
      client_id: 'e1L2atNDIGS6THpSFKWgFtFw5RDu5T5AJMV3XF9RQ60',
      query,
      orientation: 'landscape',
      page,
      per_page: 12,
    },
  };

  const { data } = await axios(config);
  return data;
}
