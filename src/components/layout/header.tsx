import Link from 'next/link';
import { Menu, User } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            AutoDealer
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/inventory" className="hover:text-blue-600">
              Inventory
            </Link>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>
            <Link 
              href="/admin" 
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <User size={18} />
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
