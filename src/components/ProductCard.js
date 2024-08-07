import { useState } from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="product-card">
      <div className="product-images-wrapper">
        <button className="prev-button" onClick={handlePrevClick}></button>
        <div className="product-images">
          <img
            src={product.images[currentImageIndex]}
            alt={`Product ${product.id} - ${currentImageIndex}`}
          />
        </div>
        <button className="next-button" onClick={handleNextClick}></button>
      </div>
      <h2 className="file-list-h2">Product Description</h2>
      <div className="product-description">
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
