{
   let tasks = [
   ];

   const bindEvents = () => {
      const removeButtons = document.querySelectorAll(".js-remove");

      removeButtons.forEach((removeButton, index) => {
         removeButton.addEventListener("click", () => {
            removeTask(index);
         })
      })

      const toggleDoneButtons = document.querySelectorAll(".js-done");

      toggleDoneButtons.forEach((toggleDoneButton, index) => {
         toggleDoneButton.addEventListener("click", () => {
            toggleTaskDone(tasks, index);
         })
      })
   }

   const render = () => {
      let htmlString = "";

      for (const task of tasks) {
         htmlString += `
         
         <li class="section__listItem">
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
      bindEvents();
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