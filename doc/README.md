# Game Flow

## Client

### POST   login/facebook

create a player account or login

### PUT    games

Find or create a game to join

### GET    games/:id/watch

Watch if anyone join the same game

### GET    games/:id

If anyone join the game the client will be notify to get the latest game info

### GET    games/:id/watch

Keep watching until there are 5 people in a game

### GET    games/:id

Update the latest game info again

### GET    games/:id/watch

If there is 5 people, start watch for people to send command

### PUT    games/:id

start playing, send command

### GET    histories/:id

get event histories

### GET    games/:id/watch

keep watching for histories

