import React, { useState, useEffect } from "react";
import "./App.css";
import Modal from "./Modal";
import Navbar from "./NavBar";
import { useLocation } from "react-router-dom";

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function App() {
  const [page, setPage] = useState('');
  const [manifest, setManifest] = useState({});
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("Loading");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const location = useLocation();

  useEffect(() => {
    if (isEmpty(manifest)) {
      fetch("images.json")
        .then((response) => response.json())
        .then((data) => setManifest(data));
    }
  }, [manifest]);

  useEffect(() => {
    if (!isEmpty(manifest)) {
      console.log(location.pathname.split('/').pop())
      const slug = location.pathname.split("/").pop()
      if (slug) {
        setPage(slug);
      } else {
        setPage(Object.keys(manifest)[0]);
      }
    }
  }, [manifest]);

  useEffect(() => {
    if (!isEmpty(manifest) && page) {
      console.log(page)
      if (!(page in manifest)) {
        setTitle("Page not found!");
      } else {
        setImages(manifest[page].images);
        setTitle(manifest[page].title);
      }
    }
  }, [manifest, page]);

  const openModal = (index) => {
    setModalOpen(true);
    setModalImageIndex(index);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <Navbar manifest={manifest}  />
      <div className="gallery">
        <h1>{title}</h1>
        {images.map((url, index) => {
          const name = url.split("/").pop();
          return (
            <div key={index} onClick={() => openModal(index)}>
              <h2>{name}</h2>
              <img src={url} alt={name} style={{ width: "100%" }} />
            </div>
          );
        })}
      </div>
      {modalOpen && (
        <Modal
          images={images}
          onClose={closeModal}
          imageIndex={modalImageIndex}
        />
      )}
    </div>
  );
}

export default App;
