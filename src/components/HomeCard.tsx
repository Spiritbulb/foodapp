import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase"; // <-- Add this import

import { Star, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  item: {
    item_id: number;
    title: string;
    image: string;
    rating?: number;
    nationality?: string;
    ingredients?: string;
    description?: string;
    portion?: string;
    user_id?: string;
    price?: number;
  };
  onPress?: () => void;
}

export const HomeCards = ({ item, onPress }: Props) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  // Fetch user name and image from Supabase
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!item?.user_id) return;
        // Adjust the table and column names as needed
        const { data, error } = await supabase
          .from("users") // Your users table name
          .select("name, image") // The columns you want
          .eq("id", item.user_id)
          .single();

        if (error) throw error;
        if (data) {
          setUserName(data.name || null);
          setUserImage(data.image || null);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (item?.user_id) {
      fetchUserDetails();
    }
  }, [item?.user_id]);

  const handleCardPress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/properties/${item?.item_id}`);
    }
  };

  if (!item) {
    return null;
  }

  return (
    <motion.div
      className="w-[90%] h-[580px] rounded-xl bg-white shadow-lg flex flex-col justify-between my-2 mx-auto relative"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex flex-col h-full">
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 flex items-center bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg z-50 shadow-sm">
          <Star />
          <span className="text-xs font-bold text-gray-600 ml-1">
            {item?.rating || "N/A"}
          </span>
        </div>

        {/* User Info */}
        <div className="flex items-center mt-2 px-4">
          <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2">
            <Image
              src={userImage || 'https://files.spiritbulb.org/plate%20pal.png'}
              alt="User"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm font-bold text-gray-800">
            {userName || "Food Lover"}
          </span>
        </div>

        {/* Food Image */}
        <div className="relative w-full h-[65%] mt-4 mx-auto">
          <Image
            src={item?.image || '/default-food-image.jpg'}
            alt={item?.title || "Food image"}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Food Details */}
        <div className="px-4 pt-2 flex-grow">
          <h3 className="text-lg font-bold text-gray-800 mt-2">
            {item?.title || "No Title"}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {item?.nationality || "N/A"} | {item?.ingredients || "N/A"}
          </p>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {item?.description || "N/A"}
          </p>

          {/* Portion */}
          <div className="flex mt-2">
            <span className="text-sm text-gray-600">
              Portion: {item?.portion || "N/A"}
            </span>
          </div>
        </div>

        {/* Order Button and Favorite Icon */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 pb-4">
          <button
            onClick={handleCardPress}
            className="flex-1 py-3 bg-primary rounded-lg text-center shadow-md hover:bg-yellow-500 transition-colors"
          >
            <span className="text-base font-bold text-black">
              Make Order
            </span>
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="ml-4 p-2"
          >
            <Heart
              className={`text-red-500 ${isFavorite ? "fill-red-500" : "fill-none"}`}
              size={24}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};