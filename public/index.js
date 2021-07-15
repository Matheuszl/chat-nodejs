var socket = io('http://15.228.28.56:4200');
let messagefield = document.querySelector('.user-message')
let namefield = document.querySelector('.user-name')
let colorfield = document.querySelector('.user-color')
let messagesfield = document.querySelector(".messages")
let messages = document.getElementsByClassName("message")
let fullName

$(document).ready(function () {
    scrollUp();
    if(verifyContact()){
        namefield.value = getContact("name")
        colorfield.value = getContact("color")
    } else {
        namefield.value = "aa"
        colorfield.value = "aa"
    }
    fullName = (namefield.value + "#" +colorfield.value)
})

function renderMessage(message) {
    return new Promise((resolve,reject)=>{
            $('.messages').append(`<div class="message ${filterName(message.autor, "name")}"><strong class="autor-name" style= "color: ${filterName(message.autor, "color")}">${filterName(message.autor, "name")}</strong><div class="autor-message">${message.message}</div><div class="date-message">${filterName(message.autor,"time")}</div></div>`);
            resolve();
    }).then(()=>{
        verifyClass(filterName(fullName, "name"))
    })
}

socket.on('previousMessage', function (messages) {
    for (message of messages) {
        renderMessage(message);
        scrollUp();
      
    }
},   verifyClass(namefield.value));


socket.on('receivedMessage', function (message) {
    renderMessage(message);
    scrollUp();
});


    $('#chat').submit(function (event) {
        event.preventDefault();
        
        fullName  = namefield.value + "#" + colorfield.value + "#" + getDateNow()
        
        if (namefield.value.length && messagefield.value.length) {
            
            var messageObject = {
                autor: fullName,
                message: messagefield.value,
            };
            
            renderMessage(messageObject);
            socket.emit('sendMessage', messageObject);
            storeContact(namefield.value, colorfield.value)
            verifyClass(namefield.value);
            messagefield.value = ""
            scrollUp();
        }
    });


function scrollUp() {
    messagesfield.scroll(0, (messages.length * 1000))
}

function filterName(fullName, mode) {
    if (mode == "full") {
        return fullName
    } else if (mode == "name") {
        return fullName.split("#")[0]
    } else if (mode == "color") {
        return fullName.split("#")[1]
    } else if (mode == "time"){
        return fullName.split("#")[2]
    }
}

function settings() {

    $(".toggle-options-close").toggleClass("hide");
    $(".toggle-options").toggleClass("hide");
    $(".options").toggleClass("hide")
}


function verifyClass(username) {
    for (let index = 0; index < messages.length; index++) {
        if (messages[index].className.includes(username)) {
            $("."+username).addClass("user-send-message")
        }
    }


}

function storeContact(username, color) {
    if (getContact("name") != username){
        window.localStorage.setItem('name', username);
        window.localStorage.setItem('color', color);
    } else if (getContact("name") == username) {
        window.localStorage.setItem('color', "");
        window.localStorage.setItem('color', color);
    }
}

function verifyContact() {
    if (getContact("name") == null && getContact("color") == null) {
        return false
    } else  {
        return true
    }
}

function getContact (valueName) {
    if (valueName == "name") {
        return window.localStorage.getItem("name")
    } else if (valueName == "color"){
        return window.localStorage.getItem("color")
    } else {
        return window.localStorage.getItem("name") + "#" + window.localStorage.getItem("color")
    }
}

function getDateNow() {
    var d = new Date();
    return d.getHours() +":"+ d.getMinutes() 
    
  }

  function saveSettings() {
      settings()
      storeContact(namefield.value,colorfield.value)
  }