import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, Package, ShoppingBag, Users, DollarSign, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AdminStatsCard } from '@/components/admin/AdminStatsCard'
import { ProductForm } from '@/components/admin/ProductForm'
import { OrderStatusBadge } from '@/components/admin/OrderStatusBadge'
import { useAuthStore } from '@/stores/authStore'
import { getProducts, deleteProduct, getOrders, updateOrderStatus } from '@/lib/supabase'
import { formatPrice, formatDate } from '@/lib/utils'
import type { Product, Order } from '@/types'
import toast from 'react-hot-toast'

export function AdminPage() {
  const navigate = useNavigate()
  const { user, isAdmin, isLoading: authLoading } = useAuthStore()
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductFormOpen, setIsProductFormOpen] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [stats, setStats] = useState({ revenue: 0, totalOrders: 0, totalProducts: 0, totalUsers: 0 })

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/')
      toast.error('Access denied')
    }
  }, [authLoading, isAdmin])

  useEffect(() => {
    if (isAdmin) {
      loadData()
    }
  }, [isAdmin])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [productsData, ordersData] = await Promise.all([
        getProducts(),
        getOrders(),
      ])
      setProducts(productsData)
      setOrders(ordersData)

      // Calculate stats
      const revenue = ordersData.reduce((sum, order) => sum + order.total, 0)
      setStats({
        revenue,
        totalOrders: ordersData.length,
        totalProducts: productsData.length,
        totalUsers: new Set(ordersData.map(o => o.user_id)).size,
      })
    } catch {
      toast.error('Failed to load admin data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id)
      setProducts(products.filter(p => p.id !== id))
      toast.success('Product deleted')
      setDeleteConfirmId(null)
    } catch {
      toast.error('Failed to delete product')
    }
  }

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await updateOrderStatus(orderId, status)
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o))
      toast.success('Order status updated')
    } catch {
      toast.error('Failed to update order status')
    }
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (authLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!isAdmin) return null

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your store</p>
          </div>
          <Button onClick={() => { setSelectedProduct(null); setIsProductFormOpen(true) }}>
            <Plus className="h-4 w-4 mr-2" /> Add Product
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <AdminStatsCard
            title="Total Revenue"
            value={formatPrice(stats.revenue)}
            icon="revenue"
          />
          <AdminStatsCard
            title="Total Orders"
            value={stats.totalOrders.toString()}
            icon="orders"
          />
          <AdminStatsCard
            title="Products"
            value={stats.totalProducts.toString()}
            icon="products"
          />
          <AdminStatsCard
            title="Customers"
            value={stats.totalUsers.toString()}
            icon="users"
          />
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Products</CardTitle>
                  <div className="relative max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium">Product</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Category</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Price</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Stock</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                        <th className="text-right py-3 px-4 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg overflow-hidden bg-muted">
                                <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                              </div>
                              <span className="font-medium text-sm">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">{product.category}</td>
                          <td className="py-3 px-4 text-sm">{formatPrice(product.price)}</td>
                          <td className="py-3 px-4 text-sm">{product.stock}</td>
                          <td className="py-3 px-4">
                            <Badge variant={product.stock > 0 ? 'success' : 'destructive'}>
                              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => { setSelectedProduct(product); setIsProductFormOpen(true) }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => setDeleteConfirmId(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium">Order ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Items</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Total</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                        <th className="text-right py-3 px-4 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="py-3 px-4 text-sm font-medium">#{order.id.slice(0, 8)}</td>
                          <td className="py-3 px-4 text-sm">{formatDate(order.created_at)}</td>
                          <td className="py-3 px-4 text-sm">{order.items?.length || 0} items</td>
                          <td className="py-3 px-4 text-sm font-semibold">{formatPrice(order.total)}</td>
                          <td className="py-3 px-4">
                            <OrderStatusBadge status={order.status} />
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Select
                              value={order.status}
                              onValueChange={(value) => handleUpdateOrderStatus(order.id, value as Order['status'])}
                            >
                              <SelectTrigger className="w-32 h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Product Form Dialog */}
        <ProductForm
          product={selectedProduct}
          isOpen={isProductFormOpen}
          onClose={() => setIsProductFormOpen(false)}
          onSuccess={loadData}
        />

        {/* Delete Confirmation */}
        <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Product</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this product? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteConfirmId && handleDeleteProduct(deleteConfirmId)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
