// import React, {useState, useEffect } from 'react';
import React, { Component } from 'react';
import "../App.scss";
import Card from "./Card";
import ShareButton from "./ShareButton/ShareButton";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [], //10
      next: '', //next url
      previous: 0,
      page: 0, // current page
      prevCount: 0,
      currentCount: 0, // current number of already fetched-displayed users
      totalCount: 0, // current number of already fetched-displayed users
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
    .then(res => res.json())
    .then((data) => {
      console.log("initial fetch data :", data)
      this.setState((state)=>({ 
        people: data.results,
        next: data.next,
        previous: data.previous,
        prevCount: data.results.length,
        currentCount: data.results.length,
        totalCount: data.results.length,
        total: data.count,
        page: 1,
      }))
    })
    .catch("componentDidMount ERROR:", console.log);
    
  };


  // Functions
  handleNext(event) {
    event.preventDefault();
    fetch(this.state.next)
    // .then(resp => console.log(resp))
    .then(res => res.json())
    .then((data) => {
      this.setState((state)=>({ 
        people: data.results,
        next: data.next,
        previous: data.previous,
        // prevCount: this.state.prevCount,
        currentCount: data.results.length,
        totalCount: this.state.totalCount + data.results.length,
        page: this.state.page + 1,
      }))
    })
    .catch(error => {
      console.log("handleNext Error:" + error.message);
      window.location.reload();
    })
  }

  // await this.setState(state => ({
  //   comments: mergedComments,
  //   value: ''
  // }))

  handlePrevious(event) {
    event.preventDefault();
    fetch(this.state.previous)
    // .then(resp => console.log(resp))
    .then(res => res.json())
    .then((data) => {
      this.setState((state)=>({ 
        people: data.results,
        next: data.next,
        previous: data.previous,
        prevCount: this.state.prevCount,
        currentCount: this.state.people.length,
        totalCount: this.state.totalCount - this.state.people.length,
        page: this.state.page - 1,
      }))
    }).catch(error => {
      console.log("handlePrevious Error:" + error.message);
      window.location.reload();
    })
    // .catch("handlePrevious ERROR:", console.log);
  }


  render() {
    let cnt = (Math.ceil(this.state.totalCount/this.state.prevCount))*this.state.prevCount-this.state.prevCount; 
    // let cnt = this.state.currentCount;

    console.log( "this.state.totalCount : ",this.state.totalCount)
    console.log( "this.state.currentCount : ",this.state.currentCount)
    console.log( "this.state.People : ",this.state.people)
    console.log( "this.state.CNT : ",cnt)
    let i;
    return (
      <React.Fragment>
        <div className="cards">
          { 
            this.state.people.map((person, index) => (
              <React.Fragment key={index}>
                <Card date={person.created} number={index+cnt+1} key={index+77777} name={person.name} birth_year={person.birth_year} ></Card>
              </React.Fragment>
            ))
          }
        </div>
        <div className="navigation-cnt">
          <a className="codelink" target="_blank" href="https://github.com/ilyafefelov/StarWars-">Go to code</a>
          {this.state.page > 1 && 
            <button key={this.state.page+1} className='navigation-btn' onClick={this.handlePrevious}>
              Previous
            </button>
          }
          {this.state.totalCount < this.state.total && 
            <button key={this.state.page+1111} className='navigation-btn' onClick={this.handleNext}>
              Next
            </button>
          }
          <ShareButton></ShareButton>
        </div>
      </React.Fragment>
    );
  }
}

export default Cards;