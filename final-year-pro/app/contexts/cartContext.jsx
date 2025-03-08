"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 */

/**
 * @typedef {Object} CartContextType
 * @property {CartItem[]} cart
 * @property {(product: CartItem) => void} addToCart
 * @property {(productId: string) => void} removeFromCart
 * @property {(productId: string, newQuantity: number) => void} updateQuantity
 * @property {() => void} clearCart
 */

/**
 * @param {{ children: React.ReactNode }} props
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, isIncrement = true) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        if (!isIncrement && existingItem.quantity === 1) {
          return prev.filter(item => item.id !== product.id);
        }
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + (isIncrement ? 1 : -1) }
            : item
        );
      }
      
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  /** @type {CartContextType} */
  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * @returns {CartContextType}
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
