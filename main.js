function addTask() {
  const taskInput = document.getElementById('taskInput'); 
  const task = taskInput.value.trim(); 
  if (task) { 
      const taskList = document.getElementById('taskList'); 

      const listItem = document.createElement('li');
      const delButton = document.createElement('button');
      const checkButton = document.createElement('input');
      const lineDesign = document.createElement('hr');

      lineDesign.className = "lineDesign"
      checkButton.type = "checkbox";
      checkButton.className = "checkButton"; 
      delButton.textContent = "X";
      delButton.className = "delButton"; 
      delButton.addEventListener('click', deleteTask);

      listItem.textContent = task; 
      listItem.appendChild(checkButton);
      listItem.appendChild(delButton);
      listItem.appendChild(lineDesign);
      
      checkButton.addEventListener('change', function() {
          if (checkButton.checked) {
              listItem.classList.add('completed');
          } else {
              listItem.classList.remove('completed');
          }
      });

      taskList.appendChild(listItem);
      taskInput.value = ''; 
  } else {
      alert('You did not input anything.'); 
  }
}

function deleteTask(event) {
  const listItem = event.target.parentElement; 
  listItem.remove(); 
}