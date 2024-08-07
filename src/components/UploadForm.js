import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import UploadIcon from '../assets/upload.svg';
import DeleteIcon from '../assets/delete.svg';
import { uploadImageAndText } from '../services/api';
import '../styles/UploadForm.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0];
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setError("");
      } else {
        setError("Please upload an image file.");
      }
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !description) {
      setError('Both image and description are required.');
      return;
    }
    setError("");

    setLoading(true);
    setIsProcessing(true);

    try {
      const results = await uploadImageAndText(file, description);
      navigate('/results', { state: { results } });
    } catch (error) {
      setError('Error uploading image and description');
      setLoading(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className={`upload-box ${isProcessing ? 'disabled' : ''}`}>
          <img src={UploadIcon} alt="upload" />
          <div className="upload-text">Upload your file here</div>
          <input
            id="file-input"
            className="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isProcessing}
          />
          <label htmlFor="file-input" className="file-label">Browse</label>
        </div>
        <h2 className="file-upload-h2">Product Description</h2>
        <div className="product-description-upload">
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Enter product description here"
            className="description-input"
            disabled={isProcessing}
          />
        </div>
        <h2 className="file-upload-h2">Uploading File</h2>
        {file && (
          <div className="file-item">
            <div className="file-name">
              <img src={preview} alt="file preview" className="file-icon" />
              <div className="file-details">
                <div className="file-description">{file.name}</div>
                <div className="file-size">{Math.round(file.size / 1024)} KB</div>
              </div>
            </div>
            {!isProcessing && (
              <img src={DeleteIcon} className="delete-button" onClick={handleDeleteFile} alt="delete" />
            )}
          </div>
        )}
        <div className="buttons-container">
          <button type="submit" className="action-button" disabled={loading || isProcessing}>
            {loading ? (
              <TailSpin
                height="20"
                width="20"
                color="#FFFFFF"
                ariaLabel="loading"
                className="loader"
              />
            ) : (
              'Process'
            )}
          </button>
          {error && <div className="error-message">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
