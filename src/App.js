import React, { useState, useEffect } from "react";
import "./App.css";
import Modal from "./Modal";

function App() {
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);


  useEffect(() => {
    fetch("images.json")
      .then((response) => response.json())
      .then((data) => setImages(data));
  }, []);



  const openModal = (index) => {
    setModalOpen(true);
    setModalImageIndex(index);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <div className="gallery">
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
        <Modal images={images} onClose={closeModal} imageIndex={modalImageIndex} />
      )}
    </div>
  );
}

export default App;

