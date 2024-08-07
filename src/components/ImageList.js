import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchImage } from '../services/api';
import ProductCard from './ProductCard';
import '../styles/ImageList.css';

const ImageList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state;

  const loadProducts = async () => {
    const loadedProducts = await Promise.all(results.img_paths.map(async (pathList, index) => {
      const imageUrls = await Promise.all(pathList.map(async (path) => {
        try {
          return await fetchImage(path);
        } catch (error) {
          console.error('Error fetching image', error);
          return null;
        }
      }));
      return { id: index + 1, description: results.titles[index], images: imageUrls };
    }));
    setProducts(loadedProducts);
    setLoading(false);
  };

  const handleClear = () => {
    navigate('/');
  };

  useEffect(() => {
    loadProducts();
  }, [results]);

  return (
    <div className="products-page">
      {loading ? (
        <div className='Loading'>Loading ...</div>
      ) : (
        <>
          <div className='list-heading'>Similar Products</div>
          <div className="products-container">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <button onClick={handleClear} className="clear-button">Clear all</button>
        </>
      )}
    </div>
  );
};

export default ImageList;