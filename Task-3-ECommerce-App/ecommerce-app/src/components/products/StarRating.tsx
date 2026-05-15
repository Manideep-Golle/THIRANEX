import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
}

export function StarRating({ rating, maxRating = 5, size = 'sm' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }).map((_, i) => {
        const filled = i < Math.floor(rating)
        const partial = !filled && i < rating
        return (
          <div key={i} className="relative">
            <Star className={`${sizeClasses[size]} text-muted-foreground/30`} />
            {(filled || partial) && (
              <div className="absolute inset-0 overflow-hidden" style={{ width: partial ? `${(rating - i) * 100}%` : '100%' }}>
                <Star className={`${sizeClasses[size]} fill-amber-400 text-amber-400`} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
