class List {
    constructor(id, name, checked) {
        this.id = id;
        this.name = name;
        this.checked = checked;
    }
}
function getStorage() {
    if (localStorage.getItem('setToDoList') !== null) {
        return todo = JSON.parse(localStorage.getItem('setToDoList'));
    } else {
        return todo = [];
    }
}
function setStorage(todo) {
    localStorage.setItem('setToDoList', JSON.stringify(todo));
}
class View {
    // displayList
    static displayList() {
        getStorage();
        todo.map((element) => View.addElementToList(element));
        // checkBox
        for (let i = 0; i < todo.length; i++) {
            if (todo[i].checked == true) {
                document.getElementById("checkbox"+todo[i].id).checked = true;
                document.getElementById(todo[i].id).classList.add('dead');
            } else {
                document.getElementById("checkbox"+todo[i].id).checked = false;
                document.getElementById(todo[i].id).classList.remove('dead');
            }
        }
    }
    static CheckDisplayList(todo){
        View.removeList();
        todo.map((element) => View.addElementToList(element));
        for (let i = 0; i < todo.length; i++) {
            if (todo[i].checked == true) {
                document.getElementById("checkbox"+todo[i].id).checked = true;
                document.getElementById(todo[i].id).classList.add('dead');
            } else {
                document.getElementById("checkbox"+todo[i].id).checked = false;
                document.getElementById(todo[i].id).classList.remove('dead');
            }
        }
    }
    // addElementToList
    static addElementToList(element) {
        var content_list = document.querySelector('#content-list');
        var row = document.createElement('li');
        row.innerHTML = `
            <div class="checkbox checkbox-info checkbox-circle toggle-choose">
                <input id ="checkbox${element['id']}" onclick="myClickTick(${element['id']})" type="checkbox" />
                <label id="${element['id']}" for="chkInfo">
                    ${element['name']}
                </label>
                <button type="button" onclick="DeleteItem(${element['id']})" style="float:right" class="btn btn-danger">Delete</button>
            </div>
        `;
        content_list.appendChild(row);
    }


    // display active
    static displayActive() {
        getStorage()
        todo.filter((element) => element.checked === false ? View.showActive(element) : "");
    }
    static CheckDisplayActive(ListTodo) { // click mới thực hiện hàm này
        View.removeActive();
        ListTodo.filter((element) => element.checked === false ? View.showActive(element) : "");
    }
    static showActive(element) {
        var active_list = document.querySelector('#active-list');
        var row = document.createElement('li');
        row.innerHTML = `
            <div class="checkbox checkbox-info checkbox-circle toggle-choose">
                <input id ="checkbox${element['id']}" onclick="myClickTick(${element['id']})" type="checkbox" />
                <label id="${element['id']}" for="chkInfo">
                    ${element['name']}
                </label>
                <button type="button" onclick="DeleteItem(${element['id']})" style="float:right" class="btn btn-danger">Delete</button>
            </div>
        `;
        row.classList.add("li" + element['id']);
        active_list.appendChild(row);
    }


    //display completed
    static displayCompleted() {
        getStorage();

        todo.filter((element) =>
            (element.checked === true) ? View.showCompleted(element) : "");
    }
    static CheckDisplayCompleted(ListTodo) { //click mới thực hiện hàm này
        View.removeCompleted();
        ListTodo.filter((element) =>
            (element.checked === true) ? View.showCompleted(element) : "");
    }
    static showCompleted(element) {
        var completed_list = document.querySelector('#completed-list');
        var row = document.createElement('li');
        row.innerHTML = `
            <div class="checkbox checkbox-info checkbox-circle toggle-choose">
                <input checked id ="checkbox${element['id']}" onclick="myClickTick(${element['id']})" type="checkbox" />
                <label class="dead" id="${element['id']}" for="chkInfo">
                    ${element['name']}
                </label>
                <button type="button" onclick="DeleteItem(${element['id']})" style="float:right" class="btn btn-danger">Delete</button>
            </div>
        `;
        completed_list.appendChild(row);
    }

    // remove innerHTML = "";
    static removeList(){
        var content_list = document.querySelector('#content-list');
        content_list.innerHTML = "";
    }
    static removeActive() {
        var active_list = document.querySelector('#active-list');
        active_list.innerHTML = "";
    }
    static removeCompleted() {
        var completed_list = document.querySelector('#completed-list');
        completed_list.innerHTML = "";
    }
    // clearInput
    static clearInput() {
        document.getElementById('toggle-input').value = '';
    }

    static CountElementRest() {
        getStorage();

        document.getElementById("countElementRest").innerHTML = todo.length;
    }
    static checkCountRest(ListTodo) {
        var count = 0;
        for (let i = 0; i < ListTodo.length; i++) {
            if (ListTodo[i].checked == false) {
                count++;
            }
        }
        document.getElementById("countElementRest").innerHTML = "";
        document.getElementById("countElementRest").innerHTML = count;
    }
}


// event : Load Browser
document.addEventListener('DOMContentLoaded', View.displayList);
document.addEventListener('DOMContentLoaded', View.displayActive);
document.addEventListener('DOMContentLoaded', View.displayCompleted);
document.addEventListener('DOMContentLoaded', View.CountElementRest);

// event : Add Element in List 
document.addEventListener('submit', function (e) {
    e.preventDefault();
    var todo;

    var id = Date.now();
    var name = document.getElementById('toggle-input').value;
    var checked = false;
    // tao element
    var elementList = new List(id, name, checked);

    // get array in localStorage
    if (localStorage.getItem('setToDoList') !== null) {
        var todo = JSON.parse(localStorage.getItem('setToDoList'));
    } else {
        var todo = [];
    }
    // push element get in todo
    todo.push(elementList)
    setStorage(todo);

    // move class View --> method ....
    View.addElementToList(elementList);
    View.showActive(elementList);
    View.checkCountRest(todo);
    View.clearInput();
});

// event :checked
function myClickTick(id) {

    getStorage();

    // tìm vị trí của phần tử nào có item.id == id 
    const index = todo.findIndex(item => item.id == id);
    // tại ví trí todo[item] thì chuyển !checked
    todo[index].checked = !todo[index].checked;
    View.CheckDisplayList(todo);
    View.CheckDisplayActive(todo);
    View.CheckDisplayCompleted(todo);
    View.checkCountRest(todo);
    // check xong thif up lại vào localstorage
    setStorage(todo);
    // check xong thif up lại vào localstorage
    if (todo[index].checked == true) {
        document.getElementById(id).classList.add('dead');
    } else {
        document.getElementById(id).classList.remove('dead');
    }

}
//event : Delete item on todoList
function DeleteItem(idDelete){
    getStorage();
    var findObject = todo.find((element) => element.id == idDelete);
    var findKey = todo.indexOf(findObject);
    todo.splice(findKey,1)
    setStorage(todo);
    View.CheckDisplayList(todo);
    View.CheckDisplayActive(todo);
    View.CheckDisplayCompleted(todo);
    View.checkCountRest(todo);
}
// event :clear all todo List
function ClearLocalStorage(){
    localStorage.clear();
    getStorage();
    View.CheckDisplayList(todo);
    View.CheckDisplayActive(todo);
    View.CheckDisplayCompleted(todo);
    View.checkCountRest(todo);
}


