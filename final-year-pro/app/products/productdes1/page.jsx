'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, StarHalf } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)

  const images = [
    '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600',
  ]

  const sizes = ['S', 'M', 'L', 'XL', 'XXL']

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={images[selectedImage]}
              alt="Product image"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex gap-4 overflow-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-24 aspect-square flex-shrink-0 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-primary' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Women Zip-Front Relaxed Fit Jacket</h1>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
                <StarHalf className="w-5 h-5 fill-primary text-primary" />
              </div>
              <span className="text-sm text-gray-600">(122)</span>
            </div>
          </div>

          <div className="text-3xl font-bold">$74</div>

          <p className="text-gray-600">
            A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Size</h3>
              <RadioGroup
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="flex flex-wrap gap-3"
              >
                {sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem
                      value={size}
                      id={`size-${size}`}
                      className="peer hidden"
                    />
                    <Label
                      htmlFor={`size-${size}`}
                      className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button 
              size="lg" 
              className="w-full"
              disabled={!selectedSize}
            >
              ADD TO CART
            </Button>
          </div>

          <div className="space-y-2 border-t pt-6">
            <p className="text-sm text-gray-600">100% Original product.</p>
            <p className="text-sm text-gray-600">Cash on delivery is available on this product.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

