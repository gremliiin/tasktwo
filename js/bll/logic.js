(function() {

    let windowTasks = document.querySelector('.window-tasks__items');
    let buttonAddTask = document.querySelector('.add-task__submit--button');
    let inputAddTask = document.querySelector('.add-task__submit--input');



    let createTasks = (task) => {
        let element;
        if (task.empty !== true) {
            element = `<li class="window-tasks__item">
        <input class="window-tasks__item--check" type="checkbox" ${task.chekbox ? 'checked' : ''}>
        <p class="window-tasks__item--task" ${task.chekbox === true ? 'style = "text-decoration: line-through"' : ''}>${task.content}</p>
        <span class="window-tasks__item--delete"></span>
    </li>`
        } else {
            element = '<li class="window-tasks__empty">Добавьте задачу</li>';
        }



        return element;

    }

    let checkDeleteElements = () => {

        toDoList.forEach(function(el) {
            if (el.delete === true) {
                let index = toDoList.indexOf(el);
                if (index > -1) {
                    toDoList.splice(index, 1);
                }
            }
        });
    }

    let deleteTask = () => {
        let deleteButtonsNode = document.querySelectorAll('.window-tasks__item--delete');
        let deleteButtons = [];
        for (let key of deleteButtonsNode) {
            deleteButtons.push(key);
        }

        deleteButtons.forEach(function(el) {
            el.addEventListener('click', function() {
                toDoList[deleteButtons.indexOf(el)].delete = true;
                outputTasks();
            })
        });
    }

    let outputTasks = () => {



        checkDeleteElements();
        let elements = [];
        let pushTasks = () => {
            toDoList.forEach(function(el) {
                elements.push(createTasks(el));
            });
        }
        pushTasks();

        if (toDoList.length === 0) {
            toDoList.push({ empty: true });
            pushTasks();
        }

        windowTasks.innerHTML = elements.join('');

        let checkElNode = document.querySelectorAll('.window-tasks__item--check');
        let checkEl = [];
        for (let key of checkElNode) {
            checkEl.push(key);
        }

        checkEl.forEach(function(el) {
            el.addEventListener('click', function() {
                if (toDoList[checkEl.indexOf(el)].chekbox === true) {
                    toDoList[checkEl.indexOf(el)].chekbox = false;
                } else {
                    toDoList[checkEl.indexOf(el)].chekbox = true;
                }
                outputTasks();
            });
        });

        deleteTask();
    }
    outputTasks();

    buttonAddTask.addEventListener('click', function() {
        if (toDoList[0].empty === true) {
            toDoList.pop();
        }
        if (inputAddTask.value === '') {
            let selectValue = document.querySelector('.add-task__submit--select').value;
            toDoList.push({ chekbox: false, content: selectValue, delete: false });
            outputTasks();
        } else {
            toDoList.push({ chekbox: false, content: inputAddTask.value, delete: false });
            inputAddTask.value = '';
            outputTasks();
        }
    });

    let selectTasks = () => {
        let optionsNode = document.querySelectorAll('.add-task__select--item');
        let options = [];
        for (let key of optionsNode) {
            options.push(key);
        }

        options.forEach(function(el) {
            el.addEventListener('click', function(el) {
                inputAddTask.value = el.value;
                console.log(inputAddTask.value);
                outputTasks();
            });
        })
    }

    selectTasks();
})();