import { ShoppingBag, MapPin, User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header style={{ 
      backgroundColor: 'var(--surface-color)', 
      boxShadow: 'var(--shadow-sm)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container flex items-center justify-between" style={{ height: '80px' }}>
        <div className="flex items-center gap-6">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ 
              backgroundColor: 'var(--primary-color)', 
              color: 'white', 
              width: '40px', 
              height: '40px', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}>
              RN
            </div>
            <h1 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--primary-dark)' }}>Raízes do Nordeste</h1>
          </Link>
          
          <button className="flex items-center gap-2" style={{ 
            backgroundColor: 'var(--bg-color)', 
            padding: '0.5rem 1rem', 
            borderRadius: 'var(--radius-full)',
            color: 'var(--text-muted)'
          }}>
            <MapPin size={18} color="var(--primary-color)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Unidade Recife - Centro</span>
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2" style={{ fontWeight: 500, color: 'var(--primary-color)' }}>
            <User size={20} />
            Entrar / Cadastrar
          </button>
          
          <Link to="/checkout" className="btn btn-primary" style={{ position: 'relative' }}>
            <ShoppingBag size={20} />
            <span style={{ marginLeft: '0.5rem' }}>Ver Pedido</span>
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: 'var(--secondary-color)',
              color: '#000',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              border: '2px solid var(--surface-color)'
            }}>
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
