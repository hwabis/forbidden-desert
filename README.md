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
* Storm cards are not drawn from a deck, but randomly generated independently each turn.
  * Meteorologists can't peak at the next storm cards
  * Equipment is still drawn from a deck
  * (Ideally, the deck would draw like the [critical strike algorithm](https://www.doranslab.gg/articles/crit-strike-algorithm.html) in other games, where the frequency of a certain event is more spaced out. Not sure how to implement in code, though...)

### Makes the game easier than the original:
* The chance of Sun Beats Down is 10% instead of 12.9%, and Storm Picks Up is 7.5% instead of 9.7%
* Running out of sand markers is not a lose condition.
* You may have duplicate roles across different players. (Yes, a team of only Meteorologists would be a free win, but that wouldn't be very fun...)

### Increases game variance:
* Players can spawn on any tile, not just a regular equipment tile.
