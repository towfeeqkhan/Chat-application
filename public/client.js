const socket = io();

let name;

let textarea = document.querySelector("#textarea")

let messageArea = document.querySelector(".message-area")

do {
  name = prompt("Please enter your name: ")
} while(!name)

textarea.addEventListener("keyup", (e) => {
  if(e.key === "Enter") {
    sendMessage(e.target.value)
  }
})


function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim()
  }

  //Append

  appendMessage(msg, "outgoing")

  // Empty textarea after sending message
  textarea.value = ""

  ScrollToBottom()

  // Send to Server

  socket.emit("message", msg)
}


function appendMessage(msg, type){
  let mainDiv = document.createElement('div')
  let className = type
  mainDiv.classList.add(className, "message")

  let markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `

  mainDiv.innerHTML = markup


  messageArea.appendChild(mainDiv)
}


// Receive messages

socket.on("message", (msg) => {
  appendMessage(msg, "incoming")
  ScrollToBottom()
})

// Automatic Scroll to bottom after sending or receiving messages

function ScrollToBottom(){
  messageArea.scrollTop = messageArea.scrollHeight
}