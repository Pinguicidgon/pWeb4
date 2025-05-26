import { Head } from "$fresh/runtime.ts";

export default function NotFoundPage() {
  return (
    <div class="error-page">
      <Head>
        <title>Página no encontrada | 404</title>
      </Head>

      <main class="error-container">
        <div class="error-content">
          <h1 class="error-code">404</h1>
          <h2 class="error-title">Página no encontrada</h2>
          <p class="error-message">
            Lo sentimos, no pudimos encontrar la página que estás buscando.
          </p>
          
          <div class="error-actions">
            <a href="/inicio" class="error-button">
              Volver al inicio
            </a>
            <p class="error-alternative">
              O <a href="/buscar" class="error-link">buscar contenido</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
