import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

const API_KEY = "oQsitavaVme_LKIZIZji1Slnz_4kIV-PQg9WsqTRWnI";
const BASE_URL = "https://api.unsplash.com/";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_URL}search/photos?query=${query}&per_page=50&client_id=${API_KEY}`
      );
      setImages(response.data.results);
    } catch (error) {
      console.error("Fetching Error", error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages();
  };

  return (
    <div className="main">
      <Container>
        <form onSubmit={handleSubmit}>
          <div className="Input">
            <input
              type="text"
              value={query}
              placeholder="Search Images..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </div>
        </form>

        {loading && <p>Loading...</p>}

            <div className="Images">
            {images.map((image) => (
                <img
                key={image.id}
                src={image.urls.small}
                alt=''
                className="image"
                />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default App;
