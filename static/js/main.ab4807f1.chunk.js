(this["webpackJsonpforbidden-desert"]=this["webpackJsonpforbidden-desert"]||[]).push([[0],{55:function(e,t,s){},57:function(e,t,s){},93:function(e,t,s){"use strict";s.r(t);var r=s(1),i=s.n(r),a=s(48),n=s.n(a),l=s(3),o=s(4),c=s(5),p=s(6),h=s(49),u={setup:function(e){return{players:d(e.numPlayers),tiles:v(),stormLevel:0,numDraws:0,lastDrawType:[],collectedParts:[],turnEnded:!1}},moves:{move:function(e,t,s){e.players[t.currentPlayer].position=s},dig:function(e,t,s){"Archeologist"===e.players[t.currentPlayer].role?(e.tiles[s].sandCount-=2,e.tiles[s].sandCount<0&&(e.tiles[s].sandCount=0)):e.tiles[s].sandCount--},excavate:{move:function(e,t){var s=e.players[t.currentPlayer].position;if(e.tiles[s].isRevealed=!0,"well"===e.tiles[s].type)for(var r=0;r<e.players.length;r++)e.players[r].position===s&&(e.players[r].water+=2),e.players[r].water>e.players[r].maxWater&&(e.players[r].water=e.players[r].maxWater);else if("clue"===e.tiles[s].type){var i=!1;for(r=0;r<e.tiles.length;r++)e.tiles[r].isRevealed&&"clue"===e.tiles[r].type&&r!==s&&e.tiles[r].part===e.tiles[s].part&&(i=!0);if(i){var a,n,l=e.tiles[s].part;for(r=0;r<e.tiles.length;r++)e.tiles[r].part===l&&"h"===e.tiles[r].pos&&(a=r),e.tiles[r].part===l&&"v"===e.tiles[r].pos&&(n=r);for(;a%5!==0&&a>=0;)a-=1;var o=a+n%5;e.tiles[o].finalParts.push(l)}}},undoable:!1},giveWater:{move:function(e,t,s){e.players[t.currentPlayer].water-=1,e.players[s].water+=1},noLimit:!0},pickUpFinalPart:function(e,t){var s=e.tiles[e.players[t.currentPlayer].position].finalParts[0];e.tiles[e.players[t.currentPlayer].position].finalParts.splice(0,1),e.collectedParts.push(s)},mitigate:function(e,t){e.numDraws-=1},collectWater:function(e,t){e.players[t.currentPlayer].water+=2,e.players[t.currentPlayer].water>e.players[t.currentPlayer].maxWater&&(e.players[t.currentPlayer].water=e.players[t.currentPlayer].maxWater)},doNothing:function(e,t){t.events.endTurn()},setPlayerInfo:{move:function(e,t,s,r){e.players[s].role=r,"Archeologist"===r||"Climber"===r?(e.players[s].maxWater=3,e.players[s].water=3):"Explorer"===r||"Meteorologist"===r||"Navigator"===r?(e.players[s].maxWater=4,e.players[s].water=4):(e.players[s].maxWater=5,e.players[s].water=5)},undoable:!1,noLimit:!0},setDifficulty:{move:function(e,t,s){e.stormLevel=s,e.numDraws=0===s?2:3},undoable:!1,noLimit:!0},removeWater:{move:function(e,t,s){e.players[s].water-=1},noLimit:!0},placeFinalPart:{move:function(e,t,s){e.tiles[s].finalParts.push("Z")},noLimit:!0}},turn:{moveLimit:4,onBegin:function(e,t){e.turnEnded=!1},onEnd:function(e,t){if(!e.turnEnded){e.lastDrawType=[];for(var s=0;s<e.numDraws;s++){var r=t.random.Die(31);if(r<=4){for(var i=0;i<e.players.length;i++)"tunnel"===e.tiles[e.players[i].position].type&&e.tiles[e.players[i].position].isRevealed||(e.players[i].water-=1);e.lastDrawType.push("Sun Beats Down")}else if(r<=7)e.stormLevel+=1,e.lastDrawType.push("Storm Picks Up");else{for(var a=0;a<e.tiles.length&&"storm"!==e.tiles[a].type;a++);var n,l=t.random.Die(4),o=t.random.Die(6);n=o<=3?1:o<=5?2:3;var c=[],p=a;if(1===l)for(;c.length<n&&(p+=5)>=0&&p<=24;)c.push(p);else if(2===l)for(;c.length<n&&(p+=1)>=0&&p<=24&&Math.floor(p/5)===Math.floor(a/5);)c.push(p);else if(3===l)for(;c.length<n&&(p-=5)>=0&&p<=24;)c.push(p);else if(4===l)for(;c.length<n&&(p-=1)>=0&&p<=24&&Math.floor(p/5)===Math.floor(a/5);)c.push(p);for(i=0;i<c.length;i++)e.tiles[c[i]].sandCount+=1;var h=e.tiles[a],u=a;if(c.length>0){for(i=0;i<e.tiles[a].finalParts.length;i++)e.tiles[c[0]].finalParts.push(e.tiles[a].finalParts[i]);e.tiles[a].finalParts=[]}for(i=0;i<c.length;i++)e.tiles[u]=e.tiles[c[i]],u=c[i];0!==c.length&&(e.tiles[c[c.length-1]]=h);var d,j=[];for(i=0;i<e.players.length;i++)for(var v=0;v<c.length;v++)e.players[i].position===c[v]&&j.push(i);for(i=0;i<j.length;i++)1===l?e.players[j[i]].position-=5:2===l?e.players[j[i]].position-=1:3===l?e.players[j[i]].position+=5:4===l&&(e.players[j[i]].position+=1);1===l?d="up":2===l?d="left":3===l?d="down":4===l&&(d="right"),e.lastDrawType.push("Wind: "+d+", strength "+n)}}0===e.stormLevel?e.numDraws=2:2===t.numPlayers?e.stormLevel<=3?e.numDraws=3:e.stormLevel<=7?e.numDraws=4:e.stormLevel<=10?e.numDraws=5:e.numDraws=6:3===t.numPlayers||4===t.numPlayers?e.stormLevel<=4?e.numDraws=3:e.stormLevel<=8?e.numDraws=4:e.stormLevel<=11?e.numDraws=5:e.numDraws=6:5===t.numPlayers&&(e.stormLevel<=5?e.numDraws=3:e.stormLevel<=9?e.numDraws=4:e.stormLevel<=12?e.numDraws=5:e.numDraws=6),e.turnEnded=!0}}},endIf:function(e,t){for(var s=0;s<e.players.length;s++)if(e.players[s].water<0)return!0;return 2===t.numPlayers&&13===e.stormLevel||(3===t.numPlayers||4===t.numPlayers)&&14===e.stormLevel||5===t.numPlayers&&15===e.stormLevel}},d=function(e){for(var t=[],s=j(25);12===s;)s=j(25);for(var r=0;r<e;r++)t.push({role:"",position:s,water:0,maxWater:0});return t};function j(e){return Math.floor(Math.random()*e)}var v=function(){for(var e=[],t=0;t<2;t++)e.push({isRevealed:!1,sandCount:0,type:"well",finalParts:[]});e.push({isRevealed:!1,sandCount:0,type:"mirage",finalParts:[]});for(t=0;t<9;t++)e.push({isRevealed:!1,sandCount:0,type:"gear",finalParts:[]});for(t=0;t<3;t++)e.push({isRevealed:!1,sandCount:0,type:"tunnel",finalParts:[]});for(t=0;t<4;t++)for(var s=0;s<2;s++){var r,i;0===t?r="A":1===t?r="B":2===t?r="C":3===t&&(r="D"),0===s?i="h":1===s&&(i="v"),e.push({isRevealed:!1,sandCount:0,type:"clue",part:r,pos:i,finalParts:[]})}e.push({isRevealed:!1,sandCount:0,type:"launchpad",finalParts:[]}),function(e){var t,s=e.length;for(;0!==s;){t=Math.floor(Math.random()*s),s--;var r=[e[t],e[s]];e[s]=r[0],e[t]=r[1]}}(e),e.splice(12,0,{isRevealed:!1,sandCount:0,type:"storm",finalParts:[]});var a=[2,6,8,10,14,16,18,22];for(t=0;t<a.length;t++)e[a[t]].sandCount=1;return e};s(55);var f=s(0),y=function(e){Object(c.a)(s,e);var t=Object(p.a)(s);function s(){var e;Object(l.a)(this,s);for(var r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];return(e=t.call.apply(t,[this].concat(i))).state={assignID:0,assignDifficulty:!1,digging:!1,givingWater:!1,excavateErrorMsg:"",waterErrorMsg:""},e}return Object(o.a)(s,[{key:"assignRoleTo",value:function(e,t){this.props.moves.setPlayerInfo(e,t),this.setState({assignID:this.state.assignID+1})}},{key:"assignDifficultyTo",value:function(e){this.props.moves.setDifficulty(e),this.setState({assignDifficulty:!0})}},{key:"onClickTile",value:function(e){this.isBuried()?this.isSameTile(e)&&this.state.digging&&this.props.G.tiles[e].sandCount>0&&(this.props.moves.dig(e),this.setState({digging:!1})):this.isAdjacentTile(e)||this.isSameTile(e)||this.isDiagonalTile(e)&&"Explorer"===this.props.G.players[this.props.ctx.currentPlayer].role?this.state.digging&&this.props.G.tiles[e].sandCount>0?(this.props.moves.dig(e),this.setState({digging:!1})):!this.isSameTile(e)&&this.props.G.tiles[e].sandCount<2&&!this.state.digging&&this.props.moves.move(e):"tunnel"===this.props.G.tiles[e].type&&this.props.G.tiles[e].isRevealed&&"tunnel"===this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].type&&this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed&&this.props.G.tiles[e].sandCount<2&&!this.state.digging&&this.props.moves.move(e)}},{key:"excavate",value:function(){this.props.moves.excavate()}},{key:"giveWaterTo",value:function(e){this.props.moves.giveWater(e),this.setState({givingWater:!1})}},{key:"pickUpFinalPart",value:function(){this.props.moves.pickUpFinalPart()}},{key:"mitigate",value:function(){this.props.G.numDraws>0&&this.props.moves.mitigate()}},{key:"collectWater",value:function(){this.props.moves.collectWater()}},{key:"isAdjacentTile",value:function(e){var t=this.props.G.players[this.props.ctx.currentPlayer].position,s=e>=0&&e<=24&&(e===t-1||e===t+1||e===t-5||e===t+5);return e===t-1||e===t+1?Math.floor(e/5)===Math.floor(t/5):s}},{key:"isSameTile",value:function(e){return e===this.props.G.players[this.props.ctx.currentPlayer].position}},{key:"isDiagonalTile",value:function(e){var t=this.props.G.players[this.props.ctx.currentPlayer].position,s=e>=0&&e<=24&&(e===t-6||e===t-4||e===t+4||e===t+6),r=1===Math.abs(Math.floor(e/5)-Math.floor(t/5));return s&&r}},{key:"tileIsMovable",value:function(e){return!this.isBuried()&&((this.isAdjacentTile(e)||"Explorer"===this.props.G.players[this.props.ctx.currentPlayer].role&&this.isDiagonalTile(e)||"tunnel"===this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].type&&this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed&&"tunnel"===this.props.G.tiles[e].type&&this.props.G.tiles[e].isRevealed)&&!this.isSameTile(e)&&this.props.G.tiles[e].sandCount<2&&!this.state.digging&&!this.isBuried())}},{key:"tileIsDiggable",value:function(e){return this.isBuried()?this.isSameTile(e)&&this.state.digging&&this.props.G.tiles[e].sandCount>0:(this.isAdjacentTile(e)||this.isSameTile(e)||"Explorer"===this.props.G.players[this.props.ctx.currentPlayer].role&&this.isDiagonalTile(e))&&this.state.digging&&this.props.G.tiles[e].sandCount>0}},{key:"isBuried",value:function(){return this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].sandCount>1}},{key:"render",value:function(){var e=this;if(this.state.assignID<this.props.ctx.numPlayers)return Object(f.jsxs)("div",{className:"center",children:[Object(f.jsx)("div",{id:"title",children:"Role Selection"}),Object(f.jsxs)("div",{className:"header",children:["Choose role for Player ",this.state.assignID,":"]}),Object(f.jsx)("p",{}),Object(f.jsxs)("div",{children:[Object(f.jsx)("button",{onClick:function(){e.assignRoleTo(e.state.assignID,"Archeologist")},children:"Archeologist"}),Object(f.jsx)("button",{onClick:function(){e.assignRoleTo(e.state.assignID,"Climber")},children:"Climber"}),Object(f.jsx)("button",{onClick:function(){e.assignRoleTo(e.state.assignID,"Explorer")},children:"Explorer"}),Object(f.jsx)("button",{onClick:function(){e.assignRoleTo(e.state.assignID,"Meteorologist")},children:"Meteorologist"}),Object(f.jsx)("button",{onClick:function(){e.assignRoleTo(e.state.assignID,"Navigator")},children:"Navigator"}),Object(f.jsx)("button",{onClick:function(){e.assignRoleTo(e.state.assignID,"Water Carrier")},children:"Water Carrier"})]}),Object(f.jsx)("p",{}),Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{id:"header",children:"Archeologist (\ud83c\udf7c3)"}),Object(f.jsx)("ul",{children:Object(f.jsx)("li",{children:"Removes 2 sand when digging instead of 1."})})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{id:"header",children:"Climber (\ud83c\udf7c3)"}),Object(f.jsxs)("ul",{children:[Object(f.jsx)("li",{children:"Carry: moves other players along with Climber. (Cost: free)"}),Object(f.jsx)("li",{children:"Can move over tiles with 2 or more sand."}),Object(f.jsx)("li",{children:"Allows all players on Climber's current tile to leave even with 2 or more sand."})]})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{id:"header",children:"Explorer (\ud83c\udf7c4)"}),Object(f.jsx)("ul",{children:Object(f.jsx)("li",{children:"Can move, dig, and use items diagonally."})})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{id:"header",children:"Meteorologist (\ud83c\udf7c4)"}),Object(f.jsx)("ul",{children:Object(f.jsx)("li",{children:"Mitigate: draw 1 less Storm at the end of the turn. (Cost: 1 action)"})})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{id:"header",children:"Navigator (\ud83c\udf7c4)"}),Object(f.jsx)("ul",{children:Object(f.jsx)("li",{children:"Navigate: move another player up to 3 tiles. Climber and Explorer keep their abilities. (Cost: 1 action)"})})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{id:"header",children:"Water Carrier (\ud83c\udf7c5)"}),Object(f.jsxs)("ul",{children:[Object(f.jsx)("li",{children:"Collect Water: take 2 water from an excavated well. (Cost: 1 action)"}),Object(f.jsx)("li",{children:"Can give water to adjacent players (for free)."})]})]})]})]});if(!1===this.state.assignDifficulty)return Object(f.jsxs)("div",{className:"center",children:[Object(f.jsx)("div",{id:"title",children:"Difficulty Selection"}),Object(f.jsx)("p",{}),Object(f.jsxs)("div",{children:[Object(f.jsx)("button",{onClick:function(){e.assignDifficultyTo(0)},children:"Novice"}),Object(f.jsx)("button",{onClick:function(){e.assignDifficultyTo(1)},children:"Normal"}),Object(f.jsx)("button",{onClick:function(){e.assignDifficultyTo(2)},children:"Elite"}),Object(f.jsx)("button",{onClick:function(){e.assignDifficultyTo(3)},children:"Legendary"})]}),Object(f.jsx)("p",{}),Object(f.jsx)("div",{children:"(Difficulty sets the starting storm level.)"})]});for(var t=new Array(25).fill(" ").map((function(t,s,r){return e.state.digging&&e.tileIsDiggable(s)?"".concat(t," diggable"):"".concat(t)})).map((function(t,s,r){return!e.state.digging&&e.tileIsMovable(s)?"".concat(t," movable"):"".concat(t)})),s=[],r=0;r<5;r++){for(var i=[],a=function(){l=[];var s=5*r+n;if("storm"===e.props.G.tiles[s].type)e.props.G.tiles[s].finalParts.length>0&&l.push(Object(f.jsxs)("div",{className:"final-part",children:["Parts: ",e.props.G.tiles[s].finalParts]})),i.push(Object(f.jsx)("td",{className:"storm",children:l}));else{for(o=[],c=0;c<e.props.G.players.length;c++)e.props.G.players[c].position===s&&o.push(c);if(l.push(Object(f.jsx)("div",{className:"player",children:o})),0!==e.props.G.tiles[s].sandCount){for(p="",h=0;h<e.props.G.tiles[s].sandCount;h++)p=p.concat("l");l.push(Object(f.jsx)("div",{className:e.props.G.tiles[s].sandCount>1?"sand red":"sand",children:p}))}if(e.props.G.tiles[s].finalParts.length>0&&l.push(Object(f.jsxs)("div",{className:"final-part",children:["Parts: ",e.props.G.tiles[s].finalParts]})),!1===e.props.G.tiles[s].isRevealed)i.push(Object(f.jsx)("td",{className:("well"===e.props.G.tiles[s].type||"mirage"===e.props.G.tiles[s].type?"unrevealed-water":"unrevealed")+t[s],onClick:function(){return e.onClickTile(s)},children:l},s));else if("clue"===e.props.G.tiles[s].type){var a=e.props.G.tiles[s].part+e.props.G.tiles[s].pos+t[s];i.push(Object(f.jsx)("td",{className:a+t[s],onClick:function(){return e.onClickTile(s)},children:l},s))}else i.push(Object(f.jsx)("td",{className:e.props.G.tiles[s].type+t[s],onClick:function(){return e.onClickTile(s)},children:l},s))}},n=0;n<5;n++){var l,o,c,p,h;a()}s.push(Object(f.jsx)("tr",{children:i},r))}var u=[];if(this.isBuried()&&u.push(Object(f.jsx)("div",{children:"You are buried!"})),u.push(Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{children:this.state.digging?"Choose a tile to dig.":""}),Object(f.jsx)("button",{onClick:function(){e.setState({digging:!e.state.digging})},children:"Dig"}),Object(f.jsx)("button",{onClick:function(){!0===e.props.G.tiles[e.props.G.players[e.props.ctx.currentPlayer].position].isRevealed?(e.setState({excavateErrorMsg:"This tile is already revealed!"}),setTimeout((function(){return e.setState({excavateErrorMsg:""})}),3e3)):0!==e.props.G.tiles[e.props.G.players[e.props.ctx.currentPlayer].position].sandCount?(e.setState({excavateErrorMsg:"Remove all sand on this tile before excavating!"}),setTimeout((function(){return e.setState({excavateErrorMsg:""})}),3e3)):e.excavate()},children:"Excavate"})]})),u.push(Object(f.jsx)("div",{children:this.state.excavateErrorMsg})),u.push(Object(f.jsx)("button",{onClick:function(){e.setState({givingWater:!e.state.givingWater})},children:"Give water to:"})),this.state.givingWater){var d=!1,j=function(){var t=r;"",t!=e.props.ctx.currentPlayer&&(e.isSameTile(e.props.G.players[t].position)||"Water Carrier"===e.props.G.players[e.props.ctx.currentPlayer].role&&e.isAdjacentTile(e.props.G.players[t].position))&&(u.push(Object(f.jsxs)("button",{onClick:function(){0===e.props.G.players[e.props.ctx.currentPlayer].water?(e.setState({givingWater:!1,waterErrorMsg:"You don't have enough water!"}),setTimeout((function(){return e.setState({waterErrorMsg:""})}),3e3)):e.props.G.players[t].water===e.props.G.players[t].maxWater?(e.setState({givingWater:!1,waterErrorMsg:"Target has full water!"}),setTimeout((function(){return e.setState({waterErrorMsg:""})}),3e3)):e.giveWaterTo(t)},children:["Player ",t]})),d=!0)};for(r=0;r<this.props.G.players.length;r++){j()}d||("Water Carrier"===this.props.G.players[this.props.ctx.currentPlayer].role?this.setState({givingWater:!1,waterErrorMsg:"No players to give water to! (They must be on the same or an adjacent tile.)"}):this.setState({givingWater:!1,waterErrorMsg:"No players to give water to! (They must be on the same tile.)"}),setTimeout((function(){return e.setState({waterErrorMsg:""})}),3e3))}u.push(Object(f.jsx)("div",{children:this.state.waterErrorMsg})),"Meteorologist"===this.props.G.players[this.props.ctx.currentPlayer].role&&u.push(Object(f.jsx)("button",{onClick:function(){e.mitigate()},children:"Mitigate"})),"Water Carrier"===this.props.G.players[this.props.ctx.currentPlayer].role&&"well"===this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].type&&this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed&&this.props.G.players[this.props.ctx.currentPlayer].water<this.props.G.players[this.props.ctx.currentPlayer].maxWater&&u.push(Object(f.jsx)("button",{onClick:function(){e.collectWater()},children:"Collect water"})),this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed&&this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].finalParts.length>0&&u.push(Object(f.jsx)("button",{onClick:function(){e.pickUpFinalPart()},children:"Pick up part"})),u.push(Object(f.jsxs)("div",{children:[Object(f.jsx)("button",{onClick:function(){e.props.undo()},children:"Undo"}),Object(f.jsx)("button",{onClick:function(){e.props.moves.doNothing()},children:"Do nothing"})]}));var v=[];v.push(Object(f.jsx)("div",{children:"Players:"}));var y=[];for(r=0;r<this.props.ctx.numPlayers;r++)y.push(Object(f.jsxs)("div",{children:[r," - ",this.props.G.players[r].role," \ud83c\udf7c ",this.props.G.players[r].water," / ",this.props.G.players[r].maxWater]}));v.push(y),v.push(Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{}),Object(f.jsxs)("div",{children:["Current storm level: ",this.props.G.stormLevel]}),Object(f.jsx)("p",{})]})),v.push(Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{}),"End of last turn:"]}));for(r=0;r<this.props.G.lastDrawType.length;r++)v.push(Object(f.jsx)("div",{children:this.props.G.lastDrawType[r]}));var g,b,m,x,O,P=[];for(r=0;r<this.props.G.collectedParts.length;r++){var w;"A"===this.props.G.collectedParts[r]?w="red":"B"===this.props.G.collectedParts[r]?w="green":"C"===this.props.G.collectedParts[r]?w="blue":"D"===this.props.G.collectedParts[r]&&(w="purple"),P.push(Object(f.jsx)("div",{className:w,children:this.props.G.collectedParts[r]}))}return 0===this.props.G.collectedParts.length?v.push(Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{}),"Collected parts (4 total): none"]})):v.push(Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{}),"Collected parts (4 total): ",P]})),2===this.props.ctx.numPlayers?(g="1 - 3",b="4 - 7",m="8 - 10",x="11 - 12",O="13"):3===this.props.ctx.numPlayers||4===this.props.ctx.numPlayers?(g="1 - 4",b="5 - 8",m="9 - 11",x="12 - 13",O="14"):5===this.props.ctx.numPlayers&&(g="1 - 5",b="6 - 9",m="10 - 12",x="13 - 14",O="15"),v.push(Object(f.jsxs)("div",{className:"small",children:[Object(f.jsx)("p",{}),Object(f.jsx)("div",{children:"Draw 2 at storm level 0"}),Object(f.jsxs)("div",{children:["Draw 3 at levels ",g]}),Object(f.jsxs)("div",{children:["Draw 4 at levels ",b]}),Object(f.jsxs)("div",{children:["Draw 5 at levels ",m]}),Object(f.jsxs)("div",{children:["Draw 6 at levels ",x]}),Object(f.jsxs)("div",{children:["Game over at level ",O]}),Object(f.jsx)("p",{}),Object(f.jsx)("div",{children:"Chance of Sun Beats Down: 12.9%"}),Object(f.jsx)("div",{children:"Chance of Storm Picks Up: 9.7%"}),Object(f.jsx)("p",{}),Object(f.jsx)("div",{children:"Archeologist: removes 2 sand when digging"}),Object(f.jsx)("div",{children:"Climber: move over any tile; allows everyone on current tile to move. Ability: Carry (free)"}),Object(f.jsx)("div",{children:"Explorer: move, dig, and use items diagonally"}),Object(f.jsx)("div",{children:"Meteorologist: Ability: Mitigate (cost: 1 action)"}),Object(f.jsx)("div",{children:"Navigator: Ability: Navigate (cost: 1 action)"}),Object(f.jsx)("div",{children:"Water Carrier: give water to adjacent players. Ability: Collect 2 Water from well (free)"})]})),Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{className:"fl",children:[Object(f.jsxs)("div",{className:"header center",children:[Object(f.jsxs)("div",{children:["Player ",this.props.ctx.currentPlayer,"'s turn"]}),Object(f.jsxs)("div",{children:["Actions left in turn: ",4-this.props.ctx.numMoves]})]}),Object(f.jsx)("table",{children:Object(f.jsx)("tbody",{children:s})}),Object(f.jsx)("div",{className:"center",children:u})]}),Object(f.jsx)("div",{className:"fl",children:v})]})}}]),s}(i.a.Component),g=(s(57),function(e){Object(c.a)(s,e);var t=Object(p.a)(s);function s(){var e;Object(l.a)(this,s);for(var r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];return(e=t.call.apply(t,[this].concat(i))).state={numPlayers:null},e}return Object(o.a)(s,[{key:"render",value:function(){var e=this;if(null===this.state.numPlayers)return Object(f.jsxs)("div",{className:"center",children:[Object(f.jsx)("div",{children:"!! THIS IS A WORK IN PROGRESS !!"}),Object(f.jsx)("div",{id:"title",children:"FORBIDDEN DESERT"}),Object(f.jsx)("div",{children:"Based off the original game designed by Gamewright."}),Object(f.jsx)("div",{children:Object(f.jsx)("a",{href:"https://www.gamewright.com/gamewright/pdfs/Rules/ForbiddenDesertTM-RULES.pdf",children:"Official rules manual"})}),Object(f.jsx)("div",{children:Object(f.jsx)("a",{href:"https://boardgamegeek.com/boardgame/136063/forbidden-desert",children:"BoardGameGeek listing"})}),Object(f.jsx)("div",{children:Object(f.jsx)("a",{href:"https://github.com/hwabis/forbidden-desert",children:"Source code"})}),Object(f.jsxs)("div",{id:"header",children:[Object(f.jsx)("p",{children:"Select number of players:"}),Object(f.jsx)("button",{onClick:function(){return e.setState({numPlayers:2})},children:"2"}),Object(f.jsx)("button",{onClick:function(){return e.setState({numPlayers:3})},children:"3"}),Object(f.jsx)("button",{onClick:function(){return e.setState({numPlayers:4})},children:"4"}),Object(f.jsx)("button",{onClick:function(){return e.setState({numPlayers:5})},children:"5"})]})]});var t=Object(h.a)({game:u,numPlayers:this.state.numPlayers,board:y});return Object(f.jsx)("div",{children:Object(f.jsx)(t,{})})}}]),s}(i.a.Component));n.a.render(Object(f.jsx)(i.a.StrictMode,{children:Object(f.jsx)(g,{})}),document.getElementById("root"))}},[[93,1,2]]]);
//# sourceMappingURL=main.ab4807f1.chunk.js.map