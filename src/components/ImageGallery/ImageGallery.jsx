import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './imageGallery.module.scss';
import PropTypes from 'prop-types';

function ImageGallery({ items, handleShowModal }) {
  const elements = items.map(({ id, webformatURL, largeImageURL, tags }) => (
    <ImageGalleryItem
      key={id}
      webformatURL={webformatURL}
      largeImageURL={largeImageURL}
      alt={tags}
      handleShowModal={handleShowModal}
    />
  ));
  return <ul className={styles.imageGallery}>{elements}</ul>;
}

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleShowModal: PropTypes.func.isRequired,
};
