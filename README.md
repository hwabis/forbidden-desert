# forbidden-desert
WIP:
* Roles: climber, navigator
* Equipment (from gear + tunnel tiles)
* Display win/loss

Play here: https://hwabis.github.io/forbidden-desert/

Created with [boardgame.io](https://boardgame.io/) and React; based off of Gamewright's Forbidden Desert board game.

Tile art source: various maps from https://maplestory.wiki/

## Rules
The official rules are [here](https://www.gamewright.com/gamewright/pdfs/Rules/ForbiddenDesertTM-RULES.pdf). This version has slight changes:

### Makes the game harder than the original:
* Players may only take moves on their own turns. (No using items or giving water during other players' turns)
* Storm cards are not drawn from a deck, but randomly generated independently each turn.
  * To compensate for this, the chance of Sun Beats Down is 10% instead of 12.9%, and Storm Picks Up to 7.5% instead of 9.7%
  * Meteorologists can't peak at the next storm cards
  * Equipment is still drawn from a deck

### Makes the game easier than the original:
* Running out of sand markers is not a lose condition.
* You may have duplicate roles across different players. (Yes, a team of only Meteorologists would be a free win, but that wouldn't be very fun...)

### Increases game variance:
* Players can spawn on any tile, not just a regular equipment tile.
