import React, { Component } from "react";

export default class Comments extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      console.log(this.props.comment)
    }

    render() {
        return (
          <div className="comment">
            {this.props.comment}
          </div>
      );
    }
  }