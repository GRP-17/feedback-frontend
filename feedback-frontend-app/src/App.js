import React from 'react';
import './App.css';

// used to display the rating as stars
import StarRatings from 'react-star-ratings';

// used for the ajax requests
const $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        rating: 5,
        text: '',
        characters: ''
    };

    //attaches the functions to this component so they can  access and update its state
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  // gets called when the rating changes and updates the state of the react component - from the star-rating module
  changeRating(newRating, name) {
      this.setState({
          rating: newRating
      });
  }

  // Handles any change to the textarea.... i.e. typing a new character - and updates the value stored in the react components state.
  handleChange(event) {
      var LocalCharacters = event.target.value.length;
      var LocalText = event.target.value

      if(LocalCharacters >= 5001) {
          alert("Your feedback can't be more than 5000 characters");
          return
      }
    this.setState({
        text: LocalText,
        characters: LocalCharacters + "/5000 characters"
    });
  }

  // gets called on hitting the submit button - validation and sends data to back-end
  handleSubmit(event) {
    event.preventDefault();
    //check rating
    if(this.state.rating < 1 || this.state.rating > 5) {
        alert('Rating must be between 1 and 5 stars: ' + this.state.rating);
        return
    }
    // check text length
    else if(this.state.text.length > 5000) {
        alert('Text must no more than 5000 characters: ' + this.state.text);
        return
    }

    //makes a call to the backend with the rating and text of the feedback
    $.ajax({
        url: 'https://feedback-analysis-grp-app.herokuapp.com/feedback',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            rating: this.state.rating,
            text: this.state.text
        }),
        success: (response) => {
            console.log(response);
        }
    });

  }

  // defines the html of the component
  render() {
    return (
      <form id='feedback-form' onSubmit={this.handleSubmit}>
          <div id='rating-container'>
              <StarRatings
                rating={this.state.rating}
                starRatedColor='rgb(230,67,47)'
                changeRating={this.changeRating}
                numberOfStars={5}
                name='rating'
                starDimension='30px'
              />
          </div>
          <div id='text-container'>
              <textarea rows='40' cols='50' value={this.state.text} onChange={this.handleChange}/>
          </div>
          <div>
              <p>{this.state.characters}</p>
          </div>
          <input id="submit-btn" type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
