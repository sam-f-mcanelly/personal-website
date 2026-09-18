import PhotoGallery, { type Photo } from './gallery/photo-gallery';

import skydiving2322 from '@/public/images/gallery/skydiving/IMG_2322.jpg';
import skydiving3429 from '@/public/images/gallery/skydiving/IMG_3429.jpg';
import skydiving4072 from '@/public/images/gallery/skydiving/IMG_4072.jpg';
import skydiving2363 from '@/public/images/gallery/skydiving/IMG_2363.jpg';
import overlanding3426 from '@/public/images/gallery/overlanding/IMG_3426.jpg';
import overlanding4208 from '@/public/images/gallery/overlanding/IMG_4208.jpg';
import overlanding4455 from '@/public/images/gallery/overlanding/IMG_4455.jpg';
import overlanding4088 from '@/public/images/gallery/overlanding/IMG_4088.jpg';
import overlanding3933 from '@/public/images/gallery/overlanding/IMG_3933.jpg';
import general2878 from '@/public/images/gallery/general/IMG_2878.jpg';

// Static imports give Next.js each photo's dimensions and a blurred placeholder.
const photos: Photo[] = [
  { image: skydiving2322, alt: 'Skydiving upside down in freefall over the desert' },
  { image: skydiving3429, alt: 'Skydiving' },
  { image: skydiving4072, alt: 'Skydiving' },
  { image: skydiving2363, alt: 'Skydiving' },

  { image: overlanding3426, alt: 'Overlanding' },
  { image: overlanding4208, alt: 'Overlanding' },
  { image: overlanding4455, alt: 'Overlanding' },
  { image: overlanding4088, alt: 'Overlanding' },
  { image: overlanding3933, alt: 'Overlanding' },

  { image: general2878, alt: 'Photo from my travels' },
];

export default function Gallery() {
  return <PhotoGallery photos={photos} title="Gallery" />;
}
