document.addEventListener('submit',function(e){
    e.preventDefault();
    let content = document.getElementById('toggle-input').value;
    if(content != ""){
        saveTodo(content);
        document.getElementById('toggle-input').value = '';
    }
})
function checkLocal(){
    if(localStorage.getItem('setToDoList') !== null){
        todo = JSON.parse(localStorage.getItem('setToDoList'));
    }else {
        todo = [];
    }
}

function saveTodo(text){
    checkLocal()
    var todoItem = {
        id : Date.now(),
        name:text,
        checked : false 
    }
    todo.push(todoItem);
    localStorage.setItem('setToDoList',JSON.stringify(todo));
    countClick = todo.length - 1;
    getViewList(countClick);
    ++countClick ;
}

function getViewList(countClick){
    var getItemLocal = localStorage.getItem('setToDoList');
    var listItem = JSON.parse(getItemLocal);
    var ul = document.getElementsByTagName('ul');
    ul[0].insertAdjacentHTML('afterend',`
    <li>
        <div class="checkbox checkbox-info checkbox-circle toggle-choose">
            <input onclick="myClickTick(${listItem[countClick]['id']})" type="checkbox" />
            <label id="${listItem[countClick]['id']}" for="chkInfo">
                ${listItem[countClick]['name']}
            </label>
        </div>
    </li>
    `);
}

function getViewActive(){
    checkLocal();
    var ul = document.getElementsByTagName('ul');
    for(let i = 0 ; i < todo.length ; i++){
        if(todo[i].checked == false){
            ul[0].insertAdjacentHTML('afterend',`
            <li>
                <div class="checkbox checkbox-info checkbox-circle toggle-choose">
                    <input onclick="myClickTick(${todo[i]['id']})" type="checkbox" />
                    <label id="${todo[i]['id']}" for="chkInfo">
                        ${todo[i]['name']}
                    </label>
                </div>
            </li>
            `);
        }
    }
}

function getViewCompleted(){
    checkLocal();
    var ul = document.getElementsByTagName('ul');
    for(let i = 0 ; i < todo.length ; i++){
        if(todo[i].checked == true){
            ul[0].insertAdjacentHTML('afterend',`
            <li>
                <div class="checkbox checkbox-info checkbox-circle toggle-choose">
                    <input onclick="myClickTick(${todo[i]['id']})" type="checkbox" />
                    <label id="${todo[i]['id']}" for="chkInfo">
                        ${todo[i]['name']}
                    </label>
                </div>
            </li>
            `);
        }
    }
}

function myClickTick(id){
    // tìm vị trí của phần tử nào có item.id == id 
    const index = todo.findIndex(item => item.id == id); 
    // tại ví trí todo[item] thì chuyển !checked
    todo[index].checked = !todo[index].checked;

    // check xong thif up lại vào localstorage
    localStorage.setItem('setToDoList',JSON.stringify(todo));
    // check xong thif up lại vào localstorage

    if(todo[index].checked == true){
        document.getElementById(id).classList.add('dead');
    }else {
        document.getElementById(id).classList.remove('dead');
    }
}

