"use strict";

const form = document.querySelector(".form");
const name = document.querySelector("#name");
const age = document.querySelector("#age");
const city = document.querySelector("#city");
const married = document.querySelector("#married");
const salary = document.querySelector("#salary");
const prof = document.querySelector("#prof");

const submitBtn = document.querySelector("input[type='submit']");

const table = document.querySelector(".table");

class Person {
  constructor(name, age, city, married) {
    this.name = name;
    this.age = age;
    this.city = city;
    this.married = married;
    this.id = Math.floor(Math.random() * 1000);
  }
  static deleteItem(personId) {
    const persons = JSON.parse(localStorage.getItem("persons"));
    const index = persons.findIndex((item) => item.id == personId);
    if (index !== -1) {
      persons.splice(index, 1);
    }

    form.reset();
    localStorage.setItem("persons", JSON.stringify(persons));
    console.log("новый persons", persons);
    renderTable();
  }
}

class Driver extends Person {
  constructor(name, age, city, married, salary, skills = []) {
    super(name, age, city, married);
    this._skills = skills;
    this._salary = salary;
  }
  get salary() {
    return this._salary;
  }
  set skills(str) {
    this._skills.push(str);
  }
}

class FrontEndDev extends Person {
  constructor(name, age, city, married, salary, skills = []) {
    super(name, age, city, married);
    this._skills = skills;
    this._salary = salary;
  }
  get salary() {
    return this._salary;
  }
  set skills(str) {
    this._skills.push(str);
  }
}

const renderTable = () => {
  table.innerHTML = "";
  let persons = JSON.parse(localStorage.getItem("persons")) || [];
  if (persons.length > 0) {
    persons.forEach((person) => {
      const divRow = document.createElement("div");
      divRow.classList.add("row");
      table.append(divRow);

      for (const key in person) {
        if (key !== "id") {
          const divCol = document.createElement("div");
          divCol.classList.add("col");
          divRow.append(divCol);
          divCol.innerHTML = person[key];
        }
      }
      const divCol = document.createElement("div");
      divCol.classList.add("col");
      divRow.append(divCol);
      divCol.innerHTML = "<button class='delete'>Удалить</button>";
      const btn = divCol.querySelector(".delete");
      btn.addEventListener("click", () => Person.deleteItem(person.id));
    });
  }
};
renderTable();

const fill = (event) => {
  event.preventDefault();
  if (form.checkValidity()) {
    let persons = JSON.parse(localStorage.getItem("persons")) || [];
    if (prof.value == 1) {
      const driver = new Driver(name.value, age.value, city.value, married.checked, salary.value);
      driver.skills = "Driving";
      driver.skills = "Repair";

      persons.push(driver);
    } else {
      const frontEndDev = new FrontEndDev(
        name.value,
        age.value,
        city.value,
        married.checked,
        salary.value,
      );
      frontEndDev.skills = "Coding";
      frontEndDev.skills = "Use FrameWorks";

      persons.push(frontEndDev);
    }

    localStorage.setItem("persons", JSON.stringify(persons));
    renderTable();
    form.reset();
  } else {
    alert("Заполните все поля формы!");
  }
};
submitBtn.addEventListener("click", fill);
