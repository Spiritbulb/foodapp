import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import images from '@/constants/images';
import { Button } from '@/components/ui/button';

interface CategorySidebarProps {
  onCategorySelect?: (category: string | null) => void;
  selectedCategory?: string | null;
}

export const CategorySidebar = ({ onCategorySelect, selectedCategory }: CategorySidebarProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('food_items')
          .select('category')
          .not('category', 'is', null);

        if (error) throw error;

        const uniqueCategories = Array.from(
          new Set(data.map(item => item.category))
        ).filter(Boolean) as string[];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-3 sm:p-4 sticky top-0 h-screen border-r border-gray-200 bg-white overflow-y-auto">
      {/* Categories */}
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 px-2 sm:px-4">Categories</h3>
        {loading ? (
          <div className="space-y-2 px-2 sm:px-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        ) : (
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category}>
                <Button 
                  className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-colors text-sm sm:text-base ${
                    selectedCategory === category 
                      ? 'bg-[#500000] text-white' 
                      : 'hover:bg-[#500000] hover:text-white'
                  }`}
                  onClick={() => onCategorySelect && onCategorySelect(category === selectedCategory ? null : category)}
                >
                  {category}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};