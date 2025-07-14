import "../../styles/Favorite.css";
import { Card, Rate } from "antd";
import { Link } from "react-router-dom";

export default function FavoritePage() {
  const favs = JSON.parse(localStorage.getItem("likedMovies") || "{}");
  console.log(favs);
  return (
    <div className="favorite-page-wrapper">
      <div className="favorite-page-background"></div>

      <div className="favorite-page-header">
        <Link to={`/`}>
          <button className="favorite-page-button">← Назад</button>
        </Link>
      </div>

      <div className="favorite-page-content">
        <div className="favorite-page-grid">
          {Object.keys(favs).map((id) => {
            const movie = favs[id];
            return (
              <Card className="favorite-page-card" key={id}>
                <div className="favorite-page-details">
                  <div className="favorite-page-poster">
                    {movie.poster?.url && (
                      <img src={movie.poster.url} alt={movie.name} />
                    )}
                  </div>

                  <div className="favorite-page-info">
                    <h2 className="favorite-page-title">
                      {movie.name || movie.alternativeName}
                    </h2>

                    <div className="favorite-page-meta">
                      <div className="favorite-page-meta-item">
                        <span>Год</span>
                        <span className="favorite-page-meta-value">
                          {movie.year}
                        </span>
                      </div>

                      <div className="favorite-page-meta-item">
                        <span>Рейтинг</span>
                        <span className="favorite-page-meta-value">
                          {movie.rating?.imdb ? movie.rating.imdb : "Нет"}
                        </span>
                      </div>
                    </div>

                    <div className="favorite-page-rating">
                      {movie.rating?.imdb ? (
                        <>
                          <span className="favorite-page-rating-number">
                            {movie.rating.imdb}
                          </span>
                          <Rate
                            disabled
                            defaultValue={
                              movie.rating.imdb ? movie.rating.imdb / 2 : 0
                            }
                          />
                        </>
                      ) : null}
                    </div>

                    <button
                      className="favorite-page-remove-button"
                      onClick={() => {
                        const updatedFavs = { ...favs };
                        delete updatedFavs[id];
                        localStorage.setItem(
                          "likedMovies",
                          JSON.stringify(updatedFavs)
                        );
                        window.location.reload();
                      }}
                    >
                      Удалить из избранного
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
