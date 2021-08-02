import React from "react";
import { Client } from 'boardgame.io/react';
import { ForbiddenDesert } from './Game';
import { ForbiddenDesertBoard } from './board';
import './App.css';

class App extends React.Component {
  state = { numPlayers: null };

  render() {
    if (this.state.numPlayers === null) {
      return (
        <div className="center">
          <div>
            !! THIS IS A WORK IN PROGRESS !!
          </div>
          <div id="title">
            FORBIDDEN DESERT
          </div>
          <div>
            Based off the original game designed by Gamewright.
          </div>
          <div>
            <a href="https://www.gamewright.com/gamewright/pdfs/Rules/ForbiddenDesertTM-RULES.pdf" target="_blank">Official rules manual</a>
          </div>
          <div>
            <a href="https://boardgamegeek.com/boardgame/136063/forbidden-desert" target="_blank">BoardGameGeek listing</a>
          </div>
          <div>
            <a href="https://github.com/hwabis/forbidden-desert" target="_blank">Source code</a>
          </div>
          <div id="header">
            <p>Select number of players:</p>
            <button onClick={() => this.setState({ numPlayers: 2 })}>
              2
            </button>
            <button onClick={() => this.setState({ numPlayers: 3 })}>
              3
            </button>
            <button onClick={() => this.setState({ numPlayers: 4 })}>
              4
            </button>
            <button onClick={() => this.setState({ numPlayers: 5 })}>
              5
            </button>
          </div>
        </div>
      );
    }
    else {
      const ForbiddenDesertClient = Client({
        game: ForbiddenDesert,
        numPlayers: this.state.numPlayers,
        board: ForbiddenDesertBoard,
      });
      return (
        <div>
          <ForbiddenDesertClient />
        </div>
      );
    }
  }
}

export default App;