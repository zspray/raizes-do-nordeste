import { useState } from 'react';
import { CreditCard, CheckCircle, ArrowLeft, Trash2, Plus, Minus, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, totalPrice, totalItems, addItem, removeItem, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [consent, setConsent] = useState(false);

  // Gera um número de pedido aleatório
  const orderNumber = `RN${Math.floor(1000 + Math.random() * 9000)}`;
  const earnedPoints = Math.floor(totalPrice);

  const handlePayment = () => {
    if (!consent || items.length === 0) return;
    setPaymentStatus('processing');
    
    // Simula chamada ao provedor externo de pagamento
    setTimeout(() => {
      setPaymentStatus('success');
      clearCart();
    }, 2500);
  };

  // Tela de sucesso
  if (paymentStatus === 'success') {
    return (
      <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <CheckCircle size={72} color="var(--success-color)" style={{ marginBottom: '1.5rem' }} />
        <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Pedido Confirmado!</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem', maxWidth: '420px' }}>
          Pagamento aprovado pelo provedor externo. Retire seu pedido com o código:
        </p>
        <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.25rem 2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', marginBottom: '1rem' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-dark)', letterSpacing: '2px' }}>#{orderNumber}</p>
        </div>
        <div style={{ backgroundColor: '#FFF8E1', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
          <p style={{ fontWeight: 600, color: '#F57F17' }}>+{earnedPoints} pontos de fidelidade adicionados!</p>
        </div>
        <Link to="/" className="btn btn-primary">Voltar ao Cardápio</Link>
      </div>
    );
  }

  // Carrinho vazio
  if (items.length === 0 && paymentStatus === 'idle') {
    return (
      <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Seu carrinho está vazio</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Adicione itens do cardápio para fazer seu pedido.</p>
        <Link to="/" className="btn btn-primary">Ver Cardápio</Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in">
      <Link to="/" className="flex items-center gap-2" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 500, display: 'inline-flex' }}>
        <ArrowLeft size={18} /> Voltar ao cardápio
      </Link>
      
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Finalizar Pedido</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Resumo do Pedido */}
        <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            Seu Pedido ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
          </h3>
          
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between" style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.name}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  R$ {item.price.toFixed(2).replace('.', ',')} cada
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => removeItem(item.id)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                </button>
                <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                <button onClick={() => addItem(item.id, item.name, item.price)} style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Plus size={14} />
                </button>
              </div>
              <p style={{ fontWeight: 600, minWidth: '70px', textAlign: 'right' }}>
                R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
              </p>
            </div>
          ))}
          
          <div style={{ paddingTop: '0.75rem' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <p>Subtotal</p>
              <p>R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
            </div>
            <div className="flex items-center justify-between" style={{ fontSize: '1.35rem', fontWeight: 'bold', color: 'var(--primary-dark)', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
              <p>Total</p>
              <p>R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
            </div>
          </div>
        </div>

        {/* Pagamento + LGPD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Pagamento</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              O pagamento é processado por um provedor externo. Nenhum dado de cartão é armazenado por nós.
            </p>
            
            {/* Seletor de método */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button 
                onClick={() => setPaymentMethod('card')}
                style={{ 
                  flex: 1, 
                  border: paymentMethod === 'card' ? '2px solid var(--primary-color)' : '1px solid var(--border-color)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '0.85rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem', 
                  color: paymentMethod === 'card' ? 'var(--primary-color)' : 'var(--text-muted)', 
                  fontWeight: 'bold',
                  backgroundColor: paymentMethod === 'card' ? 'rgba(230, 81, 0, 0.05)' : 'transparent',
                  transition: 'all var(--transition-fast)',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '0.95rem'
                }}
              >
                <CreditCard size={20} /> Cartão
              </button>
              <button 
                onClick={() => setPaymentMethod('pix')}
                style={{ 
                  flex: 1, 
                  border: paymentMethod === 'pix' ? '2px solid var(--primary-color)' : '1px solid var(--border-color)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '0.85rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem', 
                  color: paymentMethod === 'pix' ? 'var(--primary-color)' : 'var(--text-muted)', 
                  fontWeight: 'bold',
                  backgroundColor: paymentMethod === 'pix' ? 'rgba(230, 81, 0, 0.05)' : 'transparent',
                  transition: 'all var(--transition-fast)',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '0.95rem'
                }}
              >
                <QrCode size={20} /> PIX
              </button>
            </div>

            {/* Consentimento LGPD */}
            <div style={{ backgroundColor: '#F8F9FA', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{ marginTop: '0.2rem', transform: 'scale(1.2)', accentColor: 'var(--primary-color)' }} 
                />
                <span style={{ color: 'var(--text-main)', lineHeight: 1.5 }}>
                  <strong>Consentimento LGPD:</strong> Li e aceito os{' '}
                  <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Termos de Uso</a>{' '}
                  e a{' '}
                  <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Política de Privacidade</a>. 
                  Autorizo o uso dos meus dados para processar este pedido e para o programa de fidelidade.
                </span>
              </label>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ 
                width: '100%', 
                padding: '0.9rem', 
                fontSize: '1rem', 
                opacity: (!consent || paymentStatus === 'processing') ? 0.5 : 1, 
                cursor: (!consent || paymentStatus === 'processing') ? 'not-allowed' : 'pointer' 
              }}
              onClick={handlePayment}
              disabled={!consent || paymentStatus === 'processing'}
            >
              {paymentStatus === 'processing' 
                ? 'Processando no provedor externo...' 
                : `Pagar R$ ${totalPrice.toFixed(2).replace('.', ',')}`
              }
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
