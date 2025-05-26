
import { Handlers } from "$fresh/server.ts";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../../utils/config.ts";
import {
  hasValidationErrors,
  isApiResponseError,
} from "../../models/api_response.ts";

interface FormDataError {
  title?: string;
  content?: string;
  author?: string;
  cover?: string;
}

function isValidFormDataKey(key: string): key is keyof FormDataError {
  return ["title", "content", "author", "cover"].includes(key);
}

export const handler: Handlers = {
  async POST(_req, ctx) {
    const form = await _req.formData();

    // 🔧 CAMBIO: nombres en español para coincidir con el backend
    const titulo = form.get("titulo")?.toString() || "";
    const contenido = form.get("contenido")?.toString() || "";
    const autor = form.get("autor")?.toString() || "";
    const portada = form.get("portada")?.toString() || "";

    // ✅ Validación básica antes de enviar a la API
    if (!titulo || !contenido || !autor || !portada) {
      return ctx.render({
        errors: {
          title: !titulo ? "El título es obligatorio" : "",
          content: !contenido ? "El contenido es obligatorio" : "",
          author: !autor ? "El autor es obligatorio" : "",
          cover: !portada ? "La portada es obligatoria" : "",
        },
      });
    }

    // 🔧 LOG para depuración
    console.log("Voy a enviar a la API:", { titulo, contenido, autor, portada });

    try {
      // 🔧 CORREGIDO: headers como tercer argumento
      await axios.post(
        `${API_BASE_URL}/api/posts`,
        {
          titulo,
          contenido,
          autor,
          portada,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const headers = new Headers();
      headers.set("location", "/");
      return new Response(null, {
        headers,
        status: 302,
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;
      const body = await axiosError.response?.data;
      // ✅ LOG para depuración de errores
      console.error("Status:", status, "Body:", body);

      if (isApiResponseError(body)) {
        const errors: FormDataError = {};
        if (hasValidationErrors(body.error)) {
          body.error.details.forEach((detail) => {
            if (isValidFormDataKey(detail.path)) {
              errors[detail.path] = detail.message;
            }
          });
          return ctx.render({ errors });
        }
      }

      return ctx.render({
        errors: {
          title: "Ha habido un error al crear el post",
          content: "Ha habido un error al crear el post",
          author: "Ha habido un error al crear el post",
          cover: "Ha habido un error al crear el post",
        },
      });
    }
  },

  GET(_req, ctx) {
    return ctx.render({
      errors: { title: "", content: "", author: "", cover: "" },
    });
  },
};

interface PageProps {
  data: {
    errors?: FormDataError;
  };
}

export default function Create({ data }: PageProps) {
  const { errors = {} } = data || {};
  return (
    <div className="create-post-container">
      <h1 className="create-post-title">Crear Nuevo Post</h1>

      <form className="post-form" action="/create" method="POST">
        <div className="form-group">
          <label htmlFor="titulo" className="form-label">
            Título
          </label>
          {/* 🔧 CAMBIO: input name="titulo" para coincidir con backend */}
          <input
            type="text"
            id="titulo"
            name="titulo"
            className={errors?.title ? "form-input input-error" : "form-input"}
            placeholder="Escribe un título atractivo"
            required
          />
          {errors?.title && <p className="error-message">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="contenido" className="form-label">
            Contenido
          </label>
          {/* 🔧 CAMBIO: textarea name="contenido" para coincidir con backend */}
          <textarea
            id="contenido"
            name="contenido"
            className={
              errors?.content ? "form-textarea input-error" : "form-textarea"
            }
            rows={8}
            placeholder="Escribe el contenido de tu post aquí..."
            required
          ></textarea>
          {errors?.content && (
            <p className="error-message">{errors.content}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="autor" className="form-label">
            Autor
          </label>
          {/* 🔧 CAMBIO: input name="autor" para coincidir con backend */}
          <input
            type="text"
            id="autor"
            name="autor"
            className={errors?.author ? "form-input input-error" : "form-input"}
            required
          />
          {errors?.author && <p className="error-message">{errors.author}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="portada" className="form-label">
            URL de la imagen de portada
          </label>
          {/* 🔧 CAMBIO: input name="portada" para coincidir con backend */}
          <input
            type="url"
            id="portada"
            name="portada"
            className={errors?.cover ? "form-input input-error" : "form-input"}
            placeholder="https://ejemplo.com/imagen.jpg"
            required
          />
          {errors?.cover && <p className="error-message">{errors.cover}</p>}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Publicar Post
          </button>
          {/* ✅ El botón cancelar */}
          <button
            type="button"
            className="cancel-button"
            onClick={() => (window.location.href = "/")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
