// const equals = require('array-equal')
import React, { Component } from "react";
import PictureCard from "./components/PictureCard";
import Wrapper from "./components/Wrapper";
import cards from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    cards,
    clickedArray: [],
    topScore: 0,
    score: 0,
    message: "",
    shakeit: "false"
  };

  clickPicture = id => {
    // Arrange the pictures in random order
    const shuffledArray = this.shuffleArray(cards);
    this.setState({ cards: shuffledArray });
    // if clicked an image already clicked set this.state.score = 0; clickedArray, end of if block
    if (this.state.clickedArray.includes(id)) {
      this.setState({ score: 0, clickedArray: [], message: "Incorrect! Game Over!  Click an image to start again!", shakeit: "true" });
    } else {
      this.setState({
        clickedArray: this.state.clickedArray.concat([id]),
        score: this.state.score + 1,
        message: "Correct!",
        shakeit: "false"
      });
    }
    // set topscore = score if score>topscore.
    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
    }
    // shake the wrapper if shakeit is set to true
  }

  shuffleArray = (picturesArray) => {
    for (let i = picturesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [picturesArray[i], picturesArray[j]] = [picturesArray[j], picturesArray[i]]
    }
    return picturesArray;
  }

  // removeFriend = id => {
  //   // Filter this.state.friends for friends with an id not equal to the id being removed
  //   const filteredFriends = this.state.friends.filter(friend => friend.id !== id);
  //   // Set this.state.friends equal to the new friends array
  //   this.setState({ friends: filteredFriends });

  //   console.log("original friends: " + friends);
  //   console.log("filtered friends: " + filteredFriends);
  // };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to the Clicky Game!</h1>
          <h2 className="App-title">Created using React</h2>
        </header>
        <h3 className="App-intro">
          <strong>Click on an image to earn points, but don't click on any more than once!</strong>
          <p className="score"><strong>Score: {this.state.score} | TopScore: {this.state.topScore}</strong></p>
          <p className="message"><strong>{this.state.message}</strong></p>
        </h3>
        <Wrapper>
          shakeWrapper = {this.state.shakeit}
          pictures=
        {this.state.cards.map(picture => (
            <PictureCard
              clickPicture={this.clickPicture}
              id={picture.id}
              key={picture.id} // to get rid of unique key prop warning
              name={picture.name}
              image={picture.image}
            />
          ))}
        </Wrapper>
        <footer className="footer">
          <div className="container">
            <span className="text-muted">&copy;Candace - Clicky Game - React App</span>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;