import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { PropTypes } from 'prop-types';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.ImageGallery}>
        {this.props.images.map(image => (
          <ImageGalleryItem
            key={image.id}
            onImgClick={this.props.onModalOpen}
            image={image}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onModalOpen: PropTypes.func.isRequired,
};

export default ImageGallery;
