import React, { useState } from "react";
import "./Modal.css";
function Modal({ images, onClose, imageIndex }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(imageIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const currentImage = images[currentImageIndex];

  function handleWheel(event) {
    event.preventDefault();

    const zoomFactor = 0.05;
    const maxZoom = 3;
    const minZoom = 1;

    let newZoomLevel = zoomLevel - event.deltaY * zoomFactor;
    newZoomLevel = Math.max(minZoom, Math.min(maxZoom, newZoomLevel));

    setZoomLevel(newZoomLevel);
  }

  function handleMouseDown(event) {
    event.preventDefault();

    if (!isZoomed) {
      setIsZoomed(true);
      event.currentTarget.classList.add("zoomed");
      return;
    }

    const startPanPosition = { x: event.clientX, y: event.clientY };

    function handleMouseMove(event) {
      const dx = event.clientX - startPanPosition.x;
      const dy = event.clientY - startPanPosition.y;

      const imageElement = event.currentTarget;
      const containerElement = imageElement.parentElement;

      const imageRect = imageElement.getBoundingClientRect();
      const containerRect = containerElement.getBoundingClientRect();

      const maxTx = (imageRect.width - containerRect.width) / 2;
      const maxTy = (imageRect.height - containerRect.height) / 2;

      let newTx = panPosition.x + dx;
      let newTy = panPosition.y + dy;

      newTx = Math.max(-maxTx, Math.min(maxTx, newTx));
      newTy = Math.max(-maxTy, Math.min(maxTy, newTy));

      imageElement.style.setProperty("--tx", `${newTx}px`);
      imageElement.style.setProperty("--ty", `${newTy}px`);

      setPanPosition({ x: newTx, y: newTy });

      startPanPosition.x = event.clientX;
      startPanPosition.y = event.clientY;
    }

    function handleMouseUp() {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      event.currentTarget.classList.remove("grabbing");
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    event.currentTarget.classList.add("grabbing");
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      onClose();
    } else if (event.key === "ArrowLeft") {
      setCurrentImageIndex((currentImageIndex + images.length - 1) % images.length);
      setIsZoomed(false);
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
    } else if (event.key === "ArrowRight") {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
      setIsZoomed(false);
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
    }
  }


  const imageStyle = isZoomed
    ? {
        "--scale": zoomLevel,
        "--tx": `${panPosition.x}px`,
        "--ty": `${panPosition.y}px`,
      }
    : {};

  return (
    <div className="modal" onKeyDown={handleKeyDown}>
      <div className="overlay" onClick={onClose}></div>
      <div
        className={`image-container${isZoomed ? " zoomed" : ""}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
      >
        <img src={currentImage} alt={currentImage} style={imageStyle} />
      </div>
      <button className="close-button" onClick={onClose}>
        X
      </button>
      {/* <div className="caption">{imageName}</div> */}
    </div>
  );
}

export default Modal
