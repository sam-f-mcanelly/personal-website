"use client"

import type React from "react"
import { useEffect, useCallback, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { usePopup } from "@/contexts/popup-context"
import { useSwipeable } from 'react-swipeable'

const ImagePopup: React.FC<{ images: string[] }> = ({ images }) => {
  const { selectedImage, closePopup, openPopup } = usePopup()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (selectedImage) {
      const index = images.indexOf(selectedImage)
      if (index !== -1) {
        setCurrentIndex(index)
      }
    }
  }, [selectedImage, images])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup()
      } else if (event.key === "ArrowLeft") {
        navigateImage("prev")
      } else if (event.key === "ArrowRight") {
        navigateImage("next")
      }
    },
    [closePopup],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  const navigateImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      const newIndex = (currentIndex - 1 + images.length) % images.length
      openPopup(images[newIndex])
      setCurrentIndex(newIndex)
    } else {
      const newIndex = (currentIndex + 1) % images.length
      openPopup(images[newIndex])
      setCurrentIndex(newIndex)
    }
  }

  // Configure swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigateImage("next"),
    onSwipedRight: () => navigateImage("prev"),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: false // Enable for desktop swipe testing
  })

  if (!selectedImage) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
        <button
          onClick={closePopup}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>
        <div 
          {...swipeHandlers}
          className="relative w-full h-full"
        >
          <Image
            src={selectedImage || "/placeholder.svg"}
            alt="Selected image"
            layout="responsive"
            width={1600}
            height={900}
            objectFit="contain"
            className="rounded-lg"
            draggable={false}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-accent"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => navigateImage("next")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-accent"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImagePopup