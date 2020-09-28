(function() {

    //находим элементы, с которыми будем взаимодействовать
    let windowTasks = document.querySelector('.window-tasks__items');
    let buttonAddTask = document.querySelector('.add-task__submit--button');
    let inputAddTask = document.querySelector('.add-task__submit--input');
    let multipleTasks = [];




    //создаем функцию, которая возвращает тег задачи
    let createTasks = (task) => {

        let element;

        if (task.empty !== true) {
            //если массив состояния не пустой, делаем обертку данных в эллемент
            element = `<li class="window-tasks__item">
        <input class="window-tasks__item--check" type="checkbox" ${task.chekbox ? 'checked' : ''}>
        <p class="window-tasks__item--task" ${task.chekbox === true ? 'style = "text-decoration: line-through"' : ''}>${task.content}</p>
        <span class="window-tasks__item--delete"></span>
    </li>`
        } else {
            //если массив состояния пустой, добавляем элемент, который сообщит пользователю что задач нету
            element = '<li class="window-tasks__empty">Добавьте задачу</li>';
        }

        return element;

    }

    //создаем функцию, которая проверяет нужно ли удалить задачу и принимает решение
    let checkDeleteElements = () => {

        toDoList.forEach(function(el) {
            if (el.delete === true) {
                let index = toDoList.indexOf(el);
                if (index > -1) {
                    toDoList.splice(index, 1);
                    saveLocal(toDoList);
                }
            }
        });
    }

    /*
        создаем функцию которая привязывает observer к кнопкам удаления и по
        клику на кнопку дает статус удаления true
    */
    let deleteTask = () => {
        let deleteButtonsNode = document.querySelectorAll('.window-tasks__item--delete');
        let deleteButtons = [];
        for (let key of deleteButtonsNode) {
            deleteButtons.push(key);
        }

        deleteButtons.forEach(function(el) {
            el.addEventListener('click', function() {
                toDoList[deleteButtons.indexOf(el)].delete = true;
                saveLocal(toDoList);
                outputTasks();
            })
        });
    }

    //создаем функцию, которая отрисовывает задачи по состоянию
    let outputTasks = () => {

        //проверяем состояния элемента по удалению
        checkDeleteElements();

        //создаем переменную с элементами
        let elements = '';

        //создаем функцию, которая записывает элементы в переменную с элементами
        let pushTasks = () => {

            toDoList.forEach(function(el) {
                elements += createTasks(el);
            });

        }

        //записываем элементы в переменную с элементами
        pushTasks();

        /*
            проверяем состояния массива с данными, если он пустой, добавляем туда
            объект который на это указывает
        */
        if (toDoList.length === 0) {
            toDoList.push({ empty: true });
            saveLocal(toDoList);
            pushTasks();
        }

        let addClassForLastTaskElement = () => {
            console.log(elements.split(' '));
        }

        //отрисовываем элементы c задачами на странице
        windowTasks.innerHTML = elements;

        //находим checkbox задач и записываем в nodeList
        let checkElNode = document.querySelectorAll('.window-tasks__item--check');

        //создаем массив, в котором будут хранится эллменты с nodeList
        let checkEl = [];

        //записываем nodeList в массив
        for (let key of checkElNode) {
            checkEl.push(key);
        }

        //каждому checkbox присваеваем observer, который проверяет на атрибут checked
        checkEl.forEach(function(el) {
            el.addEventListener('click', function() {
                if (toDoList[checkEl.indexOf(el)].chekbox === true) {
                    toDoList[checkEl.indexOf(el)].chekbox = false;
                    saveLocal(toDoList);
                } else {
                    toDoList[checkEl.indexOf(el)].chekbox = true;
                    saveLocal(toDoList);
                }
                outputTasks();
            });
        });

        //удаляем задачи, у которых есть статус удаления
        deleteTask();
    }

    //отрисоваваем задачи по состоянию
    outputTasks();

    //создаем функцию которая присваевает observer кнопки добавления добавляет данные задачи в массив состояния
    let addTasks = () => {
        //логика добавления задачи
        let logicAddTask = () => {
            if (toDoList[0].empty === true) {
                toDoList.pop();
                saveLocal(toDoList);
            }
            if (inputAddTask.value === '' && multipleTasks.length == 0) {
                let addTaskError = document.querySelector('.add-task__error');
                addTaskError.innerHTML = 'Ошибка: Выберите задачу или напишите ее';
                outputTasks();
            } else if (inputAddTask.value !== '') {
                toDoList.push({ chekbox: false, content: inputAddTask.value, delete: false });
                saveLocal(toDoList);
                inputAddTask.value = '';
                outputTasks();
            }

            if (multipleTasks.length !== 0) {
                multipleTasks.forEach(function(el) {
                    toDoList.push({ chekbox: false, content: el, delete: false });
                    outputTasks();
                    saveLocal(toDoList);
                });
            }
            multipleTasks = [];
        };

        //добавление задачи по кнопке "Добавить"
        buttonAddTask.addEventListener('click', function() {
            logicAddTask();
        });

        //добавление задачи по кнопке клавише "Enter"
        inputAddTask.addEventListener('keydown', function(event) {
            if (event.code == 'Enter') {
                logicAddTask();
            }
        });
    }

    //добавляем кнопке "Добавить" логику добавления задач
    addTasks();

    /*
        создаем функцию, которая присваивает observer к select, который в свою очередь 
        добавляет в массив задачи, которые нужно вывести пр нажатии на кнопку "Добавить" 
    */
    let selectTasks = () => {
        let tasksSelectNode = document.querySelector('.add-task__submit--select');
        let tasksSelect = [];

        for (let key of tasksSelectNode) {
            tasksSelect.push(key);
        }

        tasksSelect.forEach(op => {
            op.addEventListener('click', function() {
                multipleTasks.push(op.value);
            })
        });
    }

    //присваиваем observer к select
    selectTasks();

})();