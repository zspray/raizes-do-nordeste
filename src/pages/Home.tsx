import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BASE = import.meta.env.BASE_URL;

const MOCK_CATEGORIES = ['Populares', 'Tapiocas', 'Cuscuz', 'Bebidas'];

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Cuscuz Completo',
    description: 'Cuscuz de milho no vapor, recheado com carne de sol desfiada, queijo coalho e manteiga da terra.',
    price: 24.90,
    category: 'Cuscuz',
    image: `${BASE}images/cuscuz.png`,
    popular: true
  },
  {
    id: 2,
    name: 'Tapioca de Charque',
    description: 'Massa fina e crocante com recheio generoso de charque refogada e nata.',
    price: 18.50,
    category: 'Tapiocas',
    image: `${BASE}images/tapioca_charque.png`,
    popular: true
  },
  {
    id: 3,
    name: 'Suco de Cajá',
    description: 'Polpa natural de cajá, batida com gelo. Refrescante e bem docinho.',
    price: 8.00,
    category: 'Bebidas',
    image: `${BASE}images/suco_caja.png`,
    popular: false
  },
  {
    id: 4,
    name: 'Tapioca Cartola',
    description: 'Queijo coalho assado, banana frita, açúcar e canela. A sobremesa perfeita.',
    price: 16.90,
    category: 'Tapiocas',
    image: `${BASE}images/tapioca_cartola.png`,
    popular: false
  },
  {
    id: 5,
    name: 'Café Coado',
    description: 'Café passado na hora, estilo nordestino. Servido quente.',
    price: 5.50,
    category: 'Bebidas',
    image: `${BASE}images/cafe_coado.png`,
    popular: true
  },
  {
    id: 6,
    name: 'Bolo de Macaxeira',
    description: 'Bolo caseiro de macaxeira com coco ralado. Receita de família.',
    price: 12.00,
    category: 'Populares',
    image: `${BASE}images/bolo_macaxeira.png`,
    popular: true
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Populares');
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const { addItem } = useCart();

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    if (activeCategory === 'Populares') return product.popular;
    return product.category === activeCategory;
  });

  const handleAdd = (product: typeof MOCK_PRODUCTS[0]) => {
    addItem(product.id, product.name, product.price);
    setAddedIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== product.id));
    }, 800);
  };

  return (
    <div className="animate-fade-in">

      <section style={{ 
        background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))', 
        color: 'white', 
        padding: '2.5rem 0',
        marginBottom: '2rem',
        borderRadius: '0 0 var(--radius-lg) var(--radius-lg)'
      }}>
        <div className="container">
          <p style={{ fontSize: '1rem', opacity: 0.85, marginBottom: '0.25rem' }}>Programa de Fidelidade</p>
          <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '0.5rem' }}>Você tem <span style={{ color: 'var(--secondary-color)' }}>150 pontos</span></h2>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
            A cada R$ 1,00 em compras você acumula 1 ponto. Troque por descontos!
          </p>
        </div>
      </section>

      <div className="container">
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Cardápio</h2>
        

        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
          {MOCK_CATEGORIES.map(category => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.9rem',
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


        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
          gap: '1.5rem',
          paddingBottom: '2rem'
        }}>
          {filteredProducts.map(product => {
            const justAdded = addedIds.includes(product.id);
            return (
              <div key={product.id} style={{
                backgroundColor: 'var(--surface-color)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              >
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{product.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', minHeight: '36px', overflow: 'hidden' }}>
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <button 
                      className="btn-icon" 
                      onClick={() => handleAdd(product)}
                      style={{ 
                        backgroundColor: justAdded ? 'var(--success-color)' : 'var(--primary-color)', 
                        color: 'white',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      {justAdded ? <Check size={20} /> : <Plus size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
