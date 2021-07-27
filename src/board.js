import React from 'react';
import './board.css';

export class ForbiddenDesertBoard extends React.Component {
    state = {
        digging: false
    }

    onClick(id) {
        if (this.isAdjacentTile(id) || this.isSameTile(id)) {
            if (this.state.digging && this.props.G.tiles[id].sandCount > 0) {
                this.props.moves.dig(id);
                this.setState({digging: false});
            }
            else if (!this.isSameTile(id) && this.props.G.tiles[id].sandCount < 2 && !this.state.digging) {
                this.props.moves.move(id);
            }
        }
    }
    isAdjacentTile(id) {
        const currentPlayerPos = this.props.G.players[this.props.ctx.currentPlayer].position;
        return (id >= 0 && id <= 24 &&
            (id === currentPlayerPos - 1 || id === currentPlayerPos + 1 ||
                id === currentPlayerPos - 5 || id === currentPlayerPos + 5));
    }
    isSameTile(id) {
        return (id === this.props.G.players[this.props.ctx.currentPlayer].position);
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

                if (this.props.G.tiles[id].isStorm) {
                    cells.push(
                        <td key={id} id="storm">
                        </td>
                    );
                }
                else if (this.props.G.tiles[id].sandCount !== 0) {
                    var sandIndicator = "";
                    for (var l = 0; l < this.props.G.tiles[id].sandCount; l++) {
                        //we're gonna have a problem if sand ever goes above 18 lol
                        sandIndicator = sandIndicator.concat("/");
                    }
                    cells.push(
                        <td key={id} onClick={() => this.onClick(id)}>
                            <div className="player-marker">{players}</div>
                            <div className={this.props.G.tiles[id].sandCount > 1 ? "sand-red" : "sand-black"}>
                                Sand: {sandIndicator}</div>
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
                    <div>
                        Player {this.props.ctx.currentPlayer}'s turn
                    </div>
                    <div>
                        Moves left in turn: {4 - this.props.ctx.numMoves}
                    </div>
                </div>
                <table id="board" className="center">
                    <tbody>{tbody}</tbody>
                </table>
                <div className="center">
                    <button onClick={() => { this.setState({digging: !this.state.digging}); }}>
                        Dig
                    </button>
                    <div>
                        {this.state.digging ? "Choose a tile to dig." : ""}
                    </div>
                </div>
            </div>
        );
    }
}
