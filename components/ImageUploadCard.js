import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Card, CardContent, Typography, Button, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const uploadImage = async (file, setProcessedImageUrl) => {
  if (!file) {
    alert('No file selected');
    return;
  }

  if (file.type !== 'image/png') {
    alert('Only PNG images are accepted');
    return;
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('http://localhost:8080/app/api/images/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      setProcessedImageUrl(URL.createObjectURL(blob));
    } else {
      console.error('Upload failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Upload failed', error);
  }
};

function ImageUploadCard() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.type === 'image/png') {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
    } else {
      alert('Only PNG images are accepted');
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/png',
    multiple: false,
  });

  const handleClearImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setProcessedImageUrl(null);
  };

  return (
    <Box sx={{ maxWidth: 1300, margin: 'auto', textAlign: 'center' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent {...getRootProps()} sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
              <input {...getInputProps()} />
              {selectedImage ? (
                <Box sx={{ position: 'relative', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={selectedImage} alt="Preview" style={{ maxHeight: '100%', objectFit: 'contain', margin: 'auto' }} />
                  <IconButton onClick={handleClearImage} sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ) : (
                <Typography>Drop Image Here or Click to Upload</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {processedImageUrl ? (
                <img src={processedImageUrl} alt="Processed" style={{ maxHeight: '100%', objectFit: 'contain', margin: 'auto' }} />
              ) : (
                <Typography>Restored Image will appear here</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Button variant="contained" fullWidth sx={{ mt:
2 }} onClick={() => uploadImage(selectedFile, setProcessedImageUrl)}>
Restore Image
</Button>
</Grid>
<Grid item xs={12} md={6}>
<Button variant="outlined" onClick={handleClearImage} fullWidth sx={{ mt: 2 }}>
Reset
</Button>
</Grid>
</Grid>
</Box>
);
}

export default ImageUploadCard;