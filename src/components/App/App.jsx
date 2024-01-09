import React, { Component } from 'react';
import { Searchbar, ImageGallery, Button, Loader, Modal } from 'components';
import { getPhotos } from 'helpers/api';
import { Container } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkMorePhotos } from 'helpers/checkMorePhotos';

export class App extends Component {
  state = {
    images: [],
    imageUrl: '',
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    showLoadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState(
        {
          isLoading: true,
          images: [],
        },
        async () => {
          try {
            const { hits, totalHits } = await getPhotos(query, page);

            if (!hits.length) {
              this.setState({ images: [] });
              return toast.warning(
                'Sorry, there are no images matching your search query. Please try again.'
              );
            }

            this.setState(prevState => ({
              showLoadMore: !prevState.showLoadMore,
            }));
            toast.success(`Hurray! We found ${totalHits} images.`);
            this.setState({ images: [...hits] });
            checkMorePhotos(page, totalHits)
              ? this.setState({
                  showLoadMore: true,
                })
              : this.setState({
                  showLoadMore: false,
                });
          } catch (error) {
            toast.error('Sorry, something went wrong. Please try again.');
            console.log(error.name);
            console.log(error.message);
          } finally {
            this.setState({ isLoading: false });
          }
        }
      );
    }

    if (prevState.page < page) {
      this.setState({ isLoading: true }, async () => {
        try {
          const { hits, totalHits } = await getPhotos(query, page);
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
          }));

          if (!checkMorePhotos(page, totalHits)) {
            this.setState(prevState => ({
              showLoadMore: !prevState.showLoadMore,
            }));
          }
          setTimeout(() => {
            window.scrollBy({
              top: window.innerHeight * 0.85,
              behavior: 'smooth',
            });
          }, 400);
        } catch (error) {
          toast.error('Sorry, something went wrong. Please try again.');
          console.log(error.name);
          console.log(error.message);
        } finally {
          this.setState({ isLoading: false });
        }
      });
    }
  }

  handleSubmit = searchQuery => {
    this.setState({
      query: searchQuery,
      page: 1,
      imageUrl: '',
    });
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  handleImgClick = url => {
    this.setState({ imageUrl: url });
    this.toggleModal();
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, showModal, showLoadMore, imageUrl } = this.state;
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
        {showModal && <Modal onClose={this.toggleModal} url={imageUrl} />}
        <ToastContainer />
      </Container>
    );
  }
}
