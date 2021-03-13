import React from "react";

export default class Comments extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
          <div className="comment">
            {this.props.comment}
          </div>
      );
    }
  }