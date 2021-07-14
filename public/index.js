var socket = io('http://15.228.28.56:4200');
let messagefield = document.querySelector('.user-message')
let namefield = document.querySelector('.user-name')
let colorfield = document.querySelector('.user-color')
let messagesfield = document.querySelector(".messages")
let messages = document.getElementsByClassName("message")


$(document).ready(function(){
    scrollUp();
    verifyClass();
})

function renderMessage(message) {
  $('.messages').append(`<div class="message ${filterName(message.autor,"name")}"><strong class="autor-name" style= "color: ${filterName(message.autor,"color")}">${filterName(message.autor,"name")}</strong><div class="autor-message">${message.message}</div></div>`);
}    

socket.on('previousMessage', function (messages) {
  for (message of messages) {
    renderMessage(message);
    scrollUp();
  }
});


socket.on('receivedMessage', function (message) {
  renderMessage(message);
  scrollUp();
});



$('#chat').submit(function (event) {
  event.preventDefault();
  let fullName = namefield.value +"#"+ colorfield.value
  if (namefield.value.length && messagefield.value.length) {
    var messageObject = {
      autor: fullName,
      message: messagefield.value,
    };

    renderMessage(messageObject);

    socket.emit('sendMessage', messageObject);
    messagefield.value = "";
    verifyClass(namefield.value);
    scrollUp();
  }
});

function scrollUp() {
  messagesfield.scroll(0, (messages.length * 1000))
}

function filterName(fullName,mode){
  if (mode == "full") {
    return fullName
  } else if (mode == "name") {
    for (let index = 0; index < fullName.length; index++) {
      if(fullName[index] == "#"){
        return fullName.slice(0, index);
      }
      
    }
  } else if (mode == "color") {
    for (let index = 0; index < fullName.length; index++) {
      if(fullName[index] == "#"){
        return fullName.slice(index+1, fullName.length);
      }
      
    }
  }
}

function settings() {
    
    $(".toggle-options-close").toggleClass("hide");
    $(".toggle-options").toggleClass("hide");
    $(".options").toggleClass("hide")
}


function verifyClass(username){
    for (let index = 0; index < messages.length; index++) {
        if (messages[index].className.includes(username)){
            $(`.${username}`).addClass("user-send-message")
        }
    }
    

}

