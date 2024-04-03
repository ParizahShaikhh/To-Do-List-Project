#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import Table from "cli-table3";
var Commands;
(function (Commands) {
    Commands["add"] = "Add New To Do";
    Commands["delete"] = "Remove To Do from List";
    Commands["view"] = "View your To Do List";
    Commands["quit"] = "Quit";
})(Commands || (Commands = {}));
let todos = [];
let loop = true;
async function main() {
    while (loop) {
        const OptionSelect = await inquirer.prompt([
            {
                name: "Commands",
                type: "list",
                message: chalk.yellow("Select an option"),
                choices: Object.values(Commands),
            },
        ]);
        switch (OptionSelect.Commands) {
            case Commands.add:
                await addToDo();
                break;
            case Commands.delete:
                await deleteToDo();
                break;
            case Commands.view:
                await viewToDoList();
                break;
            case Commands.quit:
                await quitProgram();
                break;
            default:
                break;
        }
    }
    async function addToDo() {
        let todoInput = await inquirer.prompt([
            {
                name: "todo",
                type: "input",
                message: chalk.yellow("Enter your new todo:"),
            },
        ]);
        todos.push(todoInput.todo);
        console.log(chalk.green("ToDo added successfully!"));
    }
}
async function deleteToDo() {
    if (todos.length === 0) {
        console.log(chalk.red("No todos to delete"));
        return;
    }
    const todoToDelete = await inquirer.prompt([
        {
            name: "todo",
            type: "list",
            message: chalk.yellow("Select todo to delete"),
            choices: todos,
        },
    ]);
    let index = todos.indexOf(todoToDelete.todo);
    todos.splice(index, 1);
    console.log(chalk.green("ToDo deleted successfully!"));
}
async function viewToDoList() {
    console.log(chalk.magenta("Your ToDo List"));
    let table = new Table({
        head: (["#", "Todo"])
    });
    todos.forEach((todo, index) => {
        table.push([index + 1, todo]);
    });
    console.log(table.toString());
}
async function quitProgram() {
    loop = false;
    console.log(chalk.blueBright(`Thank You! Have a great day.`));
}
console.log("**".repeat(6) +
    chalk.blue.bold.italic("Welcome to the " + chalk.magenta("TaskForge CLI") + " , the ultimate CLI TODO APP") +
    "**".repeat(6));
main();
