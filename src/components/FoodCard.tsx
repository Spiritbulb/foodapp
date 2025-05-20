import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiPlus, FiStar } from 'react-icons/fi';

interface FoodCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: number;
  onClick?: () => void;
}

export const FoodCard = ({
  id,
  title,
  price,
  image,
  description,
  category,
  rating,
  onClick,
}: FoodCardProps) => {
  return (
    <motion.div
      whileHover={{ z: 10, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      whileTap={{ scale: 0.98 }}
      className="bg-white shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-40 sm:h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={false}
        />
        
        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center text-xs font-semibold shadow-sm">
            <FiStar className="text-yellow-500 mr-1" />
            <span className="text-gray-800">{rating.toFixed(1)}</span>
          </div>
        )}
        
        {/* Quick Add Button */}
        <button 
          className="absolute bottom-2 right-2 bg-[#500000] text-white p-2 rounded-full shadow-lg hover:bg-[#300000] transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // Add to cart logic here
          }}
        >
          <FiPlus className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 sm:p-5">
        {/* Category Tag */}
        {category && (
          <span className="inline-block text-xs font-medium text-[#eab620] bg-[#fef6e6] px-2 py-1 rounded-full mb-2">
            {category}
          </span>
        )}
        
        {/* Food Title */}
        <h3 className="font-bold text-gray-900 text-base sm:text-lg line-clamp-1">{title}</h3>
        
        {/* Description */}
        {description && (
          <p className="text-gray-500 text-sm mt-1 line-clamp-2 min-h-[40px]">
            {description}
          </p>
        )}
        
        {/* Price and Order Button */}
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-400">Starts at</span>
            <span className="block font-bold text-[#500000] text-lg sm:text-xl">KES {price.toFixed(2)}</span>
          </div>
          <button 
            className="flex items-center gap-1 bg-gradient-to-r from-[#eab620] to-[#f8c632] text-[#500000] px-3 sm:px-4 py-1.5 rounded-full hover:shadow-md transition-all text-sm sm:text-base font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              // Order logic here
            }}
          >
            <span>Order</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};