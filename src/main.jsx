import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowRight, ArrowUpRight, Heart, Menu, X, Instagram, Leaf, Sparkles } from 'lucide-react';
import './style.css';

function Flower({ className = '' }) {
  return <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true"><g fill="currentColor">{[0,72,144,216,288].map(a => <path key={a} d="M50 48C38 40 37 25 43 18C46 14 49 16 50 19C51 16 54 14 57 18C63 25 62 40 50 48Z" transform={`rotate(${a} 50 50)`}/>)}</g><circle cx="50" cy="50" r="4" fill="#f5eee5" /></svg>;
}

function Petals() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    let cleanup = () => {};
    let cancelled = false;
    import('./petals.js').then(({ startPetals }) => { if (!cancelled) cleanup = startPetals(document.getElementById('petals')); }).catch(() => {});
    return () => { cancelled = true; cleanup(); };
  }, []);
  return <div id="petals" className="petals" aria-hidden="true" />;
}

const services = [
  { n: '01', title: 'Psicoterapia individual', text: 'Um espaço de escuta para se conhecer, acolher suas emoções e encontrar novos caminhos.', icon: Heart },
  { n: '02', title: 'Ansiedade e emoções', text: 'Cuidado e ferramentas para compreender os sentimentos e atravessar os desafios do cotidiano.', icon: Sparkles },
  { n: '03', title: 'Autoconhecimento', text: 'Uma pausa para olhar para dentro, reconhecer sua história e florescer no seu próprio tempo.', icon: Leaf },
];

function App() {
  const [intro, setIntro] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [menu, setMenu] = useState(false);
  useEffect(() => { if (!intro) return; const t = setTimeout(() => setIntro(false), 3900); return () => clearTimeout(t); }, [intro]);
  return <>
    {intro && <div className="intro" aria-hidden="true"><div className="intro-brand"><div className="intro-flower-wrap"><svg className="intro-flower" viewBox="0 0 100 100" fill="none">{[0,72,144,216,288].map((angle, index) => <path key={angle} className="intro-flower-petal" style={{ '--angle': angle + 'deg', '--delay': index * 0.09 + 's', '--wind-x': 130 + index * 30 + 'px', '--wind-y': -60 + index * 29 + 'px', '--turn': 100 + index * 55 + 'deg' }} d="M50 48C38 40 37 25 43 18C46 14 49 16 50 19C51 16 54 14 57 18C63 25 62 40 50 48Z" />)}<circle className="intro-flower-center" cx="50" cy="50" r="4" /></svg><div className="intro-drift">{Array.from({ length: 15 }, (_, i) => <span className="intro-drift-petal" key={i} style={{ '--delay': 1.42 + i * 0.065 + 's', '--x': 110 + (i % 5) * 37 + 'px', '--y': -85 + (i % 7) * 31 + 'px', '--rotation': 150 + i * 43 + 'deg', '--size': 5 + i % 4 * 2 + 'px' }} />)}</div></div><div className="intro-wordmark"><span>INSTITUTO</span><strong>flor de cerejeira</strong><small>PSICOLOGIA & ACOLHIMENTO</small></div></div></div>}
    <Petals />
    <header className="header"><a className="brand" href="#inicio" aria-label="Instituto Flor de Cerejeira, início"><Flower className="brand-flower"/><span><small>INSTITUTO</small><strong>flor de cerejeira</strong></span></a>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={menu ? 'Fechar menu' : 'Abrir menu'}>{menu ? <X/> : <Menu/>}</button>
      <nav className={menu ? 'nav open' : 'nav'} aria-label="Navegação principal"><a onClick={() => setMenu(false)} href="#sobre">O instituto</a><a onClick={() => setMenu(false)} href="#cuidado">Como cuidamos</a><a onClick={() => setMenu(false)} href="#profissional">A profissional</a><a onClick={() => setMenu(false)} href="#espaco">Nosso espaço</a><a className="nav-cta" onClick={() => setMenu(false)} href="#contato">Vamos conversar <ArrowUpRight size={15}/></a></nav>
    </header>
    <main>
      <section className="hero" id="inicio"><div className="hero-copy"><div className="eyebrow"><span className="line"/> UM ESPAÇO PARA SER VOCÊ</div><h1>Todo florescer<br/>começa <em>com cuidado.</em></h1><p>Um lugar de acolhimento, escuta e cuidado para você se reconectar com a sua própria essência.</p><div className="hero-actions"><a className="button dark" href="#contato">Comece por você <ArrowUpRight size={17}/></a><a className="text-link" href="#sobre">Conheça o instituto <ArrowDown size={16}/></a></div><div className="hero-note"><span className="note-icon"><Flower/></span><span>Respeitando seu tempo,<br/><strong>acolhendo sua história.</strong></span></div></div><div className="hero-visual"><div className="hero-image" role="img" aria-label="Espaço de atendimento acolhedor com flores de cerejeira"/><div className="hero-stamp"><Flower/><span>O CUIDADO<br/>FAZ FLORESCER</span></div><div className="photo-caption"><span>UM RESPIRO PARA A ALMA</span><span>✳</span></div></div><div className="hero-index">01 / 04 <span/> DESCUBRA MAIS</div></section>
      <div className="ticker" aria-hidden="true"><span>acolher</span><Flower/><span>sentir</span><Flower/><span>florescer</span><Flower/><span>acolher</span><Flower/><span>sentir</span><Flower/><span>florescer</span><Flower/></div>
      <section className="about section" id="sobre"><div className="section-label"><span>01 / NOSSA ESSÊNCIA</span><Flower/></div><div className="about-content"><p className="overline">UM CONVITE PARA OLHAR PARA DENTRO</p><h2>A vida acontece em ciclos.<br/><em>Você não precisa atravessá-los só.</em></h2><div className="about-bottom"><p>Assim como a flor de cerejeira, cada pessoa tem seu tempo e sua maneira única de florescer. Acreditamos que o cuidado começa quando encontramos um espaço seguro para simplesmente ser.</p><div className="handwritten">com carinho,<br/><span>Flor de Cerejeira</span></div></div></div></section>
      <section className="care section" id="cuidado"><div className="section-label"><span>02 / COMO CUIDAMOS</span><Flower/></div><div className="section-heading"><div><p className="overline">CUIDADO EM CADA DETALHE</p><h2>Um encontro com <em>você.</em></h2></div><p>Porque cuidar da mente também é cultivar uma vida com mais presença, leveza e significado.</p></div><div className="service-grid">{services.map(({n,title,text,icon: Icon}) => <article className="service-card" key={n}><div className="card-top"><span>{n} / CUIDADO</span><Icon size={22} strokeWidth={1.25}/></div><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight className="card-arrow" size={19}/></article>)}</div><p className="care-footnote">✳ &nbsp; Cada jornada é única. O cuidado também deve ser.</p></section>
      <section className="professional section" id="profissional"><div className="section-label"><span>03 / QUEM ACOLHE</span><Flower/></div><div className="professional-grid"><div className="portrait-wrap"><img src="./professional.webp" alt="Retrato ilustrativo de uma profissional de psicologia" loading="lazy"/><div className="portrait-label">OLHAR ATENTO.<br/><em>escuta gentil.</em></div></div><div className="professional-copy"><p className="overline">MUITO PRAZER</p><h2>Uma escuta que<br/><em>abraça sua história.</em></h2><p>Por trás de cada encontro, existe o desejo genuíno de oferecer um espaço onde você possa se sentir à vontade para ser quem é.</p><p>Com sensibilidade e respeito à singularidade de cada pessoa, nossa abordagem convida você a explorar seus sentimentos, descobrir possibilidades e caminhar com mais leveza.</p><div className="signature">Com afeto, <span>equipe Flor de Cerejeira</span></div><div className="demo-note">PROFISSIONAL E INSTITUTO FICTÍCIOS · PROJETO DE PORTFÓLIO</div></div></div></section>
      <section className="space" id="espaco"><div className="space-image" role="img" aria-label="Ambiente ilustrativo de uma clínica acolhedora"/><div className="space-card"><p className="overline">04 / NOSSO ESPAÇO</p><h2>Um lugar para<br/><em>respirar fundo.</em></h2><p>Um ambiente pensado para que você se sinta acolhido desde o primeiro instante. Entre, fique à vontade e permita-se uma pausa.</p><a href="#contato" className="text-link">Conheça nossa proposta <ArrowUpRight size={16}/></a></div><span className="space-caption">UM ESPAÇO DE ACOLHIMENTO · IMAGEM ILUSTRATIVA</span></section>
      <section className="contact section" id="contato"><Flower className="contact-flower"/><p className="overline">UM PASSO DE CADA VEZ</p><h2>O seu tempo de florescer<br/><em>começa aqui.</em></h2><p>Quando sentir que é o momento, lembre-se: você merece um espaço de cuidado.</p><a href="#inicio" className="button dark">Voltar ao início <ArrowUpRight size={17}/></a><small>Este é um projeto fictício de portfólio. Não realizamos agendamentos.</small></section>
    </main>
    <footer><a className="brand footer-brand" href="#inicio"><Flower className="brand-flower"/><span><small>INSTITUTO</small><strong>flor de cerejeira</strong></span></a><p>Um espaço de cuidado para<br/>florescer no seu próprio tempo.</p><div className="footer-end"><span>PROJETO FICTÍCIO · PORTFÓLIO</span><a href="#inicio">VOLTAR AO TOPO ↑</a></div></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);


