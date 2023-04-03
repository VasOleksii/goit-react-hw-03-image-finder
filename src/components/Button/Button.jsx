import { Component } from 'react';
import { PropTypes } from 'prop-types';
import css from './Button.module.css';

class Button extends Component {
  render() {
    return (
      <button onClick={this.props.getMoreImage} className={css.Button}>
        Load more
      </button>
    );
  }
}
Button.propTypes = {
  getMoreImage: PropTypes.func.isRequired,
};

export default Button;
