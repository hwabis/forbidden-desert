import { INVALID_MOVE } from 'boardgame.io/core';

export const ForbiddenDesert = {
    setup: (ctx) => ({
        players: setupPlayers(ctx.numPlayers),
        tiles: Array(25).fill(tile),
    }),

    moves: {
        move: (G, ctx, pos) => {
            if (tileIsAdjacent(pos, G.players[ctx.currentPlayer].position)) {
                G.players[ctx.currentPlayer].position = pos;
            }
            else {
                return INVALID_MOVE;
            }
        },
    },

    turn: {
        moveLimit: 4,
    },
}; 

var setupPlayers = (numPlayers) => {
    var players = [];
    for (var i = 0; i < numPlayers; i++) {
        players.push({
            //TODO: REPLACE WITH HELICOPTER CRASH TILE POSITION
            position: 3,
        });
    }
    return players;
}

var tile = {
    isRevealed: false,
}

var tileIsAdjacent = (newPos, oldPos) => (newPos >= 0 && newPos <= 24 && 
    (newPos === oldPos - 1 || newPos === oldPos + 1 || 
        newPos === oldPos - 5 || newPos === oldPos + 5));