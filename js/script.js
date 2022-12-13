{
   let tasks = [];
   let hideDoneTask = false;

   const bindRemoveEvents = () => {
      const removeButtons = document.querySelectorAll(".js-remove");

      removeButtons.forEach((removeButton, index) => {
         removeButton.addEventListener("click", () => {
            removeTask(index);
         })
      })
   }

   const bindToggleDoneEvents = () => {
      const toggleDoneButtons = document.querySelectorAll(".js-done");

      toggleDoneButtons.forEach((toggleDoneButton, index) => {
         toggleDoneButton.addEventListener("click", () => {
            toggleTaskDone(tasks, index);
         })
      })
   }

   const bindButtonEvents = () => {
      const hideDoneTasksButton = document.querySelector(".js-hideAllDoneTasks");
      const allTasksDoneButton = document.querySelector(".js-allTasksDone");

      if (hideDoneTasksButton) {
         hideDoneTasksButton.addEventListener("click", hideDoneTasks);

      };

      if (allTasksDoneButton) {
         allTasksDoneButton.addEventListener("click", allTaskDone);
      };
   }

   const renderTasks = () => {
      let htmlString = "";

      for (const task of tasks) {
         htmlString += `
         
         <li class="section__listItem ${hideDoneTask && task.done ? "section__listItem--hidden" : ""}">
            <button class="task__button task__button--accept js-done">
              ${task.done ? "✓" : " "}
            </button>
            <span class="section__listText ${task.done ? "section__listText--done" : ""}">
               ${task.content}  
            </span>
            <button class="task__button task__button--remove js-remove">🗑️
            </button>
         </li>
         `;
      };

      document.querySelector(".js-tasksList").innerHTML = htmlString;
      document.querySelector(".js-newTask").value = '';
      document.querySelector(".js-newTask").focus();
   };

   const renderButtons = () => {
      let htmlButtonString = "";

      if (tasks.length !== 0) {
         htmlButtonString = `
            <button 
               class="js-hideAllDoneTasks button__hideAll" 
               ${tasks.some(({ done }) => done) ? "" : "disabled"}>
               ${hideDoneTask ? "Pokaż " : "Ukryj "}ukończone
            </button>
            <button class="js-allTasksDone button__doneAll"
               ${tasks.every(({done}) => done) ? "disabled" : ""}>
               Ukończ wszystkie
            </button>
         `
      };

      document.querySelector(".js-tasksListButton").innerHTML = htmlButtonString;
   };

   const render = () => {
      renderTasks();
      renderButtons();
      bindRemoveEvents();
      bindToggleDoneEvents();
      bindButtonEvents();
   };

   const addNewTask = (newTaskContent) => {
      tasks = [
         ...tasks,
         { content: newTaskContent },
      ];
      render();
   };

   const removeTask = (taskIndex) => {
      tasks = [
         ...tasks.slice(0, taskIndex),
         ...tasks.slice(taskIndex + 1),
      ];
      render();
   };

   const toggleTaskDone = (tasks, taskIndex) => {
      tasks = [
         ...tasks.slice(0, taskIndex),
         { ...tasks[taskIndex].done = !tasks[taskIndex].done },
         ...tasks.slice(taskIndex + 1),
      ]
      render();
   };

   const hideDoneTasks = () => {
      hideDoneTask = !hideDoneTask;
      render();
   };

   const allTaskDone = () => {
      tasks = tasks.map((tasks)=> ({
         ...tasks,
         done: true,
      }));
      render();
   };

   const onFormSubmit = (event) => {
      event.preventDefault();

      const newTaskContent = document.querySelector(".js-newTask").value.trim();

      if (newTaskContent === "") {
         return;
      }
      addNewTask(newTaskContent);
   };

   const init = () => {
      render();

      const form = document.querySelector(".js-form");

      form.addEventListener("submit", onFormSubmit);
   };
   init();
}