const arrOfTasks = [
    {
        id: "task-1",
        title: "task num 1",
        description: "lorem123124 531 4345 ",
        completed: true,
    },
    {
        id: "task-2",
        title: "task num2",
        description: "lorem123124 531 4345 ",
        completed: false,
    },
    {
        id: "task-3",
        title: "task num 3",
        description: "lorem123124 531 4345 ",
        completed: true,
    },
    {
        id: "task-5",
        title: "task num 5",
        description: "lorem123124 531 4345 ",
        completed: false,
    },
    {
        id: "task-6",
        title: "task num 6",
        description: "lorem123124 531 4345 ",
        completed: false,
    },
    {
        id: "task-7",
        title: "task num 7",
        description: "lorem123124 531 4345 ",
        completed: false,
    },
    {
        id: "task-4",
        title: "task num 4",
        description: "lorem123124 531 4345 ",
        completed: true,
    },
];

(function (arrOfTasks) {
    const taskContainer = document.getElementById("task-container");
    const formContainer = document.forms["form-todo"];
    const inputTitle = formContainer.elements["task-title"];
    const inputDescription = formContainer.elements["description"];

    let objOfTasks;

    formContainer.addEventListener("submit", onSubmitHandler);
    taskContainer.addEventListener("click", onClickTaskContainer);

    function onClickTaskContainer({target}) {
        const attr = target.getAttribute("data-btn");

        if (!attr) {
            return;
        } else if (attr === "delete") {
            deleteTask(target);
        }
    }

    function deleteTask(btn) {
        const li = btn.closest(".task");
const liAttr = li.getAttribute("data-id");
        const isDelete = confirm('delete task?');
        if (isDelete) {
            li.remove();
        }

    }

    function onSubmitHandler(event) {
        event.preventDefault();

        const titleVal = inputTitle.value;
        const descriptionVal = inputDescription.value;

        if (!titleVal || !descriptionVal) {
            alert("empty props");
            return;
        }

        const newTask = createNewTask(titleVal, descriptionVal);
        objOfTasks[newTask.id] = newTask;

        const li = listItemTemplate(newTask);

        taskContainer.insertAdjacentElement("afterbegin", li);
        this.reset();
    }

    function createNewTask(title, description) {
        return {
            id: Math.random(),
            title,
            description,
            completed: false,
        };
    }

    function createObjOfTasks(tasks) {
        return tasks.reduce((acc, task) => {
            acc[task.id] = task;
            return acc;
        }, {});
    }

    objOfTasks = createObjOfTasks(arrOfTasks);

    function renderAllTasks(tasks) {
        const fragment = document.createDocumentFragment();

        Object.values(tasks).forEach((task) => {
            const li = listItemTemplate(task);
            fragment.appendChild(li);
        });

        taskContainer.appendChild(fragment);
    }

    renderAllTasks(objOfTasks);

    /**
     * @description create element li from object
     * @param {object} four keys - id, title, description, completed
     * @return {HTMLElement} li > h6  + p + button + button
     */

    function listItemTemplate({id, title, description, completed}) {
        const li = document.createElement("li");
        li.setAttribute("data-id", id);
        li.classList.add("task");

        const h6 = document.createElement("h6");
        h6.classList.add("task-title");
        h6.textContent = title;

        const p = document.createElement("p");
        p.textContent = description;

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Delete";
        btnDelete.setAttribute("data-btn", "delete");

        const btnCompleted = document.createElement("button");

        if (completed) {
            li.classList.add("done");
            btnCompleted.textContent = "Undone!";
        } else {
            btnCompleted.textContent = "Done!";
        }

        li.appendChild(h6);
        li.appendChild(p);
        li.appendChild(btnDelete);
        li.appendChild(btnCompleted);

        return li;
    }
})(arrOfTasks);



