class Aufgabe {
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
    public toArray():[number, string, string, number, number] {
        return [this.user, this.ueberschrift, this.beschreibung,this.kategorie, this.prio];
    }
}

let taskText: JQuery;
let saveButton: JQuery;
let selectedCategory: JQuery;
let descriptionInput: JQuery;
let createButton:JQuery;
let categoryInp:JQuery;
let categoryBtn:JQuery;
let openModReg: JQuery;


$(() => {
    saveButton = $("#saveTask");
    saveButton.on('click', addTask);
    createButton=$("#createButton");
    createButton.on('click',create);
    categoryBtn = $("#saveCategory");
    categoryBtn.on('click', addCategory);
    openModReg = $('#registyMod');
    openModReg.on('click',openModal);
});

function addCategory() {
    categoryInp = $("#CategoryInput");
    let newCat: string = categoryInp.val().toString().trim();
    categoryInp.val("");
    $.ajax('http://localhost:8080/addCategory', {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
           newCat
        }),
        contentType: 'application/json',
        success: result => {
            console.log(result);
            //getTodolist;
        },
        error: jqXHR => {
            console.log(jqXHR);
        }
    })
}

function addTask() {
    taskText = $("#taskText");
    descriptionInput = $("#descriptionInput");
    selectedCategory = $("#categorySelect");
    let ueberschrift: string = taskText.val().toString().trim();
    let beschreibung: string = descriptionInput.val().toString().trim();
    let category: number = selectedCategory.val() as number;
    $.ajax('http://localhost:8080/addTask', {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            ueberschrift,
            beschreibung,
            category
        }),
        contentType: 'application/json',
        success: result => {
            console.log(result);
            //getTodolist;
        },
        error: jqXHR => {
            console.log(jqXHR);
        }
    })
}
function create(){
    let vorname:string = $("#vorname").val().toString().trim();
    let nachname:string = $("#nachname").val().toString().trim();
    let email = $("#inputEmail4").val().toString().trim();
    let passwort = $("#inputPassword4").val().toString().trim();
    event.preventDefault();

    $.ajax('http://localhost:8080/create', {
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            vorname:vorname,
            nachname:nachname,
            email:email,
            passwort:passwort
        }),

    }).then(() => {
        let editModal: JQuery = $('#modalLogin');
        editModal.modal("hide");
        alert("Willkomen, " + vorname);


    }).catch((jqXHR: JQueryXHR) => {
        alert(jqXHR.responseText)

    });
}

function getTodolist() {
    //ajax request for data
    $.ajax({
        url:'loadTasks',
        type:'get',
        dataType:'json',
        success:(response)=>{
            renderTodolist(response.todoList);
        },error:()=>{
            console.log("something went wrong")
        },

    }).then(()=>{});

}

function renderTodolist(todoList: Aufgabe[]){
    const todobody : JQuery=$('#todobody');

    todobody.empty();
    for (const aufgabe of todoList){
        const todoentry: JQuery =$(
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

function openModal(){
    let editModal: JQuery = $('#modalLogin');
    editModal.modal('show');
}

