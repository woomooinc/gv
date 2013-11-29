# Socket API

## GET socket

- desc    : get the event detail for the specific player
- action  : api/player_events#show
- req     :
- headers :

<!---->

    {
      "fb_token" : "AAAF5tgtfYZC0BAEwDZAZC8DhE6QOtzZB5laoPAy0XA1DadBZCW0dcq5
    }

- params  :

<!---->

    {
      "event" : "put games"
    }

    // put games -> wait for matching a game
    // get player event -> wait for any player to finish an action

- res     :
- status  : 200
- body    :

<!---->

    {
      "msg" : "games/4fe9fa8d2aef4710b9000001" // call this api
    }

    // games/4fe9fa8d2aef4710b9000001 -> response to wait for matching a game
    // players/4fe9fa8d2aef4710b9000001/events/4fe9fa8d2aef4710b9000001 -> response to wait for any player to finish an action
