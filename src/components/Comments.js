import React, { Component } from "react";
import Comment from './Comment';




export default class Comments extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        item: 0,
        value: '',
        comments: [],
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      this.StateComments = JSON.parse(localStorage.getItem((`starWarsComments.${this.props.item}`)));
    }
    
    
    async handleRemove (key, event) {
      event.preventDefault();
      console.log(key)

      
      let oldComments = [];
      if (localStorage.getItem(`starWarsComments.${this.props.item}`)){
        oldComments = JSON.parse(localStorage.getItem(`starWarsComments.${this.props.item}`));
      }
      const filteredItems = oldComments.filter(item => item !== key)
      console.log('filteredItems', filteredItems)  
      
      let mergedComments = [...filteredItems];    
      console.log('mergedComments', mergedComments)  

      localStorage.setItem((`starWarsComments.${this.props.item}`), JSON.stringify(mergedComments));
      await this.setState(state => ({comments: mergedComments }))
      // await this.setState({comments: mergedComments })
    }
    
    handleChange (event) {
      this.setState({value: event.target.value});
    }
    
    async handleSubmit(event) {
      event.preventDefault();
      event.stopPropagation();

      let oldComments = [];
      if (localStorage.getItem(`starWarsComments.${this.props.item}`)){
        oldComments = JSON.parse(localStorage.getItem(`starWarsComments.${this.props.item}`));
      }
      // console.log('oldComments', oldComments)
      // this.setState({ 
      //   comments: oldComments,
      // })
      // console.log('setState.comments', this.state.comments)
      let newComment = this.state.value;      
      // console.log('newComment', newComment)
      let mergedComments = [...oldComments,newComment];      
      // console.log('mergedComments', mergedComments)
      localStorage.setItem((`starWarsComments.${this.props.item}`), JSON.stringify(mergedComments));
      // console.log("localStorage.comment:", JSON.parse(localStorage.getItem((`starWarsComments.${this.props.item}`))))
      
      // await this.setState({comments: mergedComments })
      await this.setState(state => ({
        comments: mergedComments,
        value: ''
      }))
      console.log("event.target.value 1",event.target.value )
      event.target.value = '';
      console.log("event.target.value 2",event.target.value )
      // console.log("END", this.state.comments)
      
    }
    
    componentDidMount() {
      this.setState({ 
        item: this.props.item 
      })
      
      if(this.StateComments && this.StateComments.length > 0) {
        this.setState({
          comments: this.StateComments
        });
        console.log("this.StateComments", Comments.StateComments);
        
      }
    }
    
    
    componentDidUpdate(prevProps, prevState) {
      let localStorageComments = JSON.parse(localStorage.getItem((`starWarsComments.${this.props.item}`)));

      if (this.props.item !== prevProps.item) {
        this.setState({ 
          item: this.props.item, //because we update item prop with a ID of a card. We use it to pul specific array of comments from local storage.
          comments: localStorageComments
        })
      }
      if (this.state.comments !== prevState.comments) {
        console.log("comments loaded")
      }

      if (localStorageComments){
          const index = localStorageComments.findIndex(fruit => fruit === "1");
          console.log("index of 1", index)
          // TODO: removing comments by index
      }

    }


    render() {
      

      return (
        <div className="comments">
          
          <form onSubmit={this.handleSubmit}>
            <label>
              Comment
              <input type="text" value={this.state.value} onChange={(event) => this.handleChange(event)} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <div>
            {this.state.comments && this.state.comments.map((com, index) => (
              <div className="comments-row">
                <Comment key={index} comment={com}></Comment>
                <button 
                onClick={(e) => this.handleRemove(com, e)}
                className="button-delete"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }
}