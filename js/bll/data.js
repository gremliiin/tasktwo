//если LocalStorage пустой, то устанавливаем в него пустой массив и преобразовываем в JSON
if (localStorage.getItem('state') === null) {
    localStorage.setItem('state', JSON.stringify([]));
}

//присваиваем состоянию задач данные из LocalStorage
let toDoList = JSON.parse(localStorage.getItem('state'));

//создаем функцию, которая сохраняет данные в LocalStorage
let saveLocal = (data) => {
    localStorage.setItem('state', JSON.stringify(data));
};