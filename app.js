document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
      const taskItem = createTaskItem(taskText);
      addTaskToList(taskItem, 'pending');
      taskInput.value = '';
    }
  });
  
  function createTaskItem(taskText) {
    const taskItem = document.createElement('li');
    taskItem.innerText = taskText;
  
    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.innerText = getCurrentTimestamp();
    taskItem.appendChild(timestamp);
    
    const completeButton = document.createElement('button');
    completeButton.innerText = 'Complete';
    completeButton.addEventListener('click', function() {
      completeTask(taskItem);
    });
    taskItem.appendChild(completeButton);
    
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteTask(taskItem);
    });
    taskItem.appendChild(deleteButton);
    
    return taskItem;
  }
  
  function addTaskToList(taskItem, listType) {
    const taskList = listType === 'pending' ? document.getElementById('pending-tasks') : document.getElementById('completed-tasks');
    taskList.appendChild(taskItem);
  }
  
  function completeTask(taskItem) {
    const completedTasksList = document.getElementById('completed-tasks');
    completedTasksList.appendChild(taskItem);
    taskItem.classList.add('completed');
    
    // Remove the "Complete" button
    const completeButton = taskItem.querySelector('button');
    completeButton.parentNode.removeChild(completeButton);
  }
  
  function deleteTask(taskItem) {
    taskItem.parentNode.removeChild(taskItem);
  }
  
  function getCurrentTimestamp() {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }