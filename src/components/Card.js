// import React, {useState, useEffect } from 'react';
import React, { Component } from "react";
import "../App.scss";
import Comments from './Comments';
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null
    };
  }

  // Life
  componentDidMount() {
    this.setState({ 
      id: this.props.number
    })
    // console.log("this.props.count",this.props.count)
  }

  componentDidUpdate(prevProps) {
    if (this.props.number !== prevProps.number) {
      this.setState({ 
        id: this.props.number
      })
    }
  }

  // Functions

  render() {
    return (
      <React.Fragment>
        <div className="glass person" item={this.props.number}>
        <div className="cardInfo">
          <h4>
            {this.state.id}
          </h4>
          <h3>
            {this.props.name}, {this.props.birth_year}
          </h3>
        </div>
          <div className="comments">
            <Comments item={this.state.id} comments={this.state.comments}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Card;
