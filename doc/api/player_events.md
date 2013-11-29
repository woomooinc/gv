# Events API

## GET players/:play_id/events/:id

- desc    : get the event detail for the specific player
- action  : api/player_events#show
- req     :
- headers :

<!---->

    {
      "fb_token" : "AAAF5tgtfYZC0BAEwDZAZC8DhE6QOtzZB5laoPAy0XA1DadBZCW0dcq5
    }

- params  :
- res     :
- status  : 200
- body    :

<!---->

    {
      "_id"        : "4fe9fa8d2aef4710b9000001",
      "player_id"  : "4fe9fa8d2aef4710b9000001", // creator
      "player"     : {
        "_id"        : "4fe9fa8d2aef4710b9000001",
        "fb_id"      : "665040590",
        "name"       : "ben",
        "avatar"     : "//graph.facebook.com/me.ben.lin/picture",
        "buzz"       : 29,
        "position"   : 10,
        "created_at" : 1340734093017,
        "updated_at" : 1340734093017
      },
      "desc"       : "what ever this event is",
      "point"      : -10,
      "url"        : "//greedyvalley.com/img/20120312/4e836c8ab7293cce08000002_o.jpg",
      "created_at" : 1340734093017,
      "updated_at" : 1340734093017
    }
