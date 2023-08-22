let email = document.querySelector("#mail");
let userName = document.querySelector("#username");
let pass = document.querySelector("#pass");
let fullName = document.querySelector("#fullName");
let form = document.forms[0];
let form_type = document.querySelector("#formType");
let target_row = document.querySelector("#targetRow");

let users = [];

function getData(event) {
  event.preventDefault();

  let user = {
    userEmail: email.value,
    userName: userName.value,
    pass: pass.value,
    fullName: fullName.value,
  };

  if (form_type.value === "create") {
    users.push(user);
  } else if (form_type.value === "update") {
    users[target_row.value] = user;
    form_type.value = "create"
  }

  showData(users);
  resetForm();
  localStorage.setItem("users", JSON.stringify(users));
}

function showData(arr) {
  let row = "";
  arr.map((userData, i) => {
    row +=
      `
      <tr>
            <td scope="row">${i + 1}</td>
            <td >${userData.userEmail}</td>
            <td>${userData.userName}</td>
            <td>${userData.pass}</td>
            <td>${userData.fullName}</td>
            <td>
            <button class="btn btn-danger border-radius-circle del"  data-user="` +
      i +
      `">Delete</button>
            <button class="btn btn-info border-radius-circle update"  data-user="` +
      i +
      `">Update</button>
        </td>
      </tr>
      `;
  });

  document.getElementById("tableOfusersDta").innerHTML = row;
}

function deleteUser(ev) {
  if (ev.target.matches(".del")) {
    let uniqueUserId = ev.target.dataset.user;
    users.splice(uniqueUserId, 1);
    showData(users);
    localStorage.setItem("users", JSON.stringify(users));
  }
}

function updateuserData(ev) {
  if (ev.target.matches(".update")) {
    let uniqueUserId = ev.target.dataset.user;
    email.value = users[uniqueUserId].userEmail;
    userName.value = users[uniqueUserId].userName;
    pass.value = users[uniqueUserId].pass;
    fullName.value = users[uniqueUserId].fullName;
    form_type.value = "update";
    target_row.value = uniqueUserId;
    showData(users);
    localStorage.setItem("users", JSON.stringify(users));
  }
}

function resetForm() {
  email.value = "";
  userName.value = "";
  pass.value = "";
  fullName.value = "";
}

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
  showData(users)
}

document.addEventListener("click", deleteUser);
document.addEventListener("click", updateuserData);
form.addEventListener("submit", getData);
