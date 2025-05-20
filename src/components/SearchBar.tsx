import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import images from '@/constants/images';
import { FiSearch, FiX, FiUser, FiHome, FiCompass, FiHeart, FiShoppingCart, FiMenu } from 'react-icons/fi';
import { useGlobalContext } from '@/lib/global-provider';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

export const SearchBar = ({ initialQuery = '', onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { user, isLogged, logout, loading } = useGlobalContext();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#eab620]/80 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-3 sm:gap-4">
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FiMenu className="text-lg" />
        </Button>

        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src={images.icon}
            alt="Plate Pals Logo"
            width={100}
            height={50}
            className="object-contain w-20 sm:w-24"
          />
        </div>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-2 sm:mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-10 py-1.5 sm:py-2 border border-gray-200 rounded-full bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eab620] focus:border-[#eab620] focus:bg-white text-sm sm:text-base"
              placeholder="Search dishes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setQuery('')}
              >
                <FiX className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </form>

        {/* User Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="relative hidden xs:inline-flex">
            <FiShoppingCart className="text-lg" />
            <span className="absolute -top-1 -right-1 bg-[#500000] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>
          
          {!loading && isLogged && user ? (
            <>
              <div className="hidden sm:flex items-center gap-2">
                <div className="text-sm font-medium text-gray-700 truncate max-w-[100px]">
                  Hi, {user.email?.split('@')[0]}
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#eab620] bg-gray-100 flex items-center justify-center">
                  {user.user_metadata?.avatar_url ? (
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt={user.email || 'User'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-gray-500" />
                  )}
                </div>
              </div>
              <Button 
                variant="ghost" 
                onClick={logout}
                className="text-sm hidden sm:inline-flex"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button 
              variant="default" 
              className="bg-[#500000] hover:bg-[#300000] hidden sm:inline-flex"
              onClick={() => router.push('/auth')}
              disabled={loading}
            >
              <FiUser className="mr-1 sm:mr-2" />
              {loading ? '...' : 'Sign In'}
            </Button>
          )}

          {/* Mobile User Icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="sm:hidden"
            onClick={() => !isLogged && router.push('/auth')}
          >
            <FiUser className="text-lg" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-2 flex flex-col gap-2">
            <Button variant="ghost" className="justify-start">
              <FiHome className="mr-2" />
              Home
            </Button>
            <Button variant="ghost" className="justify-start">
              <FiCompass className="mr-2" />
              Explore
            </Button>
            <Button variant="ghost" className="justify-start">
              <FiHeart className="mr-2" />
              Favorites
            </Button>
            {isLogged && (
              <Button variant="ghost" className="justify-start" onClick={logout}>
                Sign Out
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};