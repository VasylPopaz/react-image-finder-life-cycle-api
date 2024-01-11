import React, { Component } from 'react';
import { Searchbar, ImageGallery, Button, Loader, Modal } from 'components';
import { getPhotos } from 'helpers/api';
import { Container } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    imageUrl: '',
    modalContent: null,
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    showLoadMore: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({
        isLoading: true,
      });

      try {
        const { results, total, total_pages } = await getPhotos(query, page);
        const isMorePhotos = page < total_pages;

        if (!total) {
          return toast.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        if (page === 1) {
          toast.success(`Hurray! We found ${total} images.`);
        } else {
          setTimeout(() => {
            window.scrollBy({
              top: window.innerHeight * 0.8,
              behavior: 'smooth',
            });
          }, 400);
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...results],
          showLoadMore: isMorePhotos,
        }));

        if (!isMorePhotos) {
          toast.info(
            `We're sorry, but you've reached the end of search results.`
          );
        }
      } catch (error) {
        toast.error('Sorry, something went wrong. Please try again.');
        console.log(error.name);
        console.log(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = searchQuery => {
    if (searchQuery === this.state.query) return;
    this.setState({
      images: [],
      query: searchQuery,
      page: 1,
      imageUrl: '',
      showLoadMore: false,
    });
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  handleImgClick = content => {
    this.setState({ modalContent: content });
    this.toggleModal();
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  
  handleNextPhoto = id => {
    const { images } = this.state;
    const imageId = this.state.images.findIndex(img => img.id === id);

    if (imageId === images.length - 1)
      return this.setState({ modalContent: images[0] });
    this.setState({ modalContent: images[imageId + 1] });
  };

  handlePrevPhoto = id => {
    const { images } = this.state;
    const imageId = this.state.images.findIndex(img => img.id === id);

    if (!imageId)
      return this.setState({ modalContent: images[images.length - 1] });
    this.setState({ modalContent: images[imageId - 1] });
  };

  render() {
    const { images, isLoading, showModal, showLoadMore, modalContent } =
      this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length ? (
          <ImageGallery images={images} onClick={this.handleImgClick} />
        ) : null}
        {isLoading && <Loader />}
        {showLoadMore
          ? !isLoading && <Button onClick={this.handleLoadMoreClick} />
          : null}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            handleNextPhoto={() => this.handleNextPhoto(modalContent.id)}
            handlePrevPhoto={() => this.handlePrevPhoto(modalContent.id)}
            modalContent={modalContent}
          />
        )}
        <ToastContainer autoClose={2000} />
      </Container>
    );
  }
}
