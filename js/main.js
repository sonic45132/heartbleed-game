/*
 * entry point, glue code
 * K. Delaney
 */

var sounds = ["/sounds/key1.mp3","/sounds/key2.mp3","/sounds/key3.mp3","/sounds/key4.mp3","/sounds/key5.mp3"];

$(document).ready(function() {
  var display = new view_module.MemoryDisplay('#characters');
  var messageBox = new view_module.MessageBox('#console');
  var soundManager = new soundmanager_module.SoundManager(sounds);
  var memory = new game_module.MemoryContents();
  var game = new game_module.HeartbleedGame(memory, soundManager);
  $('#power').click(function(){
    game.reset();
  });
  game.onMessage = $.proxy(messageBox.add, messageBox);
  memory.onChange = $.proxy(display.change, display);
  memory.onReset = $.proxy(display.reset, display);
  //game.onTriesChange = ?;
  game.onReset = $.proxy(messageBox.clear, messageBox);
  display.onSelection = $.proxy(game.tryItem, game);
  display.onHover = function() {
    soundManager.play("key1");
  }
  
  var triesBox = $('#tries');
  
  game.onTriesChange = function(num) {
    var blocks = "";
    for(var i = 0; i < num; i++) {
      blocks += "# ";
    }
    triesBox.html('<span id="number-attempts">'+num+'</span> ATTEMPT(S) LEFT: <span id="blocks">'+blocks+'</span>');
  }
  
  game.reset();
});
