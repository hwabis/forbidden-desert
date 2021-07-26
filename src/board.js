import React from 'react';
import './board.css';

export class ForbiddenDesertBoard extends React.Component {
    onClick(id) {
        this.props.moves.move(id);
    }
    render() {
        var playersPos = [];
        for (var i = 0; i < this.props.G.players.length; i++) {
            playersPos.push(this.props.G.players[i].position);
        }
        var tbody = [];
        for (var i = 0; i < 5; i++) {
            var cells = [];
            for (var j = 0; j < 5; j++) {
                const id = 5 * i + j;
                var playerOnSquare = false;
                var k = 0;
                for (k; k < this.props.G.players.length; k++) {
                    if (this.props.G.players[k].position === id) {
                        playerOnSquare = true;
                        break;
                    }
                }
                if (playerOnSquare) {
                    cells.push(
                        <td key={id} onClick={() => this.onClick(id)}>
                            {k}
                        </td>
                    );
                }
                else {
                    cells.push(
                        <td key={id} onClick={() => this.onClick(id)}>
                        </td>
                    );
                }
            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }

        return (
            <div>
                <table id="board" className="center">
                    <tbody>{tbody}</tbody>
                </table>
            </div>
        );
    }
}
