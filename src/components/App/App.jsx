import React, { Component } from 'react';
import Searchbar from 'components/Searchbar/SearchBar';
import Button from 'components/Button';
import Modal from 'components/Modal';
import ImageGallery from 'components/ImageGallery';
import MagnifyingGlass from 'components/Loader/Loader';
import axios from 'axios';
import css from './App.module.css';

class App extends Component {
  state = {
    query: '',
    page: 1,
    totalPages: 1,
    images: [],
    isLoading: false,
    isModalOpen: false,
    largeImageUrl: '',
  };

  completeRequest(query, page) {
    if (page > this.state.totalPages && page !== 1) {
      return;
    }
    const PER_PAGE = 12;
    const API_KEY = '33797356-50ef8f6f691cb32ae634945b3';
    const searchUrl = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

    this.setState({ isLoading: true });
    axios.get(searchUrl).then(response => {
      const totalPages = Math.round(response.data.totalHits / PER_PAGE);
      this.updateState(response.data.hits, totalPages, true);
      this.setState({ isLoading: false });
    });
  }

  handleSearch = searchValue => {
    if (searchValue !== '') {
      if (searchValue !== this.state.query) {
        this.setState({ query: searchValue, page: 1, images: [] });
      } else {
        this.setState({ query: searchValue }, () => {});
      }
    }
  };
  updateState(images, totalPages, add = false) {
    if (add) {
      this.setState({
        totalPages,
        images: [...this.state.images, ...images],
      });
    } else {
      this.setState({ totalPages, images });
    }
  }

  handleImageClick = largeImageUrl => {
    this.setState({
      largeImageUrl,
      isModalOpen: true,
    });
  };

  handleModalClickClose = e => {
    if (e.target.id === 'modal' && this.state.isModalOpen) {
      this.setState({
        isModalOpen: false,
      });
    }
  };

  handleModalClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  getImagesFromUrl(searchUrl) {
    axios.get(searchUrl).then(response => {
      const totalPages = Math.round(response.data.totalHits / 12);
      this.setState({ totalPages, images: response.data.hits });
    });
  }

  fetchMoreImages = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.completeRequest(this.state.query, this.state.page);
    }
  }

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery
          images={this.state.images}
          onModalOpen={this.handleImageClick}
        />
        {this.state.isModalOpen && (
          <Modal
            largeImageUrl={this.state.largeImageUrl}
            onClose={this.handleModalClose}
            onClickClose={this.handleModalClickClose}
            id={this.state.images.id}
          />
        )}
        <div className={css.Loader}>
          {this.state.isLoading && <MagnifyingGlass />}
        </div>
        {this.state.totalPages > 1 &&
          this.state.page < this.state.totalPages && (
            <>
              <Button getMoreImage={this.fetchMoreImages} />

              <div className={css.Info}>
                page {this.state.page} of {this.state.totalPages}
              </div>
            </>
          )}
      </div>
    );
  }
}
export default App;
