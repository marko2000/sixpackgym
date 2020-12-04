$(window).on('scroll', function() {
    if ($(window).scrollTop()) {
        $('nav').addClass('black');
    } else {
        $('nav').removeClass('black');
    }
})

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// SKRIPTA ZA STRANICU TERMINI>HTML

$(document).ready(function() {

    // jQuery methods go here...
    // stranica Termini

    //selektori za stranicu termini:

    let username = document.querySelector("#username");
    let accessCode = document.querySelector("#accessCode");
    let btnNext2 = document.querySelector(".next2");
    let btnNext1 = document.querySelector(".next1");
    let btnNext3 = document.querySelector(".next3");
    let btnSubmit = document.querySelector(".submit");
    let btnChangeUser = document.querySelector(".changeUser");
    const radios = document.querySelectorAll("input[type='radio'][name='tip']");
    let date = document.querySelectorAll("input[type='date'][name='date']");

    let newTraining = {};
    const trainers = ["Luka Marinkovic", "Vasilije Mijuskovic", "Marko Milenkovic"]


    // treba nam da vratimo nekog random trenera iz niza trenera
    const getrandomTrainer = (trainers) => trainers[Math.floor(Math.random() * trainers.length)]

    const hide = (element) => document.querySelector(element).classList.add("hidden");
    const reveal = (element) => document.querySelector(element).classList.remove("hidden");
    const areValidUsernameAndCode = (username, accessCode) => {
        return username.value !== null && accessCode.value !== null &&
            username.value.length > 1 && accessCode.value.length === 6
    }

    // funkcija koja na osnovu prosledjenog input polja proverava da li je uneseni datum validan
    const isValidDate = (dateInput) => {
            let selectedDate = collectDate(dateInput);
            let currentDate = new Date();
            if (currentDate < selectedDate &&
                selectedDate.getFullYear != null && selectedDate.getFullYear != undefined &&
                selectedDate.getMonth != null && selectedDate.getMonth != undefined &&
                selectedDate.getDate != null && selectedDate.getDate != undefined) {
                console.log("godina: " + selectedDate.getFullyear);
                console.log("mesec: " + selectedDate.getMonth);
                console.log("dan: " + selectedDate.getDate);

                return true;
            } else return false;
        }
        // funkcija koja na osnovu prosledjenog input pola za datum vraca datum koji je unesen
    const collectDate = (dateInput) => {
        let date = dateInput.val().split("-");
        day = date[2];
        console.log("dan " + day)
        month = date[1];
        console.log("mesec " + month)
        year = date[0];
        console.log("godina " + year)
        let selectedDate = new Date()
        selectedDate.setFullYear(date[0]);
        selectedDate.setMonth(date[1] - 1); //iz nekog razloga vraca mesec za jedan vise
        selectedDate.setDate(date[2]);
        return selectedDate;
    }

    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // ovde resavamo event listener-e


    btnNext1.addEventListener('click', () => {
        if (areValidUsernameAndCode(username, accessCode)) {
            reveal("#div2");
            newTraining.user = username.value;
            newTraining.code = accessCode.value;
            window.scrollTo(0, 300);

            // treba mi da podesim visinu nakon pritiska da bude min-content
            document.querySelector(".pageTermini").style.height = "100%";
        } else reveal(".error1")


    });

    // ako je npr korisnik prvo napravio gresku pojavila mu se poruka o tome, medjutim cim pokusa da promeni unos poruka se  sklanja
    accessCode.addEventListener('keydown', () => hide(".error1"))
    username.addEventListener('keydown', () => hide(".error1"))

    //kad neko klikne na deo gde su radio dugmici tad treba da selektujemmo ovo dole
    let type; //u ovoj promenljivoj cuvamo tip terninga
    let isChecked = false; //ovo nam treba za listener posle

    radios.forEach(radio => radio.addEventListener('change', () => {
        isChecked = true;
        type = radio.value;
        newTraining.type = type;

        // ako je ispisana dole poruka o gresci onda pri promeni nekoj treba da je sklonimo
        hide(".error2");
    }))

    // klikom na dugme dalje se otkriva unos za datum ukoliko je neka od vrsta treninga oznacena
    btnNext2.addEventListener('click', () => {
        if (isChecked) {
            reveal("#div3");
            window.scrollTo(0, 500);

        } else reveal(".error2");
    })


    btnNext3.addEventListener('click', () => {

        if (isValidDate($('#date'))) {
            reveal("#div4");
            window.scrollTo(0, 900);

            newTraining.date = `${day}.${month}.${year}.`;
            hide(".error3");
            console.log("ovde se sakriva poruka o gresci");
        } else {
            reveal(".error3");
            console.log("greska datum");
            hide(".submitSpace");
        }

    })

    const addCellToTable = (newRow, data) => {
        newCell = newRow.insertCell();
        newCell.appendChild(document.createTextNode(data));
    }

    btnSubmit.addEventListener('click', () => {
        let newRow = document.querySelector(".table").insertRow();

        // ovde u red dodajemo vrstu treninga
        addCellToTable(newRow, newTraining.type);
        // sad dodajemo datum
        addCellToTable(newRow, newTraining.date);

        // dodajemo izabranog trenera
        addCellToTable(newRow, getrandomTrainer(trainers));

        /////////////////////
        // sad resetujemo sve ulaze sem korisnickog imena i koda
        $('#date').val("");
        document.querySelectorAll("input[type=radio][name=tip]").forEach((el) => el.checked = false);
        hide("#div2");
        hide("#div3");
        hide("#div4");
        reveal(".tableSection");
        reveal(".changeUser");

        reveal(".success");
        window.scrollTo(0, 300);
        // kad se prikaze poruka za uspesan unos odmah nakon nekog vremena se gubi
        setTimeout(() => hide(".success"), 2500)
    })

    btnChangeUser.addEventListener('click', () => {
        username.value = "";
        accessCode.value = null;
        console.log("brisanje sadrzaja inputa za ime i kod")
    })


});



// -----------------------------------------
// HAMBURGER
let isHamburgerClicked = false;

function myFunction() {
    var x = document.querySelector("nav");
    if (!isHamburgerClicked) x.className += " responsive";
    else x.className = "";
    isHamburgerClicked = !isHamburgerClicked;
}