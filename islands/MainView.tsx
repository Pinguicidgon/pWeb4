// islands/MainView.tsx

import type { Signal } from "@preact/signals";
import type Post from "../models/post.ts";
import PostComponent from "../components/Post.tsx";

interface HomeProps {
  isGrid: Signal<boolean>;
  posts: Post[];
}

export default function MainView({ isGrid, posts }: HomeProps) {
  return (
    <div className="main-view-container">
      <div className="view-toggle">
        <button
          type="button"
          className={`toggle-button ${isGrid.value ? "active" : ""}`}
          title={
            isGrid.value
              ? "Cambiar a vista de lista"
              : "Cambiar a vista de cuadrícula"
          }
          onClick={() => isGrid.value = !isGrid.value}
        >
          {isGrid.value ? "☰ Lista" : "⏹️ Cuadrícula"}
        </button>
      </div>

      <div
        className={`posts-container ${
          isGrid.value ? "grid-view" : "list-view"
        }`}
      >
        {Array.isArray(posts) &&
          posts.map((post) => (
            <PostComponent key={post._id} post={post} isGrid={isGrid.value} />
          ))}
      </div>
    </div>
  );
}
