import { useState, useEffect } from 'react';
import Head from 'next/head';
import { SidebarLayout } from '@/components/Layout/SidebarLayout';
import { CategorySidebar } from '@/components/CategorySidebar';
import { FoodGrid } from '@/components/FoodGrid';
import { SearchBar } from '@/components/SearchBar';
import { useGlobalContext } from '@/lib/global-provider';
import { supabase } from '@/lib/supabase';
import { PWAInstallButton } from '@/components/PWAInstallButton';

export default function HomePage() {
  const { user } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFoodItems = async () => {
      setIsLoading(true);
      
      let query = supabase
        .from('food_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching food items:', error);
      } else {
        setFoodItems(data || []);
      }
      
      setIsLoading(false);
    };

    const debounceTimer = setTimeout(() => {
      fetchFoodItems();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedCategory]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <>
      <Head>
        <title>PlatePals | Discover Delicious Food</title>
        <meta name="description" content="Find and order delicious food from local vendors" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <SidebarLayout sidebar={
        <CategorySidebar 
          onCategorySelect={handleCategorySelect} 
          selectedCategory={selectedCategory}
        />
      }>
        <div className="flex-1">
          <div className="sticky sm:py-4 border-b">
            <div className="flex justify-between items-center">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate max-w-[70vw] sm:max-w-none">
                {searchQuery 
                  ? `Results for "${searchQuery}"`
                  : selectedCategory
                    ? `${selectedCategory}`
                    : 'Featured'
                }
                {foodItems.length > 0 && !isLoading && (
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({foodItems.length} {foodItems.length === 1 ? 'item' : 'items'})
                  </span>
                )}
              </h1>
            </div>
          </div>
          
          <div className="p-3 sm:p-4 md:p-6">
            {isLoading ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg aspect-[3/4] animate-pulse"></div>
                ))}
              </div>
            ) : foodItems.length > 0 ? (
              <FoodGrid items={foodItems} />
            ) : (
              <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                <div className="text-gray-400 mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 sm:h-16 w-12 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">
                  No items found
                </h3>
                <p className="text-gray-500 text-center text-sm sm:text-base max-w-xs sm:max-w-md">
                  {searchQuery
                    ? "We couldn't find any dishes matching your search."
                    : selectedCategory
                      ? "No dishes available in this category yet."
                      : "No featured dishes available at the moment."
                  }
                </p>
              </div>
            )}
          </div>
        </div>
        <PWAInstallButton/>
      </SidebarLayout>
    </>
  );
}