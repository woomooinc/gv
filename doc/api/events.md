# Events API

## POST events

- desc    : create an event for the game
- action  : api/events#create
- req     :
- headers :

<!---->

    {
      "x-auth-token" : "AAAF5tgtfYZC0BAEwDZAZC8DhE6QOtzZB5laoPAy0XA1DadBZCW0dcq5"
    }

- params  :

<!---->

    {
      "title" : "IPO",
      "desc"  : "what ever this event is",
      "buzz"  : -10
    }

- res     :
- status  : 200
- body    :

<!---->

    {
      "_id"        : "4fe9fa8d2aef4710b9000001",
      "player_id"  : "4fe9fa8d2aef4710b9000001",
      "title"      : "IPO",
      "desc"       : "what ever this event is",
      "buzz"       : -10,
      "url"        : "//greedyvalley.com/img/20120312/4e836c8ab7293cce08000002_o.jpg",
      "created_at" : 1340734093017,
      "updated_at" : 1340734093017
    }
