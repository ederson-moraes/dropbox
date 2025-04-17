import React, { Component } from 'react';
import api from '../../services/api';
import { MdInsertDriveFile } from 'react-icons/md';
import { formatDistance } from 'date-fns';
import withParams from '../../utils/withParams' // Import the wrapper
import logo from "../../assets/logo.svg"
import "./styles.css";

 class Box extends Component {
  state = {
    box: {},
  };

   async componentDidMount() {
    const { id } = this.props.params; // Access the id from props
    const box = await api.get(`boxes/${id}`);
    this.setState({ box: box.data });

    console.log(box.data);
  }

  render() {
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="Logo" />
          <h1>{this.state.box.title}</h1>
        </header>

        <ul>
          { this.state.box.files && this.state.box.files.map(file => (
            <li key={file._id}>
              <a className='fileInfo' href={file.url} target='blank'>
                <MdInsertDriveFile size={24} color="#A5CFFF" />
                <strong>{file.title}</strong>
              </a>
              <span>{formatDistance(new Date(file.createdAt), new Date(), { addSuffix: true })}</span>            </li>
          ))}


        </ul>
      </div>
    );
  }
}

export default withParams(Box); // Wrap the component with withParams
