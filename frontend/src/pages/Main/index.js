import React, { Component } from 'react'
import logo from '../../assets/logo.svg'
import api from '../../services/api'  

import "./styles.css"

export default class index extends Component {
  state = {
    newBox: '',
  }
  
  
  handleSubmit = async (e) => {
    e.preventDefault()
    const response = await api.post('boxes', {
      title: this.state.newBox
    })

    console.log(response.data)
  }


  handleInputChange = (e) => {
    this.setState({ newBox: e.target.value })
  }
  
  
  render() {
    return (
      <div id='main-container'>
        <form onSubmit={this.handleSubmit} action="" alt="">
            <img src={logo}></img>
            <input type="text" placeholder='Criar uma box' 
            value={this.state.newBox}
            onChange={this.handleInputChange}/>
            <button type="submit">Criar</button>
        </form>
      </div>
    )
  }
}
