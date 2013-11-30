(function (){
  var eventTemplates= [{
  "title" : "Something bad",
  "desc"  : "__PLAYER__ Co-founder quits the company",
  "buzz"  : -30
},
{
  "title" : "Something bad",
  "desc"  : "__PLAYER__ firing 50 more people this week",
  "buzz"  : 30
},
{
  "title" : "Something bad",
  "desc"  : "Kanye West suing __PLAYER__ Co-founder",
  "buzz"  : 10
},
{
  "title" : "Great news",
  "desc"  : "Ashton Kutcher join __PLAYER__ as an Engineer Now",
  "buzz"  : +50
},
{
  "title" : "Great news",
  "desc"  : "Justin Bieber be __PLAYER__'s Investor",
  "buzz"  : +10
},
{
  "title" : "Great news",
  "desc"  : "Jack Dorsey screwed his friends at Twitter",
  "buzz"  : +5
},
{
  "title" : "Great news",
  "desc"  : "Dave Morin laid off 20% of Path employees today",
  "buzz"  : +5
},
{
  "title" : "Something bad",
  "desc"  : "__PLAYER__'s CEO takes fire over All-Male board of directors",
  "buzz"  : -15
},
{
  "title" : "Something bad",
  "desc"  : "Ashton and Demi's Startup __PLAYER__ is as Dead as Their Marriage",
  "buzz"  : -10
},
{
  "title" : "Something bad",
  "desc"  : "Facebook's summer party, better than __PLAYER__",
  "buzz"  : -5
},
{
  "title" : "Something good",
  "desc"  : "Tumblr: Oops, we might have blown your password",
  "buzz"  : +10
},
{
  "title" : "Great news",
  "desc"  : "Silicon Valley's stupid name problem, visualized",
  "buzz"  : +5
},
{
  "title" : "Something bad",
  "desc"  : "Facebook, Google, __PLAYER__, and more giving your data directly to NSA ",
  "buzz"  : -10
},
{
  "title" : "Something bad",
  "desc"  : "__PLAYER__ Founders 'Swing for the Fences'?",
  "buzz"  : -10
},
{
  "title" : "Something bad",
  "desc"  : "__PLAYER__ Creative Director quits",
  "buzz"  : -15
},
{
  "title" : "Great news",
  "desc"  : "__PLAYER__ Founder posts $1.2 Million online banking screenshot",
  "buzz"  : +30
},
{
  "title" : "Great news",
  "desc"  : "Snapchat Leaked: This is your online nightmare",
  "buzz"  : +10
},
{
  "title" : "Something bad",
  "desc"  : "__PLAYER__ Email auto-replies of a Super VC",
  "buzz"  : 15
},
{
  "title" : "Great news",
  "desc"  : "Facebook CEO slammed 'Dumb' users who trusted him in college",
  "buzz"  : +15
},
{
  "title" : "Something bad",
  "desc"  : "__PLAYER__'s investor is totally gay, people'",
  "buzz"  : 100
},
{
  "title" : "Great news",
  "desc"  : "__PLAYER__ millionaire Snags a Victoria's Secret girlfriend",
  "buzz"  : +5
},
{
  "title" : "Something bad",
  "desc"  : "__PLAYER__'s engineer clean up the user deta'",
  "buzz"  : -40
}];

  var Player = function (name, avatar) {
    this.name = name;
    this.avatar = avatar;
    this.isWin = false;
    this.buzz = 60;
    this.position = 0;
  };

  Player.prototype.rollDice = function () {
    return ((Math.random() * 6 + 1) | 0);
  };

  Player.prototype.changeBuzz = function (point) {
    var newBuzz = Math.max(Math.min(this.buzz + point, 100), 0);
    this.buzz = newBuzz;
  };

  var GameEvent = function (name, message, action) {
    this.name = name;
    this.message = message;
    this.action = action;
  };

  var generateNormalEvent = function (name, message, effectPoint) {
    return new GameEvent(name, message, function (player) {
      player.changeBuzz(effectPoint);

      var verb = (function (point){
        if (point > 0) {
          return "上昇 " + point + " 點";
        }
        if (point < 0) {
          return "下降 " + -point + " 點";
        }
        return "沒有變化";
      })(effectPoint);

      return new AfterActionEvent(["__PLAYER__ 的 Buzz 值" + verb]);
    });
  };

  var generateFromDefEvent = function (defEvent, image) {
    var detail = {
        title: defEvent.title,
        desc: defEvent.desc,
        image: image
    };
    return new GameEvent(defEvent.title, "__PLAYER__ 遭遇 " + defEvent.title + " 事件！", function (player) {
      player.changeBuzz(defEvent.buzz);

      var verb = (function (point){
        if (point > 0) {
          return "上昇 " + point + " 點";
        }
        if (point < 0) {
          return "下降 " + -point + " 點";
        }
        return "沒有變化";
      })(defEvent.buzz);

      return new AfterActionEvent(["__PLAYER__ 的 Buzz 值" + verb], detail);
    });
  };

  var generateIPOEvent = function () {
    return new GameEvent("IPO", "__PLAYER__ 要嘗試 IPO 了！", function (player) {
      var buzzDownPoint = 20;

      if (player.buzz < 70) {
        var message = "投資人眾: __PLAYER__ 你這無名小卒，回去練個一百年再來 IPO 吧！";
        var message2 = "__PLAYER__ 的 IPO 失敗！ Buzz 降低 " + buzzDownPoint + "點";

        player.changeBuzz(-buzzDownPoint);

        return new AfterActionEvent([message, message2], {
          title: "IPO 失敗！",
          desc: "投資人眾: __PLAYER__ 你這無名小卒，回去練個一百年再來 IPO 吧！",
          image: "img/events/IPO-fail.jpg"
        });
      }

      var message = "投資人眾: 屌爆了！這就是我們要的(跪)";
      var message2 = "__PLAYER__ 惡名昭彰的 startup IPO 成功了！";
      return new AfterActionEvent([message, message2], {
        title: "IPO 成功！ Congratulations! おめでとう！ 축하해요！",
        desc: "投資人眾: 屌爆了！這就是我們要的(跪)",
        image: "img/events/IPO.jpg"
      }, true);
    });
  };

  var AfterActionEvent = function (messages, detail, isWin) {
    this.detail = detail;
    this.messages = messages;
    this.isWin = isWin === true;
  };

  var Game = function (players, events) {
    this.players = players;
    this.events = events;
    this.currentPlayerIndex = 0;
    this.isGameOver = false;
  };

  Game.prototype.playerAction = function () {
    if (this.isGameOver) {
      return;
    }
    var self = this;

    var actionBtn = selectGameViewport().querySelector(".action-btn");
    actionBtn.disabled = true;

    var player = this.players[this.currentPlayerIndex];
    var step = player.rollDice();

    var newPosition = (player.position + step) % this.getMapLength();
    player.position = newPosition;

    var steppedEvent = this.getEvent(newPosition);
    var afterEvent = steppedEvent.action(player);

    var after = function () {
      if (afterEvent && afterEvent.messages) {
        broadcastAfterEvent(player, afterEvent);
      }

      if (afterEvent.isWin) {
        player.isWin = true;
        self.gameOver();
        return;
      }

      var newPlayerIndex = (self.currentPlayerIndex + 1) % self.getPlayerCount();
      self.currentPlayerIndex = newPlayerIndex;
      broadcastNewPlayer(self.players[newPlayerIndex]);

      self.updateGameStatus();
      actionBtn.disabled = false;
    };

    broadcastEvent(player, steppedEvent);
    if (afterEvent.detail) {
      var modal = $('.modal');
      modal.find(".modal-title").text(afterEvent.detail.title);
      modal.find(".modal-img-container").html('<img src="' + afterEvent.detail.image + '" />');
      modal.find(".modal-desc").html(afterEvent.detail.desc.replace(/__PLAYER__/gi, "<strong>" + player.name + "</strong>"));
      modal.modal();
      modal.css('margin-top', (40 + 40));
      modal.one('hidden.bs.modal', after);
    } else {
      after();
    }
  };

  Game.prototype.gameOver = function () {
    this.isGameOver = true;

    this.updateGameStatus();

    var body = selectGameViewport();
    var restartBtn = body.querySelector(".restart-btn");
    restartBtn.disabled = false;
    var actionBtn = body.querySelector(".action-btn");
    actionBtn.disabled = true;
  };

  Game.prototype.startGame = function () {
    var body = selectGameViewport();
    var actionBtn = body.querySelector(".action-btn");
    actionBtn.disabled = false;

    this.broadcastNewGame();
    broadcastNewPlayer(this.players[0]);
    this.initGameStatus();
    this.updateGameStatus();
  };

  var selectGameViewport = function () {
    return document.querySelector("#game-viewport .game-template");
  };

  Game.prototype.updateGameStatus = function () {
    var self = this;

    var block = selectGameViewport().querySelector(".playerList");
    var html = "";
    this.players.forEach(function (player) {
      var msg = "玩家 " + player.name + " 座標 " + player.position + " Buzz " + player.buzz;
      var theClass = player === self.players[self.currentPlayerIndex] ? "currentPlayer" : "otherPlayer";
      html += '<p class="' + theClass + '">' + msg + "</p>";
    });
    block.innerHTML = html;

    var bottomList = selectGameViewport().querySelector(".player-list");
    for (var i = 0; i < this.players.length; i++) {
      var player = this.players[i];
      var playerDiv = bottomList.children[i];

      playerDiv.className = "player" + (i === this.currentPlayerIndex ? " active-player" : "");
      var buzzPoint = playerDiv.querySelector(".buzz-point");
      buzzPoint.innerText = player.buzz;
      var buzzProgress = playerDiv.querySelector("progress");
      buzzProgress.value = player.buzz;

      if (this.isGameOver && !player.isWin) {
        playerDiv.className += " loser-player";
      }
    }
  };

  Game.prototype.initGameStatus = function () {
    var bottomList = selectGameViewport().querySelector(".player-list");
    bottomList.innerHTML = "";
    for (var i = 0; i < this.players.length; i++) {
      var player = this.players[i];
      var playerDiv = document.createElement("div");
      playerDiv.className = "player" + (i === this.currentPlayerIndex ? " active-player" : "");
      playerDiv.style.left = (48 + i * 160) + "px";
      var avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.style.backgroundImage = "url(" + player.avatar + ")";
      playerDiv.appendChild(avatar);
      var buzz = document.createElement("div");
      buzz.className = "buzz";
      var buzzText = document.createElement("span");
      buzzText.innerText = "Buzz / ";
      var buzzPoint = document.createElement("span");
      buzzPoint.className = "buzz-point";
      buzzPoint.innerText = player.buzz;
      buzz.appendChild(buzzText);
      buzz.appendChild(buzzPoint);
      playerDiv.appendChild(buzz);
      var buzzProgress = document.createElement("progress");
      buzzProgress.max = 100;
      buzzProgress.value = player.buzz;
      playerDiv.appendChild(buzzProgress);

      bottomList.appendChild(playerDiv);
    }
  };

  Game.prototype.broadcastNewGame = function () {
    broadcastClear();

    var players = this.players;
    for (var i = 0; i < players.length; i++) {
      broadcast("玩家 " + (i + 1) + " : " + players[i].name);
    }
    broadcast("遊戲開始！努力成為貪婪谷最牛B的 startup 吧！");
  };

  var broadcastNewPlayer = function (player) {
    var message = '輪到玩家 "' + player.name + '" 了';
    broadcast(message);

    var actionBtn = selectGameViewport().querySelector(".action-btn");
    actionBtn.innerText = "玩家 " + player.name + " 的行動";
  };

  var broadcastEvent = function (player, event) {
    var message = event.message.replace(/__PLAYER__/gi, player.name);
    broadcast(message, player);
  };

  var broadcastAfterEvent = function (player, event) {
    event.messages.forEach(function (message) {
      broadcast(message.replace(/__PLAYER__/gi, player.name), player);
    });
  };

  var broadcastClear = function () {
    var mud = selectGameViewport().querySelector('.mud .timeline');
    if (mud) {
      mud.innerHTML = "";
    }
  }

  var broadcast = function (message, player) {
    var timeline = selectGameViewport().querySelector('.mud .timeline');
    if (timeline) {
      var div = document.createElement("div");
      div.className = "event";

      if (player) {
        var playerDiv = document.createElement("div");
        playerDiv.className = "avatar";
        playerDiv.style.backgroundImage = "url(" + player.avatar + ")";
        div.appendChild(playerDiv);
      }
      var messageDiv = document.createElement("div");
      messageDiv.className = "message";
      messageDiv.innerText = message;
      div.appendChild(messageDiv);

      timeline.appendChild(div);
    }
    var mud = selectGameViewport().querySelector('.mud');
    mud.scrollTop = timeline.clientHeight + 200;
  };

  Game.prototype.getEvent = function (pos) {
    var roundedPos = pos % this.events.length;
    return this.events[roundedPos];
  };

  Game.prototype.getMapLength = function () {
    return this.events.length;
  };

  Game.prototype.getPlayerCount = function () {
    return this.players.length;
  };

  var generateRandomEvents = function (totalLength) {
    var points = [
      -10, -5, 5, 15, 25,
    ];

    var startEvent = new GameEvent("Start", "__PLAYER__ 回到遊戲起點", function (){
      return new AfterActionEvent([]);
    });
    var ipoEvent = generateIPOEvent();

    var events = [startEvent];
    // for (var i = 0; i < totalLength - 2; i++) {
    //   var buzzPoint = points[((Math.random() * points.length) | 0)];
    //   var goodBad = buzzPoint >= 0 ? "爽" : "屎";
    //   var newEvent = generateNormalEvent("random event", "__PLAYER__ 遭遇" + goodBad + "事件 " + (i + 1) +  " ！", buzzPoint);
    //   events.push(newEvent);
    // }
    for (var i = 0; i < totalLength - 2; i++) {
      var defEvent = eventTemplates[i];
      var newEvent = generateFromDefEvent(defEvent, "img/events/" + (i + 1) + ".jpg");
      events.push(newEvent);
    }
    events.push(ipoEvent);

    return events;
  };

  var generateNewGame = function () {
    function shuffleArray (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    };

    var players = [
      new Player("200 STARTUPS", "img/avatar-200.jpg"),
      new Player("Carlos' Strip Club", "img/avatar-carlos.jpg"),
      new Player("Rick's Boxing Dojo", "img/avatar-rick.jpg"),
      new Player("Ben's Night Club", "img/avatar-ben.jpg")
    ];
    shuffleArray(players);

    var events = generateRandomEvents(10);
    var game = new Game(players, events);
    return game;
  };

  var loadTemplate = function (className) {
    var template = document.querySelector(".hide." + className);
    if (template) {
      var result = document.createElement("div");
      result.className = className;
      result.innerHTML = template.innerHTML;
      return result;
    }
  }

  var loadTemplateByHtml = function (className) {
    var template = document.querySelector("." + className);
    if (template) {
      return '<div class="' + className + '">' + template.innerHTML + '</div>';
    }
  };

  var loadStartMenu = function () {
    var template = loadTemplate("intro-template");
    var startBtn = template.querySelector(".start-btn");
    startBtn.addEventListener("click", function () {
      loadNewGame();
    }, false);

    var viewport = document.getElementById("game-viewport");
    $(viewport).children("div:not(.intro-template)").fadeOut(500);
    $(viewport).append(template);
  };

  var loadCharacterMenu = function () {
    var template = loadTemplate("character-template");
    var form = template.querySelector(".game-form");
    $(form).submit(function (ev) {
      ev.preventDefault();

      loadNewGame();
    });

    var viewport = document.getElementById("game-viewport");
    $(viewport).append(template);
    setTimeout(function (){
      $("#game-viewport").children("div:not(.character-template)").remove();
    }, 500);
  }

  var loadNewGame = function () {
    var template = loadTemplate("game-template");

    var viewport = document.getElementById("game-viewport");
    $(viewport).append(template);
    setTimeout(function (){
      $("#game-viewport").children("div:not(.game-template)").remove();
    }, 500);

    startNewGame(template);
  };

  var startNewGame = function (gameTemplate) {
    var game = generateNewGame();

    // bind action button
    var actionBtn = gameTemplate.querySelector(".action-btn");
    actionBtn.addEventListener("click", function () {
      game.playerAction();
    }, false);
    var restartBtn = gameTemplate.querySelector(".restart-btn");
    restartBtn.addEventListener("click", function () {
      loadStartMenu();
    }, false);

    game.startGame();
  };

  var main = function () {
    loadStartMenu();
  };

  document.addEventListener('DOMContentLoaded', main, false);

})(this);
