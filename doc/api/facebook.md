# Facebook API

## GET login/facebook

- desc    : login with facebook
- action  : api/fb#new
- req     :
- headers :
- params  :
- res     :
- status  : 200
- body    :

<!---->

    {
      "_id"        : "4fe9fa8d2aef4710b9000001",
      "fb_id"      : "665040590",
      "fb_token"   : "AAAF5tgtfYZC0BAEwDZAZC8DhE6QOtzZB5laoPAy0XA1DadBZCW0dcq5dTITtVevvhZAcoRNwPXbjy1g3aJZBUgPqqdpWvL1FyX5YHgTYPevvgZDZD",
      "name"       : "ben",
      "email"      : "ben@gmail.com",
      "avatar"     : "//graph.facebook.com/me.ben.lin/picture",
      "created_at" : 1340734093017,
      "updated_at" : 1340734093017
    }



## POST login/facebook

- desc    : ask server fetch user data and login with facebook
- action  : api/fb#create
- req     :
- headers :
- params :

<!---->

    {
      "fb_id"    : "665040590",
      "fb_token" : "AAAF5tgtfYZC0BAEwDZAZC8DhE6QOtzZB5laoPAy0XA1DadBZCW0dcq5
    }

- res    :
- status : 201
- body   :

<!---->

    {
      "_id"        : "4fe9fa8d2aef4710b9000001",
      "fb_id"      : "665040590",
      "fb_token"   : "AAAF5tgtfYZC0BAEwDZAZC8DhE6QOtzZB5laoPAy0XA1DadBZCW0dcq5dTITtVevvhZAcoRNwPXbjy1g3aJZBUgPqqdpWvL1FyX5YHgTYPevvgZDZD",
      "name"       : "ben",
      "email"      : "ben@gmail.com",
      "avatar"     : "//graph.facebook.com/me.ben.lin/picture",
      "created_at" : 1340734093017,
      "updated_at" : 1340734093017
    }
