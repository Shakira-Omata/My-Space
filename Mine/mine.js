// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
});

// Add task to the list
document.getElementById('add-task-btn').addEventListener('click', function () {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTaskToDOM(taskText, false);
        taskInput.value = ''; // Clear the input field
    }
});

// Save tasks to local storage
document.getElementById('save-tasks-btn').addEventListener('click', function () {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    alert('Tasks saved!');
});

// Function to add a task to the DOM
function addTaskToDOM(taskText, isCompleted) {
    const taskList = document.getElementById('task-list');
    const newTask = document.createElement('li');
    if (isCompleted) newTask.classList.add('completed');

    // Task text
    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;
    taskTextSpan.className = 'task-text';
    newTask.appendChild(taskTextSpan);

    // Tick button
    const tickButton = document.createElement('button');
    tickButton.textContent = '✓';
    tickButton.className = 'tick-btn';
    tickButton.addEventListener('click', function () {
        newTask.classList.toggle('completed');
    });
    newTask.appendChild(tickButton);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', function () {
        newTask.remove();
    });
    newTask.appendChild(deleteButton);

    taskList.appendChild(newTask);
}