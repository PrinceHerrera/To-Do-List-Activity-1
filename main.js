function addTask() {
    const taskInput = document.getElementById('taskInput'); 
    const task = taskInput.value.trim();
    const taskDeadline = document.getElementById('taskDeadline').value;  
    if (task && taskDeadline) { 
        const taskList = document.getElementById('taskList'); 
  
        const listItem = document.createElement('li');
        const delButton = document.createElement('button');
        const checkButton = document.createElement('input');
        const deadlineSpan = document.createElement('span');
        const lineDesign = document.createElement('hr');
  
        lineDesign.className = "lineDesign"
        checkButton.type = "checkbox";
        checkButton.className = "checkButton"; 
        delButton.textContent = "X";
        delButton.className = "delButton"; 
        delButton.addEventListener('click', deleteTask);

        const formattedDeadline = new Date(taskDeadline).toLocaleString();
        deadlineSpan.textContent = ` - Deadline: ${formattedDeadline}`;
        deadlineSpan.style.marginLeft = '10px';
        deadlineSpan.style.color = 'gray';
  
        listItem.textContent = task; 
        listItem.appendChild(deadlineSpan);
        listItem.appendChild(checkButton);
        listItem.appendChild(delButton);
        listItem.appendChild(lineDesign);

        listItem.dataset.deadline = taskDeadline;
        
        checkButton.addEventListener('change', function() {
            if (checkButton.checked) {
                listItem.classList.add('completed');
            } else {
                listItem.classList.remove('completed');
            }
        });
  
        taskList.appendChild(listItem);
        taskInput.value = ''; 
        document.getElementById('taskDeadline').value = ''; 
        checkIfExpired(listItem);
        sortTasks(); 
        saveTasks();
    } else {
        alert('Please enter both the task and the deadline.'); 
    }
}
  
  function deleteTask(event) {
    const listItem = event.target.parentElement; 
    listItem.remove(); 
    saveTasks();
  }

  function checkIfExpired(listItem) {
    const deadline = new Date(listItem.dataset.deadline);
    const now = new Date();

    if (now > deadline) {
        listItem.style.color = 'red';
        listItem.style.backgroundColor = '#fdd'; 
        listItem.appendChild(document.createElement('hr')).style.backgroundColor = 'red'; 
    }
}

function sortTasks() {
    const taskList = document.getElementById('taskList');
    const listItems = Array.from(taskList.getElementsByTagName('li'));
    const sortSelect = document.getElementById('sortSelect');
    const sortOrder = sortSelect.value;

    listItems.sort((a, b) => {
        const deadlineA = new Date(a.dataset.deadline);
        const deadlineB = new Date(b.dataset.deadline);

        if (sortOrder === 'latest') {
            return deadlineB - deadlineA; 
        } else {
            return deadlineA - deadlineB; 
        }
    });


    taskList.innerHTML = '';
    listItems.forEach(item => taskList.appendChild(item));
}

document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const listItems = taskList.getElementsByTagName('li');

    for (let item of listItems) {
        checkIfExpired(item);
    }
});

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const listItems = Array.from(taskList.getElementsByTagName('li'));
    
    const tasks = listItems.map(item => {
        return {
            task: item.firstChild.textContent,
            deadline: item.dataset.deadline,
            completed: item.querySelector('.checkButton').checked
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
  
    tasks.forEach(taskObj => {
        const listItem = document.createElement('li');
        const delButton = document.createElement('button');
        const checkButton = document.createElement('input');
        const deadlineSpan = document.createElement('span');
        const lineDesign = document.createElement('hr');
  
        lineDesign.className = "lineDesign";
        checkButton.type = "checkbox";
        checkButton.className = "checkButton";
        checkButton.checked = taskObj.completed;
        delButton.textContent = "X";
        delButton.className = "delButton";
        delButton.addEventListener('click', deleteTask);

        const formattedDeadline = new Date(taskObj.deadline).toLocaleString();
        deadlineSpan.textContent = ` - Deadline: ${formattedDeadline}`;
        deadlineSpan.style.marginLeft = '10px';
        deadlineSpan.style.color = 'gray';

        listItem.textContent = taskObj.task;
        listItem.appendChild(deadlineSpan);
        listItem.appendChild(checkButton);
        listItem.appendChild(delButton);
        listItem.appendChild(lineDesign);

        listItem.dataset.deadline = taskObj.deadline;
        
        checkButton.addEventListener('change', function() {
            if (checkButton.checked) {
                listItem.classList.add('completed');
            } else {
                listItem.classList.remove('completed');
            }
            saveTasks(); 
        });
  
        taskList.appendChild(listItem);
        checkIfExpired(listItem);
    });

    sortTasks(); 
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});
