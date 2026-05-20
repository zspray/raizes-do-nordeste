import { useState } from 'react';
import { CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [consent, setConsent] = useState(false);

  const handlePayment = () => {
    if (!consent) return;
    setPaymentStatus('processing');
    
    // Simula a chamada assíncrona a um serviço externo de pagamento
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <CheckCircle size={80} color="var(--success-color)" style={{ marginBottom: '1.5rem' }} />
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Pedido Confirmado!</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '500px' }}>
          Seu pagamento foi aprovado pelo provedor externo. O número do seu pedido é <strong>#RN8492</strong>.
        </p>
        <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem' }}>
          <p style={{ fontWeight: 'bold', color: 'var(--primary-dark)' }}>Você ganhou +24 pontos de fidelidade!</p>
        </div>
        <Link to="/" className="btn btn-primary">Voltar ao Cardápio</Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in">
      <Link to="/" className="flex items-center gap-2" style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontWeight: 500, display: 'inline-flex' }}>
        <ArrowLeft size={20} /> Voltar
      </Link>
      
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Finalizar Pedido</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Resumo do Pedido */}
        <div style={{ backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Seu Pedido</h3>
          
          <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
            <div>
              <p style={{ fontWeight: 600 }}>1x Cuscuz Completo</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sem cebola</p>
            </div>
            <p style={{ fontWeight: 600 }}>R$ 24,90</p>
          </div>
          
          <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
            <div>
              <p style={{ fontWeight: 600 }}>1x Suco de Cajá</p>
            </div>
            <p style={{ fontWeight: 600 }}>R$ 8,00</p>
          </div>
          
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
              <p>Subtotal</p>
              <p>R$ 32,90</p>
            </div>
            <div className="flex items-center justify-between" style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
              <p>Taxa de Serviço (Opcional)</p>
              <p>R$ 3,29</p>
            </div>
            <div className="flex items-center justify-between" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>
              <p>Total</p>
              <p>R$ 36,19</p>
            </div>
          </div>
        </div>

        {/* Pagamento e LGPD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Pagamento</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              O processamento do pagamento é realizado de forma segura por um provedor externo. Nós não armazenamos os dados do seu cartão.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ flex: 1, border: '2px solid var(--primary-color)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--primary-color)', fontWeight: 'bold', backgroundColor: 'rgba(230, 81, 0, 0.05)' }}>
                <CreditCard size={24} /> Cartão
              </div>
              <div style={{ flex: 1, border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 'bold', cursor: 'pointer' }}>
                PIX
              </div>
            </div>

            <div style={{ backgroundColor: '#F8F9FA', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', fontSize: '0.9rem' }}>
              <label style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{ marginTop: '0.2rem', transform: 'scale(1.2)' }} 
                />
                <span style={{ color: 'var(--text-main)', lineHeight: 1.4 }}>
                  <strong>Consentimento LGPD:</strong> Aceito os <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Termos de Uso</a> e concordo com a <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Política de Privacidade</a>. Autorizo o uso dos meus dados para o processamento deste pedido e programa de fidelidade.
                </span>
              </label>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', opacity: (!consent || paymentStatus === 'processing') ? 0.6 : 1, cursor: (!consent || paymentStatus === 'processing') ? 'not-allowed' : 'pointer' }}
              onClick={handlePayment}
              disabled={!consent || paymentStatus === 'processing'}
            >
              {paymentStatus === 'processing' ? 'Processando no provedor externo...' : 'Pagar R$ 36,19'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
