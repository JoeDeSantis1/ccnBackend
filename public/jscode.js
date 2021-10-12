// const connectToDB = require('./dbConnection');

class Nurse {
    constructor(firstName, lastName, clinicalLadder, hireDate, skills) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._clinicalLadder = clinicalLadder
        this._hireDate = hireDate;
        this._skills = skills;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName; 
    }

    get fullName() {
        return `${this._firstName} ${this._lastName}`;
    }

    get clinicalLadder() {
        return this._clinicalLadder;
    }

    get hireDate() {
        return this._hireDate;
    }

    get skills() {
        return this._skills.join(",  ");
    }

    set firstName(name) {
        this._firstName = name;
    }

    set lastName(name) {
        this._lastName = name;
    }

    set clinicalLadder(cl) {
        this._clinicalLadder = cl;
    }

    set newSkill(skill) {
        this._skills.push(skill);
    }

    // add an 'and' to the list of skills if the nurse has more than one skill
    addAnd(array) {
        if (array.length > 1) {
            array[array.length - 1] = `and ${array[array.length - 1]}`;
        }
        return array.join(", ")
    }

    nurseInformation() {
        document.getElementById("result").innerHTML = `${this.fullName} is clinical ladder level ${this.clinicalLadder} hired on ${this.hireDate}. Skills are as follows: ${this.addAnd(this._skills)}.`;
    }
}

const gatherData = () => {
    const nurseID = document.getElementById("nurseID").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const clinicalLadder = document.getElementById("clinicalLadder").value;
    let skillsArray = [];
    if (document.getElementById("skillCharge").checked) {
        skillsArray.push(document.getElementById("skillCharge").value);
    };
    if (document.getElementById("skillResource").checked) {
        skillsArray.push(document.getElementById("skillResource").value);
    };
    if (document.getElementById("skillDR").checked) {
        skillsArray.push(document.getElementById("skillDR").value);
    };
    if (document.getElementById("skillECMO").checked) {
        skillsArray.push(document.getElementById("skillECMO").value);
    };
    if (document.getElementById("skillPreceptor").checked) {
        skillsArray.push(document.getElementById("skillPreceptor").value);
    };
    connectToDB.startConncetion();
    connectToDB.addNurseName(nurseID, firstName, lastName, clinicalLadder, skillsArray.join(", "));
  //  const nurse = new Nurse(firstName, lastName, clinicalLadder, constructDate(), skillsArray);
  //  nurse.nurseInformation();
  //  return nurse
}

const buttonClick = () => {
    gatherData()
}

const showStepdownNextNurses = () => {
    let firstNurse = document.getElementById("tdName1");
    let secondNurse = document.getElementById("tdName2");
    let ThirdNurse = document.getElementById("tdName3");
   // firstNurse.innerHTML = 
}

const checkDayWithMonth = () => {
    let monthName = document.getElementById("month");
    let selectedMonth = monthName.options[monthName.selectedIndex].value;
    let dayNum = document.getElementById("dayNum").value;
    console.log(selectedMonth);
    switch (selectedMonth) {
        case 'April':
            if (dayNum > 30) {
                alert(selectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "June":
            if (dayNum > 30) {
                alert(selectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "September":
            if (dayNum > 30) {
                alert(selectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "November":
            if (dayNum > 30) {
                alert(mselectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "February":
            if (dayNum > 28) {
                alert(selectedMonth + " only has 28 days! Please enter a valid day.");
            }
            break;
        default:
            if (dayNum > 31) {
                alert(selectedMonth + " only has 31 days! Please enter a valid day.");
            }
            break;
    }
};

const checkCCNDayWithMonth = () => {
    let monthName = document.getElementById("CCNmonth");
    let selectedMonth = monthName.options[monthName.selectedIndex].value;
    let dayNum = document.getElementById("CCNdayNum").value;
    console.log(selectedMonth);
    switch (selectedMonth) {
        case 'April':
            if (dayNum > 30) {
                alert(selectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "June":
            if (dayNum > 30) {
                alert(selectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "September":
            if (dayNum > 30) {
                alert(selectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "November":
            if (dayNum > 30) {
                alert(mselectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "February":
            if (dayNum > 28) {
                alert(selectedMonth + " only has 28 days! Please enter a valid day.");
            }
            break;
        default:
            if (dayNum > 31) {
                alert(selectedMonth + " only has 31 days! Please enter a valid day.");
            }
            break;
    }
};

const checkYear = () => {
    let selectedYear = document.getElementById("year").value;
    console.log(selectedYear);
    if (selectedYear < 1920 || selectedYear > 2020) {
        alert("That year is out of range, Please select a valid year.")
    }
};

const checkCCNYear = () => {
    let selectedYear = document.getElementById("CCNyear").value;
    console.log(selectedYear);
    if (selectedYear < 1920 || selectedYear > 2020) {
        alert("That year is out of range, Please select a valid year.")
    }
};
