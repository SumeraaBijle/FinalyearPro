"use client";
import React, { useState } from "react";
import { Heart, Trash2, ShoppingCart, AlertCircle } from "lucide-react";
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
import Footer from "@/app/head/foot/Footer";
import Header from "@/app/head/foot/Header";

interface WishlistItem {
  id: number;
  name: string;
  price: string;
  image: string;
  stock: "In Stock" | "Out of Stock";
}

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
          <span className="text-sm text-gray-500">{wishlistItems.length} items</span>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 mb-4">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Start adding items you love to your wishlist</p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              Explore Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group relative overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {item.stock === "Out of Stock" && (
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
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">{item.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      disabled={item.stock === "Out of Stock"}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Trash2 className="w-4 h-4 text-gray-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove from Wishlist</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove this item from your wishlist?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => removeFromWishlist(item.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      {/* Add the Footer component here */}
      <Footer />
    </div>
  );
};

export default WishlistPage;