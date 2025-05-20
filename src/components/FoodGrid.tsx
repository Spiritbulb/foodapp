import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { FoodCard } from './FoodCard';
import { useRouter } from 'next/router';

interface FoodGridProps {
  items: any[];
}

export const FoodGrid = ({ items }: FoodGridProps) => {
  const router = useRouter();
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchFoodItems = async (pageNum: number) => {
    try {
      setLoading(true);
      const pageSize = 12;
      const from = (pageNum - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error } = await supabase
        .from('food_items')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      if (data.length < pageSize) {
        setHasMore(false);
      }

      setFoodItems(prev => (pageNum === 1 ? data : [...prev, ...data]));
    } catch (error) {
      console.error('Error fetching food items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodItems(page);
  }, [page]);

  const handleCardClick = (item: any) => {
    router.push(`/food/${item.id}`);
  };

  return (
    <div className="">
      <div className="grid w-full grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item) => (
          <FoodCard
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            description={item.description}
            category={item.category}
            rating={item.rating}
            
          />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center mt-6 sm:mt-8">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-b-2 border-[#eab620]"></div>
        </div>
      )}

      {hasMore && !loading && (
        <div className="flex justify-center mt-6 sm:mt-8">
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-4 sm:px-6 py-1.5 sm:py-2 bg-[#eab620] text-[#500000] rounded-full hover:bg-[#f8c632] transition-colors text-sm sm:text-base"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};