import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';

class Searchbar extends Component {
  state = {
    searchValue: '',
    searchedValue: '',
  };

  handleChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (event.target.elements[1].value === '') {
      toast.info('Please enter your request!');
    } else if (this.state.searchValue === this.state.searchedValue) {
      toast.info('You entered the same query!');
      this.render();
    } else {
      this.props.onSubmit(this.state.searchValue);
      this.setState({ searchedValue: this.state.searchValue });
    }
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <ImSearch style={{ width: 24, height: 24, color: 'blue' }} />
            <span className={css.SearchFormButtonLabel}></span>
          </button>
          <input
            name="search"
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
        </form>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
