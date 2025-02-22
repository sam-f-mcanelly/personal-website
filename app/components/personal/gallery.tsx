import { PopupProvider } from "@/contexts/popup-context"
import ImageGallery from "./gallery/image-gallery"
import ImagePopup from "./gallery/image-popup"

const images = [
  // skydiving
  "/images/gallery/skydiving/IMG_2322.jpg",
  "/images/gallery/skydiving/IMG_3429.jpg",
  "/images/gallery/skydiving/IMG_4072.jpg",
  "/images/gallery/skydiving/IMG_2363.jpg",

  // off roading
  "/images/gallery/overlanding/IMG_3426.jpg",
  "/images/gallery/overlanding/IMG_4208.jpg",
  "/images/gallery/overlanding/IMG_4455.jpg",
  "/images/gallery/overlanding/IMG_4088.jpg",
  "/images/gallery/overlanding/IMG_3933.jpg",

  // general
  "/images/gallery/general/IMG_2878.jpg",
]

export default function Gallery() {
  return (
    <PopupProvider>
      <div className="container mx-auto px-0">
        <ImageGallery images={images} title="Gallery" />
      </div>
      <ImagePopup images={images} />
    </PopupProvider>
  )
}


