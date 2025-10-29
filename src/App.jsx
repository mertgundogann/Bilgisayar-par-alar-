import React, { useState, useEffect } from 'react';
import './index.css';
import { FaMicrochip, FaMemory, FaHdd, FaVideo, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowUp } from 'react-icons/fa';

const PRODUCTS = [
  { id: 1, title: 'Intel i9 13900K', excerpt: 'Yüksek performanslı CPU.', details: '12 çekirdek 24 thread, 5.8GHz Turbo, DDR5 uyumlu.', icon: <FaMicrochip />, badge: 'Yeni', price: '$699', stock: 'Stokta' },
  { id: 2, title: 'AMD Ryzen 9 7950X', excerpt: 'Üst düzey işlemci.', details: '16 çekirdek 32 thread, 5.7GHz Turbo, AM5 soket.', icon: <FaMicrochip />, price: '$649', stock: 'Stokta' },
  { id: 3, title: 'NVIDIA RTX 4090', excerpt: 'En güçlü GPU.', details: '24GB GDDR6X, ray tracing, DLSS 3 destekli.', icon: <FaVideo />, badge: 'Popüler', price: '$1999', stock: 'Stokta' },
  { id: 4, title: 'Corsair Vengeance DDR5', excerpt: 'Hızlı ve güvenilir RAM.', details: '32GB, 6000MHz, RGB destekli.', icon: <FaMemory />, price: '$199', stock: 'Stokta' },
  { id: 5, title: 'Samsung 980 Pro SSD', excerpt: 'Hızlı NVMe depolama.', details: '1TB, PCIe 4.0, 7000MB/s okuma.', icon: <FaHdd />, price: '$149', stock: 'Stokta' }
];

const BLOGS = [
  { id: 1, title: 'CPU Seçerken Nelere Dikkat Etmeli?', excerpt: 'İşlemci seçiminde performans ve uyumluluk konuları.', details: 'İşlemci türleri, çekirdek sayısı ve soket uyumluluğu hakkında bilgiler...', date: '2025-10-29', category: 'Donanım', thumbnail: 'https://images.unsplash.com/photo-1581093588401-49a1f8b06b3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 2, title: 'En İyi GPU’lar 2025', excerpt: 'Grafik kartı karşılaştırmaları.', details: 'NVIDIA ve AMD kartlarının özellikleri ve performans karşılaştırmaları...', date: '2025-10-25', category: 'Grafik', thumbnail: 'https://images.unsplash.com/photo-1612832020094-73d1f292f9c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' }
];

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [reports, setReports] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('reports') || '[]');
    if (saved.length > 0) return saved;

    return [
      { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', message: 'CPU seçiminde yardımcı oldunuz, teşekkürler!', date: new Date().toISOString() },
      { id: 2, name: 'Elif Demir', email: 'elif@example.com', message: 'Blog yazılarınız çok faydalı.', date: new Date().toISOString() },
      { id: 3, name: 'Murat Kaya', email: 'murat@example.com', message: 'SSD önerileriniz çok işe yaradı.', date: new Date().toISOString() }
    ];
  });
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    localStorage.setItem('reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function submitReport(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
      id: Date.now(),
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      date: new Date().toISOString()
    };
    setReports(prev => [data, ...prev]);
    form.reset();
    alert('Mesajınız gönderildi!');
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div>
      {/* Header */}
      <header>
        <div className="nav-main">
          <div className="logo-container">
            <img src="https://i.ibb.co/xKHGDPRf/1000-F-450536430-1-Cy-Mo1g-T4s-Av5-Egc-KZz4h-Rt5-MNst8lzb-removebg-preview.png" alt="Logo" className="site-logo" />
            <h1>Bilgisayar Parçaları Portalı</h1>
          </div>
          <div className="contact-info">
            <span>📞 0555 555 55 55</span>
            <span>✉️ merttgundogan@hotmail.com</span>
          </div>
          <nav>
            <a href="#hero">Anasayfa</a>
            <a href="#products">Ürünler</a>
            <a href="#blog">Blog</a>
            <a href="#contact">İletişim</a>
          </nav>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="hero page-fade">
        <h2 className="hero-title">En Güncel Bilgisayar Parçaları ve Rehberleri</h2>
        <p className="hero-subtitle">CPU, GPU, RAM, SSD ve daha fazlasını keşfedin.</p>
        <button className="cta-button" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>Ürünleri Keşfet</button>
      </section>

      <main className="page-fade">
        {/* Popüler Ürünler Slider */}
        <section id="popular-slider">
          <h2>En Popüler Ürünler</h2>
          <div className="slider">
            <button className="prev" onClick={() => setCurrentSlide(prev => (prev === 0 ? PRODUCTS.length - 1 : prev - 1))}>‹</button>
            <div className="slide">
              <div className="card">
                <div className="icon">{PRODUCTS[currentSlide].icon}</div>
                <h3>{PRODUCTS[currentSlide].title}</h3>
                <p>{PRODUCTS[currentSlide].excerpt}</p>
                <p><strong>{PRODUCTS[currentSlide].price}</strong> | {PRODUCTS[currentSlide].stock}</p>
                <button onClick={() => setSelectedProduct(PRODUCTS[currentSlide])}>Detay</button>
              </div>
            </div>
            <button className="next" onClick={() => setCurrentSlide(prev => (prev === PRODUCTS.length - 1 ? 0 : prev + 1))}>›</button>
          </div>
        </section>

        {/* Ürünler */}
        <section id="products">
          <h2>Popüler Parçalar</h2>
          <div className="grid">
            {PRODUCTS.map(p => (
              <div key={p.id} className="card">
                {p.badge && <div className="badge">{p.badge}</div>}
                <div className="icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <p><strong>{p.price}</strong> | {p.stock}</p>
                <button onClick={() => setSelectedProduct(p)}>Detay</button>
              </div>
            ))}
          </div>
        </section>

        {/* Blog */}
        <section id="blog">
          <h2>Blog Yazıları</h2>
          <div className="grid">
            {BLOGS.map(b => (
              <div key={b.id} className="card blog-card">
                <img src={b.thumbnail} alt={b.title} className="blog-thumb" />
                <h3>{b.title}</h3>
                <p>{b.excerpt}</p>
                <small>{b.date} | {b.category}</small>
                <button onClick={() => setSelectedBlog(b)}>Detay</button>
              </div>
            ))}
          </div>
        </section>

        {/* Video Rehberler */}
        <section id="video-guides">
          <h2>Video Rehberler</h2>
          <div className="video-grid">
            <iframe src="https://www.youtube.com/embed/VIDEO_ID_1" title="Video 1" frameBorder="0" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/VIDEO_ID_2" title="Video 2" frameBorder="0" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/VIDEO_ID_3" title="Video 3" frameBorder="0" allowFullScreen></iframe>
          </div>
        </section>

        {/* İletişim */}
        <section id="contact">
          <h2>İletişim Formu</h2>
          <form onSubmit={submitReport} className="contact-form">
            <input name="name" type="text" placeholder="Adınız" required />
            <input name="email" type="email" placeholder="E-posta" required />
            <textarea name="message" rows={5} placeholder="Mesajınız" required />
            <button type="submit">Gönder</button>
          </form>

          {/* Kullanıcı Yorumları */}
          <div className="reports">
            <h3>Kullanıcı Yorumları</h3>
            <div className="review-grid">
              {reports.length === 0 ? <p>Henüz mesaj yok.</p> : reports.map(r => (
                <div key={r.id} className="review-card">
                  <p>"{r.message}"</p>
                  <small>- {r.name}</small>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{selectedProduct.title}</h3>
            <p>{selectedProduct.details}</p>
            <button onClick={() => setSelectedProduct(null)}>Kapat</button>
          </div>
        </div>
      )}

      {selectedBlog && (
        <div className="modal-backdrop" onClick={() => setSelectedBlog(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{selectedBlog.title}</h3>
            <p>{selectedBlog.details}</p>
            <button onClick={() => setSelectedBlog(null)}>Kapat</button>
          </div>
        </div>
      )}

      {showTopBtn && <button className="scroll-top" onClick={scrollToTop}><FaArrowUp /></button>}

      {/* Footer */}
      <footer className="footer page-fade">
        <div className="footer-top">
          <div>
            <h4>Bilgisayar Parçaları Portalı</h4>
            <p>En güncel donanım rehberleri ve ürün incelemeleri.</p>
          </div>
          <div>
            <h4>İletişim</h4>
            <p>📞 0538 982 22 75</p>
            <p>✉️ merttgundogan@hotmail.com</p>
          </div>
          <div className="social-media">
            <h4>Bizi Takip Edin</h4>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Bilgisayar Parçaları Portalı | Tüm hakları saklıdır.
        </div>
      </footer>
      {/* WhatsApp Butonu */}
<a 
  href="https://wa.me/905389822275" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="whatsapp-btn"
>
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
    alt="WhatsApp" 
    className="whatsapp-logo"
  />
</a>


    </div>
  );
}
