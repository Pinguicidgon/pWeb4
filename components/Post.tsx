import type Post from "../models/post.ts";
import { JSX } from "preact";

interface PostProps {
  post: Post;
  isGrid?: boolean;
}

function formatDate(date: Date | string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("es-ES", options);
}

export default function PostComponent({ post, isGrid = false }: PostProps) {
  const handleImageError = (e: JSX.TargetedEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='100%' height='100%' fill='%23e5e7eb'/%3E%3C/svg%3E";
  };

  if (isGrid) {
    return (
      <a href={`/post/${post._id}`} className="post-card">
        <div className="post-image-container">
          <img
            src={post.portada}
            alt={post.titulo}
            onError={handleImageError}
            className="post-image"
          />
        </div>
        <div className="post-content">
          <h2 className="post-title">{post.titulo}</h2>
          <p className="post-author">Por {post.autor}</p>
          <div className="post-stats">
            <span className="post-likes">❤️ {post.likes} Me gusta</span>
            <span className="post-comments">
              💬 {post.comentarios?.length || 0} Comentarios
            </span>
          </div>
          <div className="post-divider"></div>
          <p className="post-date">{formatDate(post.created_at)}</p>
        </div>
      </a>
    );
  }

  // Vista de lista
  return (
    <a href={`/post/${post._id}`} className="post-list-item">
      <div className="post-list-content">
        <h2 className="post-title">{post.titulo}</h2>
        <div className="post-list-meta">
          <span className="post-author">Por {post.autor}</span>
          <span className="post-likes">❤️ {post.likes}</span>
          <span className="post-comments">💬 {post.comentarios?.length || 0}</span>
        </div>
      </div>
    </a>
  );
}
