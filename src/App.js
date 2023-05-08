import React, { useState, useEffect } from "react";
import "./App.css";
import Modal from "./Modal";
import Navbar from "./NavBar";
import { useLocation, useSearchParams } from "react-router-dom";

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

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation()

  useEffect(() => {
    if (isEmpty(manifest)) {
      fetch("data.json")
        .then((response) => response.json())
        .then((data) => setManifest(data))
        .catch((reason) => {
          setTitle("qc/data.json not found!")
        });
    }
  }, [manifest]);

  useEffect(() => {
    if (!isEmpty(manifest)) {
      const slug = searchParams.get("page")
      if (slug) {
        setPage(slug);
      } else {
        setPage(Object.keys(manifest)[0]);
      }
    }
  }, [manifest, searchParams, location]);

  useEffect(() => {
    if (!isEmpty(manifest) && page) {
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
              <img src={"/" + url} alt={name} style={{ width: "100%" }} />
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
