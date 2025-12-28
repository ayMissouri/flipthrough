import { ARTIC_API_BASE_URL, IIIF_BASE_URL, IMAGE_WIDTH } from './constants';

export async function getArtworkCount() {
  try {
    const response = await fetch(`${ARTIC_API_BASE_URL}/artworks?limit=1`);
    if (!response.ok) {
      throw new Error(`Failed to fetch artwork count: ${response.statusText}`);
    }
    const data = await response.json();
    return data.pagination.total;
  } catch (error) {
    console.error('Error fetching artwork count:', error);
    throw error;
  }
}

export async function getRandomArtwork(totalArtworks) {
  if (!totalArtworks || totalArtworks <= 0) {
    return null;
  }
  
  const effectiveTotal = Math.min(totalArtworks, 100); 
  const randomPage = Math.floor(Math.random() * effectiveTotal) + 1;

  try {
    const response = await fetch(
      `${ARTIC_API_BASE_URL}/artworks?page=${randomPage}&limit=1&fields=id,title,artist_display,date_display,image_id`
    );

    if (!response.ok) {
        console.warn(`Failed to fetch artwork on page ${randomPage}: ${response.statusText}`);
        return null;
    }

    const data = await response.json();
    const artwork = data.data[0];

    if (!artwork || !artwork.image_id) {
      return null;
    }

    // https://www.artic.edu/iiif/2/{image_id}/full/{width},/0/default.jpg
    const imageUrl = `${IIIF_BASE_URL}/${artwork.image_id}/full/${IMAGE_WIDTH},/0/default.jpg`;

    return {
      ...artwork,
      image_url: imageUrl,
    };
  } catch (error) {
    console.error('Error fetching random artwork:', error);
    return null;
  }
}
