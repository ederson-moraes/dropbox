import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import withNavigate from '../../utils/withNavigate'; // Import the wrapper

import './styles.css';

class Main extends Component {
  state = {
    newBox: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post('boxes', {
      title: this.state.newBox,
    });

    this.props.navigate(`/boxes/${response.data._id}`); // Use navigate instead of history.push
  };

  handleInputChange = (e) => {
    this.setState({ newBox: e.target.value });
  };

  render() {
    return (
      <div id="main-container">
        <form onSubmit={this.handleSubmit}>
          <img src={logo} alt="Logo" />
          <input
            type="text"
            placeholder="Criar uma box"
            value={this.state.newBox}
            onChange={this.handleInputChange}
          />
          <button type="submit">Criar</button>
        </form>
      </div>
    );
  }
}

export default withNavigate(Main); // Wrap the component with withNavigate
