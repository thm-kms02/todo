// unused Class
/*class Aufgabe {
    id: number;
    user: number;
    ueberschrift: string;
    beschreibung: string;
    kategorie: number;
    prio: number;


    constructor(user: number, ueberschrift: string, beschreibung: string, kategorie?: number, prio?: number, id?: number) {
        this.user = user;
        this.ueberschrift = ueberschrift;
        this.beschreibung = beschreibung;
        this.kategorie = 1;
        this.prio = 1;
        this.id = id;
    }

    public toArray(): [number, string, string, number, number] {
        return [this.user, this.ueberschrift, this.beschreibung, this.kategorie, this.prio];
    }
}
*/
var taskText;
var saveButton;
var selectedCategory;
var descriptionInput;
var createButton;
var LoginButton;
var categoryInp;
var categoryBtn;
var openModReg;
var openModLog;
$(function () {
    saveButton = $("#saveTask");
    saveButton.on('click', addTask);
    createButton = $("#createButton");
    createButton.on('click', create);
    categoryBtn = $("#saveCategory");
    categoryBtn.on('click', addCategory);
    openModReg = $('#registyMod');
    openModReg.on('click', openModal);
    openModLog = $('#logine');
    openModLog.on('click', openLogin);
    LoginButton = $("#createlogin");
    LoginButton.on('click', login);
});
function addCategory() {
    categoryInp = $("#CategoryInput");
    var newCat = categoryInp.val().toString().trim();
    categoryInp.val("");
    $.ajax('http://localhost:8080/addCategory', {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            newCat: newCat
        }),
        contentType: 'application/json',
        success: function (result) {
            console.log(result);
            // getTodolist;
        },
        error: function (jqXHR) {
            console.log(jqXHR);
        }
    });
}
function addTask() {
    taskText = $("#taskText");
    descriptionInput = $("#descriptionInput");
    selectedCategory = $("#categorySelect");
    var ueberschrift = taskText.val().toString().trim();
    var beschreibung = descriptionInput.val().toString().trim();
    var category = selectedCategory.val();
    $.ajax('http://localhost:8080/addTask', {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            ueberschrift: ueberschrift,
            beschreibung: beschreibung,
            category: category
        }),
        contentType: 'application/json',
        success: function (result) {
            console.log(result);
            // getTodolist;
        },
        error: function (jqXHR) {
            console.log(jqXHR);
        }
    });
}
function create(event) {
    var vorname = $("#vorname").val().toString().trim();
    var nachname = $("#nachname").val().toString().trim();
    var email = $("#inputEmail4").val().toString().trim();
    var passwort = $("#inputPassword4").val().toString().trim();
    event.preventDefault();
    $.ajax('http://localhost:8080/create', {
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            vorname: vorname,
            nachname: nachname,
            email: email,
            passwort: passwort
        }),
    }).then(function () {
        var editModal = $('#modalLogin');
        editModal.modal("hide");
        alert("Willkomen, " + vorname);
    }).catch(function (jqXHR) {
        alert(jqXHR.responseText);
    });
}
function login(event) {
    var email = $("#email").val().toString().trim();
    var passwort = $("#password").val().toString().trim();
    event.preventDefault();
    $.ajax('http://localhost:8080/login', {
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            email: email,
            passwort: passwort
        }),
    }).then(function () {
        var editModal = $('#Login');
        editModal.modal("hide");
        alert("Willkomen");
        alert("sie sind erfolgreich eingeloggt");
    }).catch(function (jqXHR) {
        alert(jqXHR.responseText);
    });
}
// unused Function
/*function getTodolist() {
    $.ajax({
        url: 'loadtasks',
        type: 'get',
        dataType: 'json',
        success: (response) => {
            renderTodolist(response.todoList);
        }, error: () => {
            console.log("something went wrong")
        },
    });
}

// unused Function
function renderTodolist(todoList: Aufgabe[]) {
    const todobody: JQuery = $('#todobody');
    todobody.empty();
    for (const aufgabe of todoList) {
        const todoentry: JQuery = $(
            ' <div class="col-md-6" id="${aufgabe.id}">' +
            '            <div class="card1 mt-3 p-3 g-2">' +
            '                <div class="d-flex align-items-center">' +
            ' <small class="first">${aufgabe.kategorie}</small> </div>' +
            '                <div class="mt-3">' +
            '                    <h2 class="text1">${aufgabe.ueberschrift} <br><br></h2>' +
            '                </div>' +
            '                <div class="detail mt-5"> <small>${aufgabe.beschreibung}</small> </div>' +
            '                <div class="mt-3 d-flex justify-content-end px-2"> <button class="btn-submit">Done</button> </div>' +
            '            </div>' +
            '        </div>');
        todobody.append(todoentry);
    }
}
*/
function openModal() {
    var editModal = $('#modalLogin');
    editModal.modal('show');
}
function openLogin() {
    var Modal = $('#Login');
    Modal.modal('show');
}
