// src/components/ProjectCarousel.jsx
import { useState } from 'react';
import './ProjectCarousel.css';

const ProjectCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle when images is undefined, null, or not an array
  const imageArray = Array.isArray(images) ? images :
      // If it's a single image string, convert to array
      (typeof images === 'string' ? [images] :
          // Otherwise use a placeholder
          ["https://via.placeholder.com/800x600?text=Project+Image"]);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? imageArray.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === imageArray.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Only show navigation if there's more than one image
  const showNavigation = imageArray.length > 1;

  return (
      <div className="project-carousel">
        <div className="carousel-main-image">
          <img
              src={imageArray[currentIndex]}
              alt={`Project view ${currentIndex + 1} of ${imageArray.length}`}
              onLoad={() => setImageLoaded(true)}
          />

          {showNavigation && (
              <>
                <button
                    className="carousel-arrow carousel-arrow-left"
                    onClick={goToPrevious}
                    aria-label="Previous image"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                <button
                    className="carousel-arrow carousel-arrow-right"
                    onClick={goToNext}
                    aria-label="Next image"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </>
          )}
        </div>

        {showNavigation && (
            <div className="carousel-indicators">
              {imageArray.map((_, index) => (
                  <button
                      key={index}
                      className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to image ${index + 1}`}
                      aria-current={index === currentIndex}
                  />
              ))}
            </div>
        )}
      </div>
  );
};

export default ProjectCarousel;