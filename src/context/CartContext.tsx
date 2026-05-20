import { createContext, useContext, useState, type ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (id: number, name: string, price: number) => void;
  removeItem: (id: number) => void;
  totalItems: number;
  totalPrice: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (id: number, name: string, price: number) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, name, price, quantity: 1 }];
    });
  };

  const removeItem = (id: number) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, totalItems, totalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart precisa estar dentro de CartProvider');
  return context;
}
