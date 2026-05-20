import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'var(--text-main)', 
      color: 'var(--text-inverse)',
      padding: '3rem 0 1rem 0',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Raízes do Nordeste</h3>
            <p style={{ color: '#aaa', fontSize: '0.9rem', maxWidth: '300px' }}>
              Tradição e tecnologia se encontram para levar o melhor da culinária nordestina até você, com rapidez e qualidade.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem', fontFamily: 'Outfit' }}>Links Rápidos</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#aaa', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#" style={{ color: 'inherit' }}>Cardápio</a></li>
              <li><a href="#" style={{ color: 'inherit' }}>Unidades</a></li>
              <li><a href="#" style={{ color: 'inherit' }}>Programa de Fidelidade</a></li>
              <li><a href="#" style={{ color: 'inherit' }}>Fale Conosco</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', fontFamily: 'Outfit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} color="var(--primary-color)" /> Privacidade e LGPD
            </h4>
            <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Levamos sua privacidade a sério. Seus dados são utilizados apenas para o programa de fidelização e processamento de pedidos, mediante seu consentimento expresso.
            </p>
            <button style={{ 
              background: 'transparent', 
              border: '1px solid #aaa', 
              color: '#aaa', 
              padding: '0.5rem 1rem', 
              borderRadius: '4px',
              fontSize: '0.8rem'
            }}>
              Gerenciar Preferências de Cookies
            </button>
          </div>
        </div>
        
        <div style={{ 
          borderTop: '1px solid #444', 
          paddingTop: '1.5rem', 
          textAlign: 'center', 
          color: '#888', 
          fontSize: '0.8rem' 
        }}>
          &copy; {new Date().getFullYear()} Rede Raízes do Nordeste. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
