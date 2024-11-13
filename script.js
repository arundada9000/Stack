const stackContainer = document.querySelector(".stack-container");
let stackDivs = document.querySelectorAll(".stack");
const pushBtn = document.getElementById("push-btn");
const popBtn = document.getElementById("pop-btn");
const pushElement = document.getElementById("push-element");
const peekBtn = document.getElementById("peek-btn");
const clearBtn = document.getElementById("clear-btn");
const displayBtn = document.getElementById("display-btn");
const messageDiv = document.getElementById("message");
const pointerImage = document.querySelector(".pointer-image");
let length = 0;

class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
    createStack(element);
    displayMessage("Pushed " + element + " into the stack.", "push-message");
  }

  pop() {
    if (this.isEmpty()) {
      displayMessage("Stack is Empty !", "empty-message");
      return "Stack is empty";
    }
    const poppedItem = this.items.pop();
    displayMessage("Popped " + poppedItem + " from the stack.", "pop-message");
    removeStack();
    return poppedItem;
  }

  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }

    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
  getItems() {
    return this.items;
  }
}

const stack = new Stack();

pushBtn.addEventListener("click", () => {
  if (pushElement.value === "") {
    pushElement.value = Math.floor(Math.random() * 100);
  }
  stack.push(pushElement.value);
  pushElement.value = "";
});

popBtn.addEventListener("click", () => {
  if (stackDivs.length === 0) {
    displayMessage("Stack is Empty, Stack Underflow !!!", "empty-message");
    return;
  }
  stack.pop();
});

pushElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    pushBtn.click();
  }
});

peekBtn.addEventListener("click", () => {
  if (stackDivs.length <= 0) {
    displayMessage("Nothing to Peek, Stack is Empty !!!", "empty-message");
    return;
  }
  displayMessage("Top of the stack : " + stack.peek(), "peek-message");
});

clearBtn.addEventListener("click", () => {
  stackDivs.forEach((div) => {
    div.classList.add("popped");
  });
  setTimeout(() => {
    stackDivs.forEach((div) => {
      stackContainer.removeChild(div);
    });
    stackDivs = [];
    stack.items = [];
    updatePointer();
  }, 750);
  displayMessage("Cleared the stack.", "clear-message");
});

displayBtn.addEventListener("click", () => {
  if (stackDivs.length <= 0) {
    displayMessage("Nothing to Display, Stack is Empty !!!", "empty-message");
    return;
  }
  let elements = stack.getItems().join(", ");
  displayMessage("Stack elements : " + elements, "display-message");
});

function createStack(content) {
  const div = document.createElement("div");
  div.textContent = content;
  div.className = "stack";
  stackContainer.appendChild(div);
  stackContainer.style.height = stackContainer.offsetHeight + 50 + "px";
  stackDivs = document.querySelectorAll(".stack");
  div.scrollIntoView({ behavior: "smooth", block: "end" });
  setTimeout(updatePointer, 900);
}

function removeStack() {
  stackContainer.lastElementChild.classList.add("popped");

  stackContainer.lastElementChild.addEventListener("animationend", async () => {
    stackContainer.removeChild(stackContainer.lastElementChild);
    stackDivs = document.querySelectorAll(".stack");
    updatePointer();
  });

  if (stackDivs.length - 1 > 0) {
    stackDivs[stackDivs.length - 1].scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }
}

pushElement.value = "";

pushElement.addEventListener("input", (e) => {
  if (e.target.value === "") {
    pushElement.value = "";
  }
});

// Function to display messages
function displayMessage(msg, cn) {
  messageDiv.textContent = msg;
  messageDiv.className = cn;
  messageDiv.classList.add("message");
}

function updatePointer() {
  if (stackDivs.length <= 0) {
    pointerImage.style.display = "none";
  } else {
    pointerImage.style.display = "block";
    let StackDivRect = stackDivs[stackDivs.length - 1].getBoundingClientRect();
    pointerImage.style.top = StackDivRect.top + "px";
    pointerImage.style.left = StackDivRect.right + "px";
  }
}
