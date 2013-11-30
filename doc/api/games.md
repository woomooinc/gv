# Games API

## GET games/:id

- desc    : get game info
- action  : api/games#show
- req     :
- headers :

<!---->

    {
      "x-auth-token" : "AAAF5tgtfYZC0BAEwDZAZC8DhE6QOtzZB5laoPAy0XA1DadBZCW0dcq5"
    }

- params  :
- res     :
- status  : 200
- body    :

<!---->

    {
      "_id"     : "4fe9fa8d2aef4710b9000001",
      "players" : [{
        "_id"        : "4fe9fa8d2aef4710b9000001",
        "fb_id"      : "665040590",
        "name"       : "ben",
        "avatar"     : "//graph.facebook.com/me.ben.lin/picture",
        "buzz"       : 29,
        "position"   : 10,
        "created_at" : 1340734093017,
        "updated_at" : 1340734093017
      }],
      "events" : [{
        "_id"        : "4fe9fa8d2aef4710b9000001",
        "player_id"  : "4fe9fa8d2aef4710b9000001",
        "desc"       : "what ever this event is",
        "buss"       : -10,
        "url"        : "//greedyvalley.com/img/20120312/4e836c8ab7293cce08000002_o.jpg",
        "created_at" : 1340734093017,
        "updated_at" : 1340734093017
      }],
      "current_player" : "4fe9fa8d2aef4710b9000001",
      "end"            : true,
      "created_at"     : 1340734093017,
      "updated_at"     : 1340734093017
    }



## PUT games

- desc    : player waiting for game matching
- action  : api/games#create_or_update
- req     :
- headers :

<!---->

    {
      "x-auth-token" : "AAAF5tgtfYZC0BAEwDZAZC8DhE6QOtzZB5laoPAy0XA1DadBZCW0dcq5"
    }

- params :
- res    :
- status : 201
- body   :

<!---->

    {
      "_id"     : "4fe9fa8d2aef4710b9000001",
      "players" : [{
        "_id"        : "4fe9fa8d2aef4710b9000001",
        "fb_id"      : "665040590",
        "name"       : "ben",
        "avatar"     : "//graph.facebook.com/me.ben.lin/picture",
        "buzz"       : 29,
        "position"   : 10,
        "created_at" : 1340734093017,
        "updated_at" : 1340734093017
      }],
      "events" : [{
        "_id"        : "4fe9fa8d2aef4710b9000001",
        "player_id"  : "4fe9fa8d2aef4710b9000001",
        "desc"       : "what ever this event is",
        "buss"       : -10,
        "url"        : "//greedyvalley.com/img/20120312/4e836c8ab7293cce08000002_o.jpg",
        "created_at" : 1340734093017,
        "updated_at" : 1340734093017
      }],
      "current_player" : "4fe9fa8d2aef4710b9000001",
      "end"            : true,
      "created_at"     : 1340734093017,
      "updated_at"     : 1340734093017
    }



## PUT games/:id

- desc    : update the current user of the game
- action  : api/games#update
- req     :
- headers :

<!---->

    {
      "x-auth-token" : "AAAF5tgtfYZC0BAEwDZAZC8DhE6QOtzZB5laoPAy0XA1DadBZCW0dcq5"
    }

- params :
- res    :
- status : 200
- body   :

<!---->

    {
      "_id"     : "4fe9fa8d2aef4710b9000001",
      "players" : [{
        "_id"        : "4fe9fa8d2aef4710b9000001",
        "fb_id"      : "665040590",
        "name"       : "ben",
        "avatar"     : "//graph.facebook.com/me.ben.lin/picture",
        "buzz"       : 29,
        "position"   : 10,
        "created_at" : 1340734093017,
        "updated_at" : 1340734093017
      }],
      "events" : [{
        "_id"        : "4fe9fa8d2aef4710b9000001",
        "player_id"  : "4fe9fa8d2aef4710b9000001",
        "desc"       : "what ever this event is",
        "buss"       : -10,
        "url"        : "//greedyvalley.com/img/20120312/4e836c8ab7293cce08000002_o.jpg",
        "created_at" : 1340734093017,
        "updated_at" : 1340734093017
      }],
      "current_player" : "4fe9fa8d2aef4710b9000001",
      "end"            : true,
      "created_at"     : 1340734093017,
      "updated_at"     : 1340734093017
    }



## GET games/:id/watch

- desc    : watch for change of the game
- action  : api/games#watch
- req     :
- headers :

<!---->

    {
      "x-auth-token" : "AAAF5tgtfYZC0BAEwDZAZC8DhE6QOtzZB5laoPAy0XA1DadBZCW0dcq5"
    }

- params  :

<!---->

    {
      "type" : "game" // game || stroy
    }


- res     :
- status  : 200
- body    :

<!---->

    {
      "api"   : "games/:game_id",
      "data"  : {
        "game_id" : "4fe9fa8d2aef4710b9000001"
      },
      "changed" : {
        "player_id" : "4fe9fa8d2aef4710b9000001"
      }
    }

    {
      "api"   : "stories/:stroy_id",
      "data"  : {
        "stroy_id" : "4fe9fa8d2aef4710b9000001"
      }
    }
