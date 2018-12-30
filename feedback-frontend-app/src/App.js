import React from 'react';
import './App.css';
import StarRatings from 'react-star-ratings';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        rating: 5,
        text: '',
        characters: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  changeRating(newRating, name) {
      this.setState({
          rating: newRating
      });
  }

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

  handleSubmit(event) {
    alert('Rating: ' + this.state.rating + '\nText: ' + this.state.text);
    event.preventDefault();
  }

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
