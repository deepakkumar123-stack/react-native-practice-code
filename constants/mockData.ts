export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max - Titanium",
    brand: "Apple",
    price: 149900,
    originalPrice: 159900,
    category: "Smartphones",
    image:
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80",
  },
  {
    id: "2",
    name: "WH-1000XM5 Noise Cancelling Headphones",
    brand: "Sony",
    price: 29990,
    originalPrice: 34990,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1675243058281-970678622143?w=800&q=80",
  },
  {
    id: "3",
    name: "MacBook Air 13-inch (M3 Chip)",
    brand: "Apple",
    price: 114900,
    originalPrice: 114900, // No discount example
    category: "Laptops",
    image:
      "https://images.unsplash.com/photo-1517336714468-473588db62b5?w=800&q=80",
  },
  {
    id: "4",
    name: "Galaxy Watch 6 Classic",
    brand: "Samsung",
    price: 36999,
    originalPrice: 42999,
    category: "Wearables",
    image:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
  },
  {
    id: "5",
    name: "Mechanical Gaming Keyboard RGB",
    brand: "Keychron",
    price: 8500,
    originalPrice: 12000,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
  },
  {
    id: "6",
    name: "UltraSharp 27-inch 4K Monitor",
    brand: "Dell",
    price: 45000,
    originalPrice: 55000,
    category: "Monitors",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
  },
];
