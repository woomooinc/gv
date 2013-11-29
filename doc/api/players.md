# Players API

## GET players/:id

- desc    : get player info
- action  : api/players#show
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
      "game_id"    : "4fe9fa8d2aef4710b9000001", // current game
      "fb_id"      : "665040590",
      "fb_token"   : "AAAF5tgtfYZC0BAEwDZAZC8DhE6QOtzZB5laoPAy0XA1DadBZCW0dcq5dTITtVevvhZAcoRNwPXbjy1g3aJZBUgPqqdpWvL1FyX5YHgTYPevvgZDZD", // only owner will get this
      "name"       : "ben",
      "email"      : "ben@gmail.com", // only owner will get this prop
      "avatar"     : "//graph.facebook.com/me.ben.lin/picture",
      "buzz"       : 29,
      "position"   : 10,
      "created_at" : 1340734093017,
      "updated_at" : 1340734093017
    }



## PUT players/:id

- desc    : update player info, ex : buzz, position
- action  : api/players#update
- req     :
- headers :

<!---->

    {
      "fb_token" : "AAAF5tgtfYZC0BAEwDZAZC8DhE6QOtzZB5laoPAy0XA1DadBZCW0dcq5
    }

- params :

<!---->

    {
      "name"     : "ben",
      "email"    : "ben@gmail.com",
      "buzz"     : 29,
      "position" : 10
    }

- res    :
- status : 201
- body   :

<!---->

    {
      "_id"        : "4fe9fa8d2aef4710b9000001",
      "game_id"    : "4fe9fa8d2aef4710b9000001", // current game
      "fb_id"      : "665040590",
      "fb_token"   : "AAAF5tgtfYZC0BAEwDZAZC8DhE6QOtzZB5laoPAy0XA1DadBZCW0dcq5dTITtVevvhZAcoRNwPXbjy1g3aJZBUgPqqdpWvL1FyX5YHgTYPevvgZDZD",
      "name"       : "ben",
      "email"      : "ben@gmail.com",
      "avatar"     : "//graph.facebook.com/me.ben.lin/picture",
      "buzz"       : 29,
      "position"   : 10,
      "created_at" : 1340734093017,
      "updated_at" : 1340734093017
    }
