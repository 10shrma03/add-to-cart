// import { add } from "../Scrimbaa/functions.js"
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// const appSettings = {
//     databaseURL: "https://playground-56de0-default-rtdb.asia-southeast1.firebasedatabase.app/"
// }

// const app = initializeApp(appSettings)
// const database = getDatabase(app)
// const moviesInDB = ref(database, "movies")


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-48697-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const booksInDB = ref(database, "books")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value;

    // push(moviesInDB, inputValue)
    push(shoppingListInDB, inputValue)
    clearInputFieldEl()
    // appendItemToShoppingListEl(inputValue)

    // console.log(inputValue)
})

// console.log(add(3, 4))

onValue(shoppingListInDB, function (snapshot) {
    // console.log(Object.values(snapshot.val())
    // let itemArray = Object.values(snapshot.val())
    if (snapshot.exists()) {
        let itemArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for (let i = 0; i < itemArray.length; i++) {
            // console.log(itemArray[i])
            let currentItem = itemArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            // appendItemToShoppingListEl(currentItemValue)
            appendItemToShoppingListEl(currentItem)
        }
    }
    else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function appendItemToShoppingListEl(item) {
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })



    shoppingListEl.append(newEl)
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}




