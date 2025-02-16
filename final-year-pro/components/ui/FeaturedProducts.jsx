import { useEffect, useState } from "react";
import { useCart } from "../../app/contexts/cartContext";


export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart(); // Get addToCart from CartContext
  
    useEffect(() => {
      async function fetchFeaturedProducts() {
        const response = await fetch("/api/featured-products");
        const data = await response.json();
        setProducts(data.products);
      }
  
      fetchFeaturedProducts();
    }, []);
  
    return (
      <section className="mb-12">
        <h2 className="text-5xl font-bold text-center mb-4 animate-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600">
            Featured Products
          </span>
        </h2>
        <p className="text-center text-gray-700 mb-8 text-lg">
          Check out our specially curated selection!
        </p>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="group bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white 
                    ${product.badge === 'New' ? 'bg-gradient-to-r from-pink-500 to-violet-500' : ''} 
                    ${product.badge === 'Bestseller' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : ''} 
                    ${product.badge === 'Limited Edition' ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : ''} 
                    ${product.badge === 'Trending' ? 'bg-gradient-to-r from-red-500 to-pink-500' : ''}`}>
                    {product.badge || "Featured"}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-pink-600">{product.price}</p>
                    <p className="text-xs text-gray-500">Inclusive of taxes</p>
                  </div>
                  <button 
                    className="bg-black hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    onClick={() => addToCart({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.image
                    })}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4h1.5l1.8 8.7a2 2 0 002 1.3h8.4a2 2 0 002-1.3L20 4h-1.5l-1.8 8.7a.5.5 0 01-.5.3H7.7a.5.5 0 01-.5-.3L5.5 4z" />
                    </svg>
                    Free Delivery
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.5/5
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  