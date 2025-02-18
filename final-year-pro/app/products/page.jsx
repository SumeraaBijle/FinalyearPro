"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import Image from "next/image";
import Link from "next/link";
import { Heart, CheckCircle, AlertCircle, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/cartContext";
import Header from "../head/foot/Header";
import Footer from "../head/foot/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";

const categories = ["Gift-items", "Office-essentials", "School-supplies"];

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [wishlistItems, setWishlistItems] = useState([]);
  const { cart, addToCart } = useCart();
  const [popup, setPopup] = useState({ visible: false, message: "" });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // Use useSearchParams to read the category query parameter
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    // Fetch products
    fetch("/api/prod_page")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data.products); // Debugging
        setProducts(data.products || []);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Set the filter based on the category query parameter
  useEffect(() => {
    if (category) {
      setFilters([category]);
    }
  }, [category]);

  const handleFilterChange = (category) => {
    setFilters(category === "All" ? [] : [category]);
  };

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const isInWishlist = prev.some((item) => item.id === product.id);
      const newWishlist = isInWishlist
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, { ...product, stock: "In Stock" }];

      showPopup(
        isInWishlist
          ? "Item removed from your wishlist."
          : "Item added to your wishlist."
      );

      return newWishlist;
    });
  };

  const showPopup = (message) => {
    setPopup({ visible: true, message });
    setTimeout(() => setPopup({ visible: false, message: "" }), 3000);
  };

  const filteredProducts = products.filter(
    (product) => filters.length === 0 || filters.includes(product.category)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "priceLowToHigh") return a.price - b.price;
    if (sortOrder === "priceHighToLow") return b.price - a.price;
    return 0;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 relative">
      {popup.visible && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 z-50">
          <CheckCircle className="h-5 w-5" />
          <span>{popup.message}</span>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setSelectedImage(0);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Image
                    src={selectedProduct.images?.[selectedImage] || "/placeholder.svg"}
                    alt={`${selectedProduct.name} - View ${selectedImage + 1}`}
                    width={400}
                    height={400}
                    className="rounded-lg object-cover w-full h-[300px]"
                  />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {selectedProduct.images?.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? "border-black" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${selectedProduct.name} - Thumbnail ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-[60px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-600 mb-4 text-sm">{selectedProduct.description}</p>
                <p className="text-lg font-bold mb-4">{formatPrice(selectedProduct.price)}</p>
                <button
                  onClick={() => {
                    const productWithId = {
                      ...selectedProduct,
                      id: selectedProduct.id || `product-${Date.now()}`, // Fallback to a unique id
                    };
                    console.log("Adding product from product page:", productWithId); // Debugging
                    addToCart(productWithId);
                    setSelectedProduct(null);
                    setSelectedImage(0);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded hover:from-purple-700 hover:to-pink-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <select
            value={filters[0] || "All"}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="All">Filter By</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="default">Sort By</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="group relative overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square" onClick={() => setSelectedProduct(product)}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.stock === "Out of Stock" && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <p className="text-white font-semibold flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        Out of Stock
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 grid gap-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600">{formatPrice(product.price)}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    onClick={() => {
                      const productWithId = {
                        ...product,
                        id: product.id || `product-${Date.now()}`, // Fallback to a unique id
                      };
                      console.log("Adding product from product page:", productWithId); // Debugging
                      addToCart(productWithId);
                    }}
                    disabled={product.stock === "Out of Stock"}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleWishlist(product)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        wishlistItems.some((item) => item.id === product.id)
                          ? "fill-current text-red-500"
                          : "text-gray-500"
                      }`}
                    />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}