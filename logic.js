let task = document.getElementById("taskInput");
let btnAdd = document.getElementById("addButton");
let taskArea = document.getElementById("taskList");
let taskList = [];

window.addEventListener("load", function () {
    const storedTaskList = localStorage.getItem("taskList");
    if (storedTaskList) {
        taskList = JSON.parse(storedTaskList);
        readTasks();
    }
});

btnAdd.addEventListener("click", function(){
    let newTask = task.value;
    if(newTask === "") return;
    task.value = "";
    task.focus();
    
    // SENDING TASK TO ARRAY
    populateTasks(newTask);

    localStorage.setItem("taskList", JSON.stringify(taskList));
})


// POPULATING MAIN DIV USING NEW TASKS
function populateTasks(newTask) {
    let date = new Date(Date.now()).toDateString();
    let newTaskObject = {
        taskDate: date,
        task: newTask,
    }
    taskList.push(newTaskObject);
    // CALL READ TASKS FROM ARRAY WHEN NEW TASK ADDED
    readTasks();
    console.log(taskList);
}

// READING TASKS TO POPULATE DOM
function readTasks() {
    taskArea.innerHTML = "";
    taskList.forEach((singleTask, index) => {
        let {task, taskDate} = singleTask;
        let div = document.createElement("div");
        div.classList.add("myStyle");
        div.innerHTML = `<p class="task_text">${task}</p>
                        <p class="date btn btn-success">${taskDate}</p>
                        <button class="update_btn btn btn-success" data-index="${index}">Update</button> 
                        <button class="delete_btn btn btn-danger"  data-index="${index}">Delete</button> 
                       </div>`;
        taskArea.appendChild(div);
        
    });    
}

// ...

// Add an event listener to the taskArea and delegate it to handle delete button clicks
taskArea.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete_btn")) {
        // Get the index from the data-index attribute
        const index = event.target.getAttribute("data-index");
        
        // Remove the task at the specified index from the taskList array
        taskList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(taskList));

        // Re-render the tasks
        readTasks();
    }
});


// ...

// Add an event listener to the taskArea and delegate it to handle update button clicks
taskArea.addEventListener("click", function(event) {
    if (event.target.classList.contains("update_btn")) {
        // Get the index from the data-index attribute
        const index = event.target.getAttribute("data-index");
        
        // Prompt the user for the updated task text
        const updatedTaskText = prompt("Enter the updated task text:");

        // Update the task at the specified index in the taskList array
        if (updatedTaskText !== null) {
            // Automatically update the task date to the current date
            const currentDate = new Date().toDateString();
            taskList[index].task = updatedTaskText;
            taskList[index].taskDate = currentDate;

            // Update local storage with the updated task list
            localStorage.setItem("taskList", JSON.stringify(taskList));

            // Re-render the tasks
            readTasks();
        }
    }
});

// ...











// const now = new Date();
// const year = now.getFullYear();
// const month = (now.getMonth() + 1).toString().padStart(2, "0");
// const day = now.getDate().toString().padStart(2, "0");
// const hours = now.getHours().toString().padStart(2, "0");
// const minutes = now.getMinutes().toString().padStart(2, "0");
// const seconds = now.getSeconds().toString().padStart(2, "0");
// return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

// let value = Parent.value;
//         Parent.value = "";
//         Parent.focus();
//     let mainDiv = document.createElement("div");
//     let ele = document.createElement("h5");
//     ele.setAttribute("contentEditable", "true");
//     mainDiv.appendChild(ele);
//     ele.innerText = value;

//     let dateElement = document.createElement("button");
//     dateElement.innerText = getCurrentDate();
//     mainDiv.appendChild(dateElement);
//     dateElement.classList.add("pt-2", "btn", "btn-info");
//     mainDiv.setAttribute("data-index", array.length);
//     list.appendChild(mainDiv);
//     mainDiv.classList.add("myStyle");;
    
//     let c = document.createElement("button")
//     c.innerText = "Update"
//     mainDiv.appendChild(c);
//     let b = document.createElement("button");
//     b.innerText = "Delete";
//     mainDiv.appendChild(b);
//     b.classList.add("btn", "btn-danger");
//     b.addEventListener("click", function(){
//         mainDiv.remove();
//     })
//     array.push(mainDiv);
//     console.log(array);
//     c.classList.add("btn", "btn-success", "mx-3");
//     c.addEventListener("click", function(){
//         const index = mainDiv.getAttribute("data-index");
//         const updatedContent = ele.innerText;
//         console.log(updatedContent);
//         array[index].querySelector("h5").innerText = updatedContent;
//         console.log(array);

//     })