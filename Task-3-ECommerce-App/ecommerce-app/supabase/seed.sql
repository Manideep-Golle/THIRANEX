-- ============================================
-- SAMPLE DUMMY PRODUCTS
-- ============================================

INSERT INTO products (name, description, price, original_price, image_url, category, rating, review_count, stock, featured) VALUES
-- Electronics
('Wireless Noise-Canceling Headphones', 'Premium over-ear headphones with industry-leading noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals.', 299.99, 349.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop', 'Electronics', 4.8, 1243, 45, true),

('Smart Watch Pro', 'Advanced fitness tracking, heart rate monitoring, GPS, and 7-day battery life. Water-resistant up to 50 meters with premium titanium case.', 399.99, 449.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop', 'Electronics', 4.6, 892, 32, true),

('Portable Bluetooth Speaker', '360-degree sound with deep bass, 20-hour battery, waterproof design. Perfect for outdoor adventures and home entertainment.', 129.99, 159.99, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop', 'Electronics', 4.5, 567, 78, false),

('4K Ultra HD Monitor 27"', 'Professional-grade 4K display with 99% sRGB color accuracy, USB-C connectivity, and ergonomic stand. Ideal for creative professionals.', 549.99, 699.99, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop', 'Electronics', 4.7, 445, 15, true),

('Mechanical Keyboard RGB', 'Hot-swappable switches, per-key RGB lighting, aircraft-grade aluminum frame. The ultimate typing and gaming experience.', 179.99, 219.99, 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&h=600&fit=crop', 'Electronics', 4.4, 723, 56, false),

-- Fashion
('Minimalist Leather Backpack', 'Handcrafted from full-grain Italian leather with brass hardware. Fits 15" laptop with dedicated compartments. Timeless design for everyday use.', 189.99, 239.99, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop', 'Fashion', 4.9, 334, 28, true),

('Classic White Sneakers', 'Premium canvas upper with memory foam insole. Versatile design that pairs with any outfit. Durable rubber outsole for all-day comfort.', 89.99, 119.99, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop', 'Fashion', 4.6, 1567, 120, true),

('Merino Wool Crew Neck', 'Ultra-soft merino wool blend, temperature regulating, odor-resistant. The perfect base layer for any season.', 79.99, 99.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop', 'Fashion', 4.5, 892, 64, false),

('Aviator Sunglasses Polarized', 'Classic aviator design with polarized lenses, titanium frame, and UV400 protection. Includes premium leather case.', 149.99, 199.99, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop', 'Fashion', 4.7, 445, 42, false),

('Slim Fit Chino Pants', 'Stretch cotton blend, wrinkle-resistant, modern slim fit. Available in multiple colors for versatile styling.', 69.99, 89.99, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop', 'Fashion', 4.3, 678, 89, false),

-- Home & Living
('Scandinavian Floor Lamp', 'Minimalist design with natural oak base and linen shade. Warm ambient lighting perfect for reading nooks and living spaces.', 159.99, 199.99, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop', 'Home & Living', 4.8, 234, 18, true),

('Ceramic Pour-Over Coffee Set', 'Handmade ceramic dripper with matching carafe. Includes 100 filters. The perfect morning ritual for coffee enthusiasts.', 64.99, 79.99, 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&h=600&fit=crop', 'Home & Living', 4.9, 567, 35, true),

('Linen Bedding Set Queen', '100% European flax linen, stonewashed for softness. Breathable and temperature-regulating for perfect sleep year-round.', 249.99, 329.99, 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&h=600&fit=crop', 'Home & Living', 4.7, 445, 22, false),

('Aromatherapy Diffuser', 'Ultrasonic essential oil diffuser with 7 LED colors, 500ml capacity, and auto-shutoff. Creates a calming atmosphere in any room.', 49.99, 69.99, 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&h=600&fit=crop', 'Home & Living', 4.5, 1234, 67, false),

('Marble Cutting Board', 'Natural white marble with gold edge detail. Perfect for serving cheese, charcuterie, or as a decorative kitchen piece.', 54.99, 74.99, 'https://images.unsplash.com/photo-1603199506016-b7a01b324b0d?w=600&h=600&fit=crop', 'Home & Living', 4.6, 334, 45, false),

-- Sports
('Yoga Mat Premium', 'Extra-thick 6mm TPE material, non-slip texture, eco-friendly. Includes carrying strap. Perfect for all yoga styles.', 59.99, 79.99, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop', 'Sports', 4.8, 892, 55, true),

('Adjustable Dumbbell Set', 'Space-saving design, 5-52.5 lbs per dumbbell with quick-change weight system. Replaces 15 sets of weights.', 349.99, 429.99, 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=600&h=600&fit=crop', 'Sports', 4.7, 445, 12, true),

('Running Shoes Performance', 'Carbon fiber plate, responsive foam cushioning, breathable mesh upper. Engineered for marathon runners and casual joggers alike.', 159.99, 189.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop', 'Sports', 4.6, 1567, 89, false),

('Resistance Bands Set', '5 levels of resistance, includes handles, ankle straps, and door anchor. Full-body workout anywhere, anytime.', 29.99, 39.99, 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&h=600&fit=crop', 'Sports', 4.4, 2345, 150, false),

('Stainless Steel Water Bottle', 'Double-wall vacuum insulated, keeps drinks cold 24h or hot 12h. BPA-free, leak-proof, and eco-friendly.', 34.99, 44.99, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop', 'Sports', 4.5, 3456, 200, false),

-- Beauty
('Vitamin C Serum', '20% vitamin C with hyaluronic acid and vitamin E. Brightens skin, reduces dark spots, and boosts collagen production.', 42.99, 54.99, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop', 'Beauty', 4.9, 2341, 75, true),

('Jade Roller & Gua Sha Set', '100% natural jade stone, promotes lymphatic drainage, reduces puffiness. Includes storage pouch and care instructions.', 28.99, 39.99, 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=600&fit=crop', 'Beauty', 4.6, 1234, 60, false),

('Organic Face Moisturizer', 'Clean beauty formula with shea butter, aloe vera, and green tea extract. Hydrates without clogging pores.', 38.99, 48.99, 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop', 'Beauty', 4.7, 1876, 85, true),

('Professional Makeup Brush Set', '15-piece synthetic brush set with bamboo handles. Includes foundation, eyeshadow, contour, and detail brushes with travel case.', 49.99, 69.99, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop', 'Beauty', 4.5, 987, 40, false),

('Natural Deodorant Stick', 'Aluminum-free, baking soda-free formula with probiotics and charcoal. 24-hour odor protection with clean ingredients.', 14.99, 19.99, 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop', 'Beauty', 4.3, 567, 95, false),

-- Accessories
('Minimalist Wallet', 'Slim profile design, RFID blocking, holds 8 cards plus cash. Premium vegetable-tanned leather that develops patina over time.', 49.99, 64.99, 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop', 'Accessories', 4.7, 445, 38, true),

('Wireless Charging Pad', 'Fast 15W charging for all Qi-enabled devices. LED indicator, non-slip surface, and compact design for desk or nightstand.', 29.99, 39.99, 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=600&h=600&fit=crop', 'Accessories', 4.4, 1234, 80, false),

('Leather Phone Case', 'Hand-stitched genuine leather with microfiber lining. Slim fit with raised edges for screen and camera protection.', 39.99, 49.99, 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop', 'Accessories', 4.5, 2345, 120, false),

('Travel Organizer Set', '3-piece packing cubes with compression zippers. Water-resistant, durable, and perfect for keeping luggage organized.', 34.99, 44.99, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop', 'Accessories', 4.6, 876, 55, false),

('Keychain Multi-Tool', 'Stainless steel with bottle opener, screwdriver, and hex wrench. Compact everyday carry essential.', 19.99, 24.99, 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=600&h=600&fit=crop', 'Accessories', 4.2, 567, 100, false);
