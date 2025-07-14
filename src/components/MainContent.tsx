import { Layout, Card, Modal, } from "antd";
import { useEffect, useState } from "react";
import { Rate } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import "../styles/MainContent.css";
import Filters from "./Filters";

interface Movie {
  id: number;
  name?: string;
  alternativeName?: string;
  year?: number;
  genres?: { name: string }[];
  rating?: { imdb: number | null };
  poster?: {
    url?: string;
    previewUrl?: string;
  };
}
interface Poster {
  url?: string;
  previewUrl?: string;
}

interface Genre {
  name: string;
}

interface Movie {
  id: number;
  name?: string;
  alternativeName?: string;
  year?: number;
  genres?: Genre[];
  rating?: { imdb: number | null };
  poster?: Poster;
}

export default function MainContent() {
  const { Content } = Layout;
  const [movieData, setMovieData] = useState<{ docs: Movie[] } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
const [selectedYear, setSelectedYear] = useState<string[]>([]);
  const [likedMovies, setLikedMovies] = useState<{
    [key: number]: boolean | Movie;
  }>(() => JSON.parse(localStorage.getItem("likedMovies") || "{}"));
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMovie, setModalMovie] = useState<Movie | null>(null);
  const kinopoiskApiKey = import.meta.env.VITE_KINOPOISK_KEY;

  const baseUrl = "https://api.kinopoisk.dev/v1.4/movie";

  const params = new URLSearchParams({
    page: currentPage.toString(),
    limit: "50",
    type: "movie",
  });

  if (selectedYear.length > 0) {
    selectedYear.forEach((year) => {
      params.append("year", year);
    });
  }

  if (selectedGenres.length > 0) {
    selectedGenres.forEach((genres) => {
      params.append("genres.name", genres);
    });
  }
  if (selectedRatings.length > 0) {
    selectedRatings.forEach((rating) => {
      params.append("rating.imdb", rating);
    });
  }

  const url = `${baseUrl}?${params.toString()}`;

  useEffect(() => {
    setCurrentPage(1);
    setMovieData(null);
    setFetching(true);
  }, [selectedGenres, selectedRatings, selectedYear]);

  useEffect(() => {
    if (fetching) {
      const fetchData = async () => {
        try {
          const response = await fetch(url, {
            headers: {
              "X-API-KEY": kinopoiskApiKey,
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();

          setMovieData((prev) => {
            const existingIds = new Set(prev?.docs.map(({ id }: Movie) => id));
            const newMovies = data.docs.filter(
              (m: Movie) => !existingIds.has(m.id)
            );
            return {
              ...prev,
              docs: [...(prev?.docs || []), ...newMovies],
            };
          });

          setCurrentPage((prevState) => prevState + 1);
        } catch (error) {
          console.error("Ошибка загрузки данных", error);
        } finally {
          setFetching(false);
        }
      };

      fetchData();
    }
  }, [fetching, selectedGenres, selectedRatings, selectedYear]);
  console.log(url);
  console.log("moviedata", movieData);

  const scrollHandler = (e: Event) => {
    const target = e.target as HTMLElement;

    if (target && "scrollHeight" in target && "scrollTop" in target) {
      const scrolledToBottom =
        target.scrollHeight - (target.scrollTop + window.innerHeight) < 100;

      if (scrolledToBottom) {
        setFetching(true);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  const onHeartClick = (movie: Movie) => {
    setModalMovie(movie);
    setModalVisible(true);
  };
  const handleOk = () => {
    if (!modalMovie) return;
    setLikedMovies((prev) => {
      const was = Boolean(prev[modalMovie.id]);
      const next = { ...prev };
      if (was) delete next[modalMovie.id];
      else next[modalMovie.id] = modalMovie;
      localStorage.setItem("likedMovies", JSON.stringify(next));
      return next;
    });
    setModalVisible(false);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <Content className="main-content">
      <div className="rainbow-background"></div>

      <Filters
        selectedGenres={selectedGenres}
        selectedRatings={selectedRatings}
        selectedYear={selectedYear}
        setSelectedGenres={setSelectedGenres}
        setSelectedRatings={setSelectedRatings}
        setSelectedYear={setSelectedYear}
      />
      <div className="main-content-cardList">
        {movieData ? (
          movieData.docs.map((movie, index) => (
            <Card
              key={`${movie.id}-${index}`}
              style={{ width: 240, position: "relative" }}
              className="main-content-card"
              cover={
                <Link
                  to={`/movies/${movie.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {movie.poster?.url && (
                    <img
                      src={movie.poster.url || movie.poster.previewUrl}
                      alt={`Постер ${movie.alternativeName || movie.name}`}
                      className="main-content-card-poster"
                    />
                  )}
                </Link>
              }
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onHeartClick(movie);
                }}
                style={{ cursor: "pointer" }}
              >
                <button className="favorite-button">
                  {likedMovies[movie.id] ? (
                    <HeartFilled style={{ color: "red", fontSize: "24px" }} />
                  ) : (
                    <HeartOutlined
                      style={{ color: "gray", fontSize: "24px" }}
                    />
                  )}
                </button>
              </div>
              <div className="main-content-text">
                <h2>{movie.alternativeName || movie.name}</h2>
                <p>Year:{movie.year}</p>
                <div>
                  {movie.rating?.imdb ? (
                    <div>
                      <p>{movie.rating.imdb}</p>
                      <Rate
                        disabled
                        defaultValue={
                          movie.rating.imdb ? movie.rating.imdb / 2 : 0
                        }
                      />
                    </div>
                  ) : (
                    <p>No rating</p>
                  )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Загрузка...</p>
          </div>
        )}
      </div>
      <Modal
        title={
          likedMovies[modalMovie?.id]
            ? "Удалить из избранного?"
            : "Добавить в избранное?"
        }
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Да"
        cancelText="Нет"
        className="modal"
      >
        <p>
          {modalMovie && (
            <p>
              Фильм "{modalMovie.alternativeName || modalMovie.name}" будет{" "}
              {likedMovies[modalMovie.id] ? "удален" : "добавлен"} в список
              избранного.
            </p>
          )}
        </p>
      </Modal>
    </Content>
  );
}
