"use strict";
import { getLoggedInUserName } from "./utils/dataUtils.js";
import * as types from "./backend/types.js"; //Make sure types.ts is compiled

function Login() {
  const hash = Object.fromEntries(a.map((e) => [e.name, e.password]));

  var username = document.getElementById("uname").value;
  var password = document.getElementById("psw").value;

  for (let key of hash) {
    if (key[0] === username && key[1] === atob(password)) {
      alert("Login successful");
    } else {
      alert("Login fail");
    }
  }
}
