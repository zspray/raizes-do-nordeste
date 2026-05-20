import { ShoppingBag, MapPin, User, ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ 
      backgroundColor: 'var(--surface-color)', 
      boxShadow: 'var(--shadow-sm)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container flex items-center justify-between" style={{ height: '70px' }}>

        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            backgroundColor: 'var(--primary-color)', 
            color: 'white', 
            width: '36px', 
            height: '36px', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1rem',
            flexShrink: 0
          }}>
            RN
          </div>
          <h1 className="navbar-brand" style={{ fontSize: '1.3rem', margin: 0, color: 'var(--primary-dark)' }}>Raízes do Nordeste</h1>
        </Link>


        <div className="navbar-desktop">
          <button className="flex items-center gap-2" style={{ 
            backgroundColor: 'var(--bg-color)', 
            padding: '0.5rem 1rem', 
            borderRadius: 'var(--radius-full)',
            color: 'var(--text-muted)'
          }}>
            <MapPin size={16} color="var(--primary-color)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Recife - Centro</span>
            <ChevronDown size={14} />
          </button>

          <button className="flex items-center gap-2" style={{ fontWeight: 500, color: 'var(--primary-color)', fontSize: '0.9rem' }}>
            <User size={18} />
            Entrar
          </button>
          
          <Link to="/checkout" className="btn btn-primary" style={{ position: 'relative', padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
            <ShoppingBag size={18} />
            <span>Pedido</span>
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                backgroundColor: 'var(--secondary-color)',
                color: '#000',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                border: '2px solid var(--surface-color)'
              }}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>


        <div className="navbar-mobile">
          <Link to="/checkout" style={{ position: 'relative', color: 'var(--primary-color)' }}>
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-10px',
                backgroundColor: 'var(--secondary-color)',
                color: '#000',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                fontWeight: 'bold'
              }}>
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ color: 'var(--text-main)' }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>


      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <button className="flex items-center gap-2" style={{ padding: '1rem 1.5rem', width: '100%', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            <MapPin size={16} color="var(--primary-color)" />
            Recife - Centro
            <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2" style={{ padding: '1rem 1.5rem', width: '100%', fontWeight: 500, color: 'var(--primary-color)', fontSize: '0.95rem' }}>
            <User size={18} />
            Entrar / Cadastrar
          </button>
        </div>
      )}
    </header>
  );
}
