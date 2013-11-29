# Histories API

## GET histories/:id

- desc    : get the event detail for the specific player
- action  : api/histories#show
- req     :
- headers :

<!---->

    {
      "fb-token" : "AAAF5tgtfYZC0BAEwDZAZC8DhE6QOtzZB5laoPAy0XA1DadBZCW0dcq5"
    }

- params  :
- res     :
- status  : 200
- body    :

<!---->

    {
      "_id"        : "4fe9fa8d2aef4710b9000001",
      "game_id"    : "4fe9fa8d2aef4710b9000001",
      "player_id"  : {
        "_id"        : "4fe9fa8d2aef4710b9000001",
        "fb_id"      : "665040590",
        "name"       : "ben",
        "avatar"     : "//graph.facebook.com/me.ben.lin/picture",
        "created_at" : 1340734093017,
        "updated_at" : 1340734093017
      },
      "event_id"   : {
        "_id"        : "4fe9fa8d2aef4710b9000001",
        "player_id"  : "4fe9fa8d2aef4710b9000001",
        "title"      : "IPO",
        "desc"       : "what ever this event is",
        "point"      : -10,
        "url"        : "//greedyvalley.com/img/20120312/4e836c8ab7293cce08000002_o.jpg",
        "created_at" : 1340734093017,
        "updated_at" : 1340734093017
      },
      "dice"       : "IPO",
      "buzz"       : 89,
      "position"   : 22,
      "status"     : "end",
      "created_at" : 1340734093017,
      "updated_at" : 1340734093017
    }
