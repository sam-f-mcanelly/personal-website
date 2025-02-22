"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode } from "react"

interface PopupContextType {
  selectedImage: string | null
  openPopup: (imageSrc: string) => void
  closePopup: () => void
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const openPopup = (imageSrc: string) => {
    setSelectedImage(imageSrc)
    document.body.style.overflow = "hidden"
  }

  const closePopup = () => {
    setSelectedImage(null)
    document.body.style.overflow = ""
  }

  return <PopupContext.Provider value={{ selectedImage, openPopup, closePopup }}>{children}</PopupContext.Provider>
}

export const usePopup = () => {
  const context = useContext(PopupContext)
  if (context === undefined) {
    throw new Error("usePopup must be used within a PopupProvider")
  }
  return context
}

