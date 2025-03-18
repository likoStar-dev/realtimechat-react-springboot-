import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { BsArrowsFullscreen } from "react-icons/bs";

const ImageViewer = ({ imageUrl, isOpen, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const modalRef = useRef(null);

  // Reset zoom and position when a new image is opened
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });

      // Focus the modal for keyboard controls
      if (modalRef.current) {
        modalRef.current.focus();
      }

      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scrolling when modal is closed
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, imageUrl]);

  // Handle zoom in
  const handleZoomIn = () => {
    if (scale < 3) {
      setScale((prevScale) => prevScale + 0.25);
    }
  };

  // Handle zoom out
  const handleZoomOut = () => {
    if (scale > 0.5) {
      setScale((prevScale) => prevScale - 0.25);

      // Reset position if we're going back to original size
      if (scale - 0.25 <= 1) {
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  // Handle reset (fit to screen)
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e) => {
    // Only enable dragging when zoomed in
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    if (scale > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && scale > 1 && e.touches.length === 1) {
      e.preventDefault(); // Prevent page scrolling
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Handle mouse wheel for zooming
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (isOpen) {
      switch (e.key) {
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "0":
          handleReset();
          break;
        case "Escape":
          onClose();
          break;
        default:
          break;
      }
    }
  };

  // Handle modal click (close if clicking outside the image)
  const handleModalClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  // Add and remove event listeners
  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center outline-none"
      onClick={handleModalClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        className="relative flex items-center justify-center w-full h-full overflow-hidden"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Image container */}
        <div
          className="relative transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onWheel={handleWheel}
        >
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onDragStart={(e) => e.preventDefault()} // Prevent browser's native drag
          />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
          aria-label="Close image viewer"
        >
          <IoClose size={24} />
        </button>

        {/* Zoom controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 rounded-full p-1 flex items-center">
          <button
            onClick={handleZoomOut}
            className="p-2 text-white hover:bg-gray-700 rounded-full disabled:opacity-50"
            disabled={scale <= 0.5}
            aria-label="Zoom out"
          >
            <IoMdRemove size={20} />
          </button>

          <div className="px-3 text-white">{Math.round(scale * 100)}%</div>

          <button
            onClick={handleZoomIn}
            className="p-2 text-white hover:bg-gray-700 rounded-full disabled:opacity-50"
            disabled={scale >= 3}
            aria-label="Zoom in"
          >
            <IoMdAdd size={20} />
          </button>

          <button
            onClick={handleReset}
            className="p-2 text-white hover:bg-gray-700 rounded-full ml-2"
            aria-label="Reset zoom"
          >
            <BsArrowsFullscreen size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
