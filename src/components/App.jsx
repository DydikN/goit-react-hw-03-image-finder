import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import getImages from '../services/services';
import styles from './app.module.scss';
import Notiflix from 'notiflix';

class App extends Component {
  state = {
    searchQuery: '',
    items: [],
    loading: false,
    page: 1,
    totalHits: 0,
    largeImageURL: '',
    imgAlt: '',
    showModal: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { searchQuery, page } = this.state;
      const data = await getImages(searchQuery, page);
      const { hits, totalHits } = data;
      this.setState(({ items }) => ({
        items: [...items, ...hits],
        totalHits,
      }));
      Notiflix.Notify.success(`Found ${totalHits} images`);
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  hadleSeachSubmit = searchQuery => {
    this.setState({ searchQuery, items: [], page: 1 });
  };

  handleShowModal = event => {
    const imgAlt = event.target.alt;
    const largeImageURL = event.target.srcset;
    this.setState({
      showModal: true,
      imgAlt: imgAlt,
      largeImageURL: largeImageURL,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      imgAlt: '',
      largeImageURL: '',
    });
  };

  render() {
    const {
      items,
      loading,
      totalHits,
      error,
      imgAlt,
      largeImageURL,
      showModal,
    } = this.state;
    const { hadleSeachSubmit, loadMore, handleCloseModal, handleShowModal } =
      this;
    return (
      <div className={styles.app}>
        {showModal && (
          <Modal
            imgAlt={imgAlt}
            imgLargeSrc={largeImageURL}
            onModalClose={handleCloseModal}
          />
        )}
        <Searchbar onSubmit={hadleSeachSubmit} />
        {items.length > 0 && (
          <ImageGallery items={items} handleShowModal={handleShowModal} />
        )}

        {error && Notiflix.Notify.failure(`${error}`)}
        {items.length > 0 && items.length < totalHits && (
          <Button loadMore={loadMore} />
        )}
        {loading && <Loader />}
      </div>
    );
  }
}

export default App;
