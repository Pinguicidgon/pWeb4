// islands/LikeButton.tsx

import { useState } from "preact/hooks";
import { JSX } from "preact";
import axios from "axios";
import { API_BASE_URL } from "../utils/config.ts";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
  isLiked?: boolean;
}

export default function LikeButton(
  { postId, initialLikes, isLiked = false }: LikeButtonProps,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isLoading) return;

    try {
      setIsLoading(true);
      setError("");

      // 🔧 CORREGIDO: Uso correcto de axios.delete y axios.post con headers
      if (liked) {
        await axios.delete(`${API_BASE_URL}/api/posts/${postId}/like`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/posts/${postId}/like`, {}, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      setLiked(!liked);
      setLikes((prev) => liked ? prev - 1 : prev + 1);

    } catch (err) {
      console.error("Error al dar like:", err);
      setError("No se pudo dar like al post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="like-button-container">
      <button
        type="button"
        onClick={handleLike}
        disabled={isLoading}
        className={`like-button ${liked ? "liked" : ""} ${
          isLoading ? "loading" : ""
        }`}
        aria-label={liked ? "Quitar me gusta" : "Dar me gusta"}
      >
        <span className="like-icon">
          {isLoading ? "⏳" : liked ? "❤️" : "🤍"}
        </span>
        <span className="like-count">{likes}</span>
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
