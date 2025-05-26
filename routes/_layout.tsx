import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { OWNER } from "../utils/config.ts";

export default function Layout({ Component }: PageProps) {
  return (
    <>
      <Head>
        <title>El Blog de {OWNER}</title>
        <meta
          name="description"
          content="Un blog moderno sobre tecnología y desarrollo"
        />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <header className="header">
        <div className="container">
          <div className="logo">
            {/* 🔧 CORREGIDO: antes tenía href="#" y no redirigía */}
            <a href="/">El Blog de {OWNER}</a>
          </div>
          <nav className="nav">
            {/* 🔧 CORREGIDO: href="#" → href="/" para navegación real */}
            <a href="/" className="nav-link">Inicio</a>
            {/* 🔧 CORREGIDO: href="#" → href="/search" */}
            <a href="/search" className="nav-link">Buscar</a>
            {/* 🔧 CORREGIDO: href="#" → href="/create" */}
            <a href="/create" className="nav-link">Crear</a>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Component />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Sobre el Blog</h3>
              <p>
                Un espacio para compartir conocimientos sobre tecnología,
                programación y desarrollo web.
              </p>
            </div>
            <div className="footer-section">
              <h3>Enlaces Rápidos</h3>
              <ul>
                {/* 🔧 CORREGIDO: enlaces del footer ahora apuntan a rutas reales */}
                <li>
                  <a href="/">Inicio</a>
                </li>
                <li>
                  <a href="/search">Buscar</a>
                </li>
                <li>
                  <a href="/create">Crear</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} El Blog de {OWNER}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
