import Comment from "./comments.ts";

interface Post {
  _id: string;
  titulo: string;
  contenido: string;
  autor: string;
  portada: string;
  likes: number;
  created_at: Date;
  updated_at: Date;
  comentarios: Comment[];
}

export default Post;
