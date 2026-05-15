import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ProductGrid } from '@/components/products/ProductGrid'
import { getProducts, getCategories } from '@/lib/supabase'
import type { Product } from '@/types'

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [showFilters, setShowFilters] = useState(false)

  const activeFiltersCount = [selectedCategory, searchQuery].filter(Boolean).length

  useEffect(() => {
    loadCategories()
    loadProducts()
  }, [searchParams])

  const loadCategories = async () => {
    try {
      const cats = await getCategories()
      setCategories(cats)
    } catch {
      // Handle error
    }
  }

  const loadProducts = async () => {
    setIsLoading(true)
    try {
      const search = searchParams.get('search') || undefined
      const category = searchParams.get('category') || undefined
      const data = await getProducts({ search, category })
      setProducts(data)
    } catch {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchQuery) {
      params.set('search', searchQuery)
    } else {
      params.delete('search')
    }
    setSearchParams(params)
  }

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams)
    if (category === selectedCategory) {
      params.delete('category')
      setSelectedCategory('')
    } else {
      params.set('category', category)
      setSelectedCategory(category)
    }
    setSearchParams(params)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSearchParams(new URLSearchParams())
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">{products.length} products available</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">{activeFiltersCount}</Badge>
              )}
            </Button>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" /> Clear
              </Button>
            )}
          </div>
        </div>

        {/* Filter Tags */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchQuery}
                <X className="h-3 w-3 cursor-pointer" onClick={() => { setSearchQuery(''); handleSearch({ preventDefault: () => {} } as any) }} />
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="gap-1">
                {selectedCategory}
                <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(selectedCategory)} />
              </Badge>
            )}
          </div>
        )}

        {/* Category Filter */}
        {showFilters && (
          <div className="mb-8 p-4 rounded-xl border bg-card">
            <h4 className="font-semibold mb-3">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <ProductGrid
          products={products}
          isLoading={isLoading}
          emptyMessage="No products found matching your criteria."
        />
      </div>
    </div>
  )
}
