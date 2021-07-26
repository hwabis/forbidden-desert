import React from 'react';
import './board.css';

export class ForbiddenDesertBoard extends React.Component {
    onClick(id) {
        if (this.validMove(id)){
            this.props.moves.move(id);
        }
    }
    validMove(id) {
        const currentPlayerPos = this.props.G.players[this.props.ctx.currentPlayer].position;
        const tileIsAdjacent = id >= 0 && id <= 24 && 
            (id === currentPlayerPos - 1 || id === currentPlayerPos + 1 || 
                id === currentPlayerPos - 5 || id === currentPlayerPos + 5);
        return tileIsAdjacent && !this.props.G.tiles[id].isStorm;
    }
    render() {
        var tbody = [];
        for (var i = 0; i < 5; i++) {
            var cells = [];
            for (var j = 0; j < 5; j++) {
                const id = 5 * i + j;
                var players = [];
                for (var k = 0; k < this.props.G.players.length; k++) {
                    if (this.props.G.players[k].position === id) {
                        players.push(k);
                    }
                }

                if (this.props.G.tiles[id].isStorm){
                    cells.push(
                        <td key={id} id="storm">
                        </td>
                    );
                }
                else if (this.props.G.tiles[id].sandCount > 0) {
                    cells.push(
                        <td key={id} onClick={() => this.onClick(id)}>
                            <div className="player-marker">{players}</div>
                            <div className={this.props.G.tiles[id].sandCount > 1 ? "sand-red" : "sand-black"}>
                                Sand: {this.props.G.tiles[id].sandCount}</div>
                        </td>
                    );
                }
                else {
                    cells.push(
                        <td key={id} onClick={() => this.onClick(id)}>
                            <div className="player-marker">{players}</div>
                        </td>
                    );
                }
            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }

        return (
            <div>
                <div className="center">
                    You are player: {this.props.playerID}
                </div>
                <div className="center">
                    Current player: {this.props.ctx.currentPlayer}
                </div>
                <div className="center">
                    Moves left in turn: {4 - this.props.ctx.numMoves}
                </div>
                <table id="board" className="center">
                    <tbody>{tbody}</tbody>
                </table>
            </div>
        );
    }
}
