const constructDate = (year, month, day) => {
    switch (month) {
        case "January":
            month = "01";
            break;
        case "February":
            month = "02";
            break;
        case "March":
            month = "03";
            break;
        case "April":
            month = "04";
            break;
        case "May":
            month = "05";
            break;
        case "June":
            month = "06";
            break;
        case "July":
            month = "07";
            break;
        case "August":
            month = "08";
            break;
        case "September":
            month = "09";
            break;
        case "October":
            month = "10";
            break;
        case "November":
            month = "11";
            break;
        case "December":
            month = "12";
            break;
    }
    return `${year.toString()}-${month}-${day.toString()}`;
}

const constructSkills = (obj) => {
    skillsArray = [];
    for (let [key, value] of Object.entries(obj)) {
        if (key.startsWith('skill')){
            skillsArray.push(value);
        }
    }
    if (skillsArray.length > 1) {
        return skillsArray.join(", ");
    } else if (skillsArray.length == 0) {
        return 'null';
    } else {
        return skillsArray[0];
    };
};

module.exports = {constructDate, constructSkills};

