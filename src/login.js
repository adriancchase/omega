function Login() {
  const a = new Array();
  const up1 = new Object();
  const up2 = new Object();

  up1 = {
    name: "[abcd@gmail.com](mailto:abcd@gmail.com)",
    password: btoa("abc@12"),
  };

  up2 = {
    name: "[bcd@gmail.com](mailto:bcd@gmail.com)",
    password: btoa("bcd@12"),
  };

  a.push(up1);
  a.push(up2);

  const username = document.getElementById("exampleInputEmail1").value;
  const password = document.getElementById("exampleInputPassword1").value;

  sessionStorage.setItem("currentloggedin", username);

  localStorage.setItem("all_users", JSON.stringify(a));

  a = JSON.parse(localStorage.getItem("all_users"));

  a.push({ name: username, password: password });

  localStorage.setItem("name", JSON.stringify(a));
}

async function createPost() {
  const start = document.getElementById("startTimeInput").value;
  const end = document.getElementById("endTimeInput").value;
  const location = document.getElementById("locationInput").value;
  const userName = getLoggedInUserName();

  const res = await fetch("user/new", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      author: userName,
      attendees: [userName],
      location,
      timeInterval: { start, end },
      chatId: "",
      visibleTo: [userName],
    }),
  });

  document.getElementById("createPostInfo").innerText = res.ok
    ? "Post created successfully!"
    : "Failed to create post.";

  await displayPosts();
}
