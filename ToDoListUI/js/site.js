const apiUrl = "https://localhost:5001/";
const ulToDoList = $("ul#toDoList");
const frmNew = $("form#frmNewToDo");
const txtName = $("input#txtName");

// METHODS
function addToDoItem(item) {
    let li = $("<li/>").attr("data-id", item.id);
    let input = $("<input/>").attr("type", "checkbox");
    let span = $("<span/>").text(item.name);
    let button = $("<button/>").addClass("btn btn-danger btn-sm").text("SİL");
    li.append(input).append(span).append(button);
    ulToDoList.append(li);
}

function getToDoItems() {
    ulToDoList.html("");
    $.ajax({
        type: "GET",
        url: apiUrl + "api/ToDoItems",
        success: function(data) {
            for (const item of data) {
                addToDoItem(item);
            }
        }
    });
}

// EVENTS
frmNew.submit(function(event) {
    event.preventDefault();
    const newToDo = { name: txtName.val() };

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: apiUrl + "api/ToDoItems",
        data: JSON.stringify(newToDo),
        success: function(data) {
            addToDoItem(data);
        }
    });

});

// INITIALIZATION
getToDoItems();