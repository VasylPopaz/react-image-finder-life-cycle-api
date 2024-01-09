import { toast } from 'react-toastify';

export function checkMorePhotos(page, total) {
  if (page >= Math.ceil(total / 12)) {
    toast.info(`We're sorry, but you've reached the end of search results.`);
    return false;
  }

  return true;
}
