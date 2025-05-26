import { Handlers } from "$fresh/server.ts";
import PostComponent from "../../components/Post.tsx";
import Post from "../../models/post.ts";
import { API_BASE_URL } from "../../utils/config.ts";
import { ApiResponseSuccess } from "../../models/api_response.ts";
import axios from "npm:axios@1.6.2";

export const handler: Handlers = {
  async GET(_req, ctx) {
    try {
      const { url } = _req;
      const searchParams = new URL(url).searchParams;
      const query = searchParams.get("query");
      if (!query || query.trim() === "") {
        return ctx.render({ posts: [], query });
      }
      const { data } = await axios.get<ApiResponseSuccess<Post[]>>(
        `${API_BASE_URL}/api/posts?query=${encodeURIComponent(query)}`,
      );
      return ctx.render({ posts: data.data, query });
    } catch (_) {
      return ctx.render({ posts: [], query: "" });
    }
  },
};

interface SearchProps {
  data: {
    posts: Post[];
    query?: string;
  };
}

export default function Search({ data }: SearchProps) {
  const { posts, query = "" } = data;
  const hasResults = posts.length > 0;
  const searchTerm = query || "";

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Buscar publicaciones</h1>
        <form action="/search" method="get" className="search-form">
          <div className="search-input-container">
            <input
              type="text"
              name="query"
              placeholder="Buscar por título o autor..."
              defaultValue={searchTerm}
              className="search-input"
              aria-label="Buscar publicaciones"
            />
            <button type="submit" className="search-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Buscar</span>
            </button>
          </div>
        </form>
      </div>

      <div className="search-results">
        {searchTerm && (
          <div className="search-info">
            <h2>
              {hasResults
                ? `Mostrando ${posts.length} resultado${
                    posts.length !== 1 ? "s" : ""
                  } para "${searchTerm}"`
                : `No se encontraron resultados para "${searchTerm}"`}
            </h2>
          </div>
        )}

        {hasResults
          ? (
            <div className="posts-list">
              {posts.map((post) => (
                <PostComponent key={post._id} post={post} isGrid={false} />
              ))}
            </div>
          )
          : searchTerm
          ? (
            <div className="no-results">
              <p>
                Intenta con otros términos de búsqueda o revisa la ortografía.
              </p>
            </div>
          )
          : (
            <div className="search-tips">
              <h3>Sugerencias de búsqueda:</h3>
              <ul>
                <li>Usa palabras clave específicas</li>
                <li>Prueba con diferentes términos</li>
                <li>Revisa la ortografía</li>
              </ul>
            </div>
          )}
      </div>
    </div>
  );
}
