import React from 'react';
import { Card, CardBody } from '@material-tailwind/react';

const galleryImages = [
  { src: 'http://43.204.2.84:7200/uploads/images/1734880808937-maxresdefault.jpg', alt: 'Image 1' },
  { src: 'http://43.204.2.84:7200/uploads/images/1734880832789-pngtree-weight-loss-fat-vs-slim-before-and-after-concept-png-image_1511723.jpg', alt: 'Image 2' },
  { src: 'http://43.204.2.84:7200/uploads/images/1734880982927-awesome-before-after-weight-loss-260nw-2083553125.webp', alt: 'Image 3' },
];

const Gallery = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryImages.map((image, index) => (
          <Card key={index} className="w-full">
            <CardBody className="p-0">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover"
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
