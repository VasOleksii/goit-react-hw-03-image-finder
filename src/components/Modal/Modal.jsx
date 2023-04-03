import { Component } from 'react';
import { PropTypes } from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div id="modal" onClick={this.props.onClickClose} className={css.Overlay}>
        <div className={css.Modal}>
          <img
            className={css.LargeImg}
            src={this.props.largeImageUrl}
            alt={this.props.id}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};

export default Modal;
