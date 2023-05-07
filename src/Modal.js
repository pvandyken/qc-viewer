import React, { useEffect, useRef, useState } from "react";
import "./Modal.css";
function Modal({ images, onClose, imageIndex, defaultZoom=0.8 }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(imageIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(defaultZoom);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const currentImage = images[currentImageIndex];
  const imageRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    containerRef.current.focus();
    return () => {
      document.body.style.overflow = "unset";
    };
  });

  function startZoom() {
    setIsZoomed(true);
  }

  function stopZoom() {
    setIsZoomed(false);
    setZoomLevel(defaultZoom);
    setPanPosition({ x: 0, y: 0 });
  }

  function handleWheel(event) {
    event.preventDefault();
    if (!isZoomed) {
      startZoom();
    }

    const zoomFactor = 0.005;
    const maxZoom = 4;
    const minZoom = 0.8;

    let newZoomLevel = zoomLevel - event.deltaY * zoomFactor;
    newZoomLevel = Math.max(minZoom, Math.min(maxZoom, newZoomLevel));

    setZoomLevel(newZoomLevel);
  }

  function handleMouseDown(event) {
    event.preventDefault();

    if (!isZoomed) {
      startZoom();
      setZoomLevel(1.5);
      return;
    }

    const startPanPosition = { x: event.clientX, y: event.clientY };

    function handleMouseMove(event) {
      const dx = event.clientX - startPanPosition.x;
      const dy = event.clientY - startPanPosition.y;

      const imageRect = imageRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const maxTx = (imageRect.width - containerRect.width) / (2 * zoomLevel);
      const maxTy = (imageRect.height - containerRect.height) / (2 * zoomLevel);

      let newTx = panPosition.x + dx;
      let newTy = panPosition.y + dy;

      newTx = Math.max(-Math.abs(maxTx), Math.min(Math.abs(maxTx), newTx));
      newTy = Math.max(-Math.abs(maxTy), Math.min(Math.abs(maxTy), newTy));

      imageRef.current.style.setProperty("--tx", `${newTx}px`);
      imageRef.current.style.setProperty("--ty", `${newTy}px`);

      setPanPosition({ x: newTx, y: newTy });
    }

    function handleMouseUp(event) {
      if (
        event.clientX === startPanPosition.x &&
        event.clientY === startPanPosition.y
      ) {
        stopZoom();
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      // event.currentTarget.classList.remove("grabbing");
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // event.currentTarget.classList.add("grabbing");
  }

  function handleKeyDown(event) {
    console.log("got key down");
    if (event.key === "Escape") {
      onClose();
    } else if (event.key === "ArrowLeft") {
      prevImage();
    } else if (event.key === "ArrowRight") {
      nextImage();
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setIsZoomed(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setIsZoomed(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const imageStyle = isZoomed
    ? {
        "--scale": zoomLevel,
        "--tx": `${panPosition.x}px`,
        "--ty": `${panPosition.y}px`,
      }
    : {};

  return (
    <>
      <div
        className="modal"
        tabIndex="-1"
        onKeyDown={handleKeyDown}
        ref={containerRef}
      >
        <div className="overlay" onClick={onClose}></div>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div
          className={`image-container${isZoomed ? " zoomed" : ""}`}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          style={imageStyle}
          ref={imageRef}
        >
          <img src={currentImage} alt={currentImage} />
        </div>
        <span className="prev" onClick={prevImage}>
          &#10094;
        </span>
        <span className="next" onClick={nextImage}>
          &#10095;
        </span>
        {/* <div className="caption">{imageName}</div> */}
      </div>
      <div className="modal-caption">
        <div className="caption">{currentImage.split("/").pop()}</div>
      </div>
    </>
  );
}

export default Modal;
