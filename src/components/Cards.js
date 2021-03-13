// import React, {useState, useEffect } from 'react';
import React, { Component } from 'react';
import "../App.scss";
import Card from "./Card";
import fetchProgress from 'fetch-progress'; 


class Cards extends Component {
  // state = {
  //   people: []
  // }
  constructor(props) {
    super(props);
    this.state = {
      people: [], //10
      next: '', //next url
      previous: 0,
      page: 0, // current page
      currentCount: 0, // current number of already fetched-displayed users
      total: 0,
      progress: 0 // current number of already fetched-displayed users
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }
  
  // Life
  componentDidMount(){
    const self = this;
    console.log("mounted App")
    fetch('https://swapi.dev/api/people')
    // .then(
    //   fetchProgress({
    //     onProgress(progress) {
    //       self.setState({ progress })
    //       console.log("progress:", { progress });
    //     },
    //     onError(err) {
    //       console.log(err);
    //     },
    //   })
    // )
    .then(res => res.json())
    .then((data) => {
      console.log("initial fetch data :", data)
      this.setState({ 
        people: data.results,
        next: data.next,
        previous: data.previous,
        currentCount: data.results.length,
        total: data.count,
        page: 1,
      })
    })
    .catch("componentDidMount ERROR:", console.log);
    
  };


  // Functions
  handleNext() {
    fetch(this.state.next)
    .then(res => res.json())
    .then((data) => {
      this.setState({ 
        people: data.results,
        next: data.next,
        previous: data.previous,
        currentCount: (this.state.currentCount + data.results.length),
        page: this.state.page + 1,
      })
    })
    .catch("handleNext ERROR:", console.log);
  }

  handlePrevious() {
    fetch(this.state.previous)
    .then(res => res.json())
    .then((data) => {
      this.setState({ 
        people: data.results,
        next: data.next,
        previous: data.previous,
        currentCount: (this.state.currentCount - this.state.people.length),
        page: this.state.page - 1,
      })
    })
    .catch("handlePrevious ERROR:", console.log);
  }


  render() {
    let cnt = this.state.currentCount;
    let ln = this.state.people.length;
    let i;
    return (
      <React.Fragment>
        <div className="cards">
          { 
            this.state.people.map((person, index) => (
              <React.Fragment key={index}>
                <Card date={person.created} number={cnt + index-9} key={index} name={person.name} birth_year={person.birth_year} ></Card>
              </React.Fragment>
            ))
          }
        </div>
        <div className="navigation-cnt">
          {this.state.page > 1 && 
            <button onClick={this.handlePrevious}>
              Previous
            </button>
          }
          {this.state.currentCount < this.state.total && 
            <button onClick={this.handleNext}>
              Next
            </button>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default Cards;