import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const p = (...args) => { console.log(...args) };

const appSettings = {
    databaseURL: "https://fir-test-a05d0-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const listDB = ref(database, "itemslist");

const input = document.getElementById("input");
const list = document.getElementById("list");
const button = document.getElementById("button");

onValue(listDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
        clearHTML(list);
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentKey = currentItem[0];
            let currentVal = currentItem[1];
            populate(currentKey, currentVal);
        };
    } else {
        list.innerHTML = 'No items here... yet';
    };
});

button.addEventListener('click', () => {
    if (input.value != "") {
        let text = input.value;
        push(listDB, text);
        clearVal(input);
    }
});

function clearHTML(elem) {
    elem.innerHTML = "";
};

function clearVal(elem) {
    elem.value = "";
};

function populate(id, value) {
    let child = document.createElement("li");
    child.textContent = value;
    child.addEventListener('dblclick', () => {
        let location = ref(database, `itemslist/${id}`);
        remove(location);
    });
    list.append(child);
};