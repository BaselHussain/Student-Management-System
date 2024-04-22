import inquirer from "inquirer";
function generateStudentID() {
    var ID = Math.floor(1000 + Math.random() * 9000).toString();
    return ID;
}
class Student {
    name;
    ID;
    age;
    balance;
    courses;
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.ID = generateStudentID();
        this.balance = 0;
        this.courses = [];
    }
    enrollCourses(courseName) {
        this.courses.push(courseName);
    }
    viewBalance() {
        console.log(`Balance for ${this.name}: is $${this.balance}}`);
    }
    payTuitionFees(amount) {
        this.balance = -amount;
        console.log(`${amount} paid by ${this.name}`);
        this.viewBalance;
    }
    showStatus() {
        console.log(`Student ID: ${this.ID}`);
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
        console.log(`Courses Enrolled: ${this.courses.join(', ')}`);
        this.viewBalance();
    }
}
class Course {
    name;
    constructor(name) {
        this.name = name;
    }
}
var students = [];
var courses = [
    new Course("English"),
    new Course("Physics"),
    new Course("Chemistry")
];
console.log("Welcome to Student Management System");
var condition = true;
//While Loop starts
while (condition) {
    var question = await inquirer.prompt([{
            name: "first",
            type: "list",
            message: "What do you want to do?",
            choices: ["Add student", "Enroll student in a course", "Pay tuition fee", "Show status", "View Balance", "Exit"]
        }]);
    if (question.first === "Add student") {
        var answers = await inquirer.prompt([{
                name: "Studentname",
                type: "input",
                message: "Please enter the name of student"
            }]);
        if (!answers.Studentname) {
            throw new Error("Please enter something");
        }
        var answers2 = await inquirer.prompt([
            {
                name: "age",
                type: "number",
                message: "Please enter the age of student"
            }
        ]);
        //Rest of the code
        const newStudent = new Student(answers.Studentname, answers2.age);
        students.push(newStudent);
        console.log(`Student ${answers.Studentname} of age ${answers.age} added with Id ${newStudent.ID}`);
    }
    else if (question.first === "Enroll student in a course") {
        var answers = await inquirer.prompt([{
                name: "student",
                type: "list",
                choices: students.map((student) => ({ name: student.name, value: student }))
            }, {
                name: "courses",
                type: "list",
                message: "Please enter the courses you want to enroll in",
                choices: courses.map(courses => courses.name)
            }]);
        answers.student.enrollCourses(answers.courses);
        console.log(`Student ${answers.student.name} enrolled in ${answers.courses}`);
    }
    else if (question.first === "Pay tuition fee") {
        var answers = await inquirer.prompt([{
                name: "student",
                type: "list",
                choices: students.map((student) => ({ name: student.name, value: student }))
            }, {
                name: "fees",
                type: "number",
                message: "Please enter the amount you want to pay"
            }]);
        answers.student.payTuitionFees(answers.fees);
    }
    else if (question.first === "Show status") {
        var answers = await inquirer.prompt([{
                name: "student",
                type: "list",
                message: "Select the students you want to check status",
                choices: students.map((student) => ({ name: student.name, value: student }))
            }]);
        answers.student.showStatus();
    }
    else if (question.first === "View Balance") {
        var answers = await inquirer.prompt([{
                name: "student",
                type: "list",
                message: "Select the students you want to check status",
                choices: students.map((student) => ({ name: student.name, value: student }))
            }]);
        answers.student.viewBalance();
    }
    else {
        process.exit(0);
    }
    var options = await inquirer.prompt([{
            name: "DoSomething",
            type: "confirm",
            default: false
        }]);
    condition = options.DoSomething;
}
