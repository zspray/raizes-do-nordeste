import { useState } from 'react';
import { Plus } from 'lucide-react';

const MOCK_CATEGORIES = ['Populares', 'Tapiocas', 'Cuscuz', 'Bebidas'];

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Cuscuz Completo',
    description: 'Cuscuz de milho no vapor, recheado com carne de sol desfiada, queijo coalho e manteiga da terra.',
    price: 24.90,
    category: 'Cuscuz',
    image: 'https://images.unsplash.com/photo-1596450514735-11516e873eb3?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 2,
    name: 'Tapioca de Charque',
    description: 'Massa fina e crocante com recheio generoso de charque refogada e nata.',
    price: 18.50,
    category: 'Tapiocas',
    image: 'https://images.unsplash.com/photo-1627998980838-8e65842c67c5?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 3,
    name: 'Suco de Cajá',
    description: 'Polpa natural de cajá, batida com gelo. Refrescante e docinho.',
    price: 8.00,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    popular: false
  },
  {
    id: 4,
    name: 'Tapioca Cartola',
    description: 'Queijo coalho assado, banana frita, açúcar e canela. A sobremesa perfeita.',
    price: 16.90,
    category: 'Tapiocas',
    image: 'https://images.unsplash.com/photo-1627998980838-8e65842c67c5?auto=format&fit=crop&w=800&q=80',
    popular: false
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Populares');

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    if (activeCategory === 'Populares') return product.popular;
    return product.category === activeCategory;
  });

  return (
    <div className="animate-fade-in">
      <section style={{ 
        backgroundColor: 'var(--primary-color)', 
        color: 'white', 
        padding: '3rem 0',
        marginBottom: '2rem',
        borderRadius: '0 0 var(--radius-lg) var(--radius-lg)'
      }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Bem-vindo, João!</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Você tem <span style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>150 pontos</span> no programa de fidelidade.
          </p>
        </div>
      </section>

      <div className="container">
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Cardápio Digital</h2>
        
        {/* Categorias */}
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
          {MOCK_CATEGORIES.map(category => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)',
                backgroundColor: activeCategory === category ? 'var(--primary-color)' : 'var(--surface-color)',
                color: activeCategory === category ? 'white' : 'var(--text-main)',
                boxShadow: activeCategory === category ? 'var(--shadow-sm)' : 'none',
                border: activeCategory === category ? 'none' : '1px solid var(--border-color)'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Lista de Produtos */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{
              backgroundColor: 'var(--surface-color)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform var(--transition-normal)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', height: '40px', overflow: 'hidden' }}>
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  <button className="btn-icon" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
