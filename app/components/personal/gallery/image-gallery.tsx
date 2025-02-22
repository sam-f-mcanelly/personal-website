"use client"

import type React from "react"
import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { usePopup } from "@/contexts/popup-context"

interface ImageGalleryProps {
  images: string[]
  title?: string
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title = "Gallery" }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftChevron, setShowLeftChevron] = useState(false)
  const [showRightChevron, setShowRightChevron] = useState(true)
  const { openPopup } = usePopup()

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftChevron(scrollLeft > 0)
      setShowRightChevron(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }, [])

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
      return () => scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-neutral-accent/30 transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-neutral-accent/50 hover:shadow-xl dark:border-slate-800">
      <h2 className="text-3xl font-bold mb-6 text-neutral-heading">{title}</h2>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-80 h-60 mr-4 snap-start">
              <button
                onClick={() => openPopup(src)}
                className="w-full h-full focus:outline-none focus:ring-2 focus:ring-neutral-accent rounded-lg overflow-hidden"
              >
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  width={320}
                  height={240}
                  className="rounded-lg object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </button>
            </div>
          ))}
        </div>
        {showLeftChevron && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-accent"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        {showRightChevron && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-accent"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  )
}

export default ImageGallery
