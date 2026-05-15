import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-neutral-900 to-neutral-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-serif text-xl font-bold">LuxeMarket</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Curated luxury products for the modern lifestyle. Quality meets elegance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link to="/products?category=electronics" className="hover:text-foreground transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=fashion" className="hover:text-foreground transition-colors">Fashion</Link></li>
              <li><Link to="/products?category=home" className="hover:text-foreground transition-colors">Home & Living</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/orders" className="hover:text-foreground transition-colors">Order Status</Link></li>
              <li><Link to="/wishlist" className="hover:text-foreground transition-colors">Wishlist</Link></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Shipping Info</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Returns</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 LuxeMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
