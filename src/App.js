import { Client } from 'boardgame.io/react';
import { ForbiddenDesert } from './Game';
import { SocketIO } from 'boardgame.io/multiplayer';

const ForbiddenDesertClient = Client({
  game: ForbiddenDesert,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
});

const App = () => (
  <div>
    <ForbiddenDesertClient playerID="0" />
    <ForbiddenDesertClient playerID="1" />
  </div>
);


export default App;