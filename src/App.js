import React from "react";
import { Client } from 'boardgame.io/react';
import { ForbiddenDesert } from './Game';
import { ForbiddenDesertBoard } from './board';
import { SocketIO } from 'boardgame.io/multiplayer';

const ForbiddenDesertClient = Client({
  game: ForbiddenDesert,
  board: ForbiddenDesertBoard,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
});

class App extends React.Component {
  state = { playerID: null };

  render() {
    //TODO: change to automatically assign playerID?
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
        </div>
      );
    }
    return(
      <div>
      <ForbiddenDesertClient playerID={this.state.playerID} />
      </div>
    );
  }
}

export default App;