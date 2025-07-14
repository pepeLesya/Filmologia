import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rate } from "antd";
import { Link } from "react-router-dom";
import "../../styles/MovieDetails.css";
interface Movie {
  id: number;
  name?: string;
  alternativeName?: string;
  year?: number;
  description?: string;
  poster?: {
    url?: string;
  };
  countries?: Array<{ name?: string }>;
  genres?: Array<{ name?: string }>;
  rating?: {
    imdb?: number;
  };
}
export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const kinopoiskApiKey = import.meta.env.VITE_KINOPOISK_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      const url = `https://api.kinopoisk.dev/v1.4/movie/ ${id}`;

      try {
        const response = await fetch(url, {
          headers: {
            "X-API-KEY": kinopoiskApiKey,
          },
        });

        if (!response.ok) {
          throw new Error(`Ошибка загрузки: ${response.status}`);
        }

        const data: Movie = await response.json();
        setMovie(data);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Неизвестная ошибка";
        setError(errorMessage);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Загрузка...</p>
      </div>
    );

  if (error) return <p>Ошибка: {error}</p>;
  if (!movie) return <p>Фильм не найден</p>;

  return (
    <div className="movie-details-page">
      <div className="movie-details-background"></div>

      <div className="movie-details-navigation">
        <Link to={`/`}>
          <button className="movie-details-back-button">← Назад</button>
        </Link>
      </div>

      <div className="movie-details-main">
        <div className="movie-details-card">
          <div className="movie-details-content">
            <div className="movie-details-image">
              {movie.poster?.url && (
                <img src={movie.poster.url} alt={movie.name} />
              )}
            </div>

            <div className="movie-details-info">
              <h1 className="movie-details-title">
                {movie.name || movie.alternativeName}
              </h1>

              <div className="movie-details-meta">
                <div className="movie-details-meta-item">
                  <span className="movie-details-meta-label">Год</span>
                  <span className="movie-details-meta-value">{movie.year}</span>
                </div>

                <div className="movie-details-meta-item">
                  <span className="movie-details-meta-label">Страна</span>
                  <span className="movie-details-meta-value">
                    {movie.countries?.[0]?.name || "Неизвестно"}
                  </span>
                </div>

                <div className="movie-details-meta-item">
                  <span className="movie-details-meta-label">Жанр</span>
                  <span className="movie-details-meta-value">
                    {movie.genres?.[0]?.name || "Неизвестно"}
                  </span>
                </div>
              </div>

              <div className="movie-details-rating">
                {movie.rating?.imdb ? (
                  <>
                    <span className="movie-details-rating-number">
                      {movie.rating.imdb}
                    </span>
                    <Rate
                      disabled
                      defaultValue={
                        movie.rating.imdb ? movie.rating.imdb / 2 : 0
                      }
                    />
                  </>
                ) : (
                  <span>Нет рейтинга</span>
                )}
              </div>

              <div className="movie-details-description">
                {movie.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
