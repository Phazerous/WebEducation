$(document).ready(function() {
  var dialogue = $('.dialogue');

  $('#send').on('mousedown', function() {
    var text = $('#text').val();

    dialogue.append('<p>' + text + '</p>');
    console.log('An element occured')

    $('#text').val('');
  });
});
