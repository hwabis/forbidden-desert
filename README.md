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

* Storm cards are not drawn from a deck, but randomly generated independently each turn
  * The probability of Sun Beats Down and Storm Picks Up depend on the history of storm deck draws
  * Consequently, Meteorologists can't "peak" at the next storm card
  * Equipment is still drawn from a deck
* Running out of sand markers is not a lose condition.
* You may have duplicate roles across different players (Yes, a team of only Meteorologists would be a free win, but that wouldn't be very fun...)
* Players can spawn on any tile, not just a regular equipment tile
