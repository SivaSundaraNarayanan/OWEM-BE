window.onscroll = () => {
  if (document.documentElement.scrollTop > 100) {
    document.getElementById("topbar").classList.remove("hidden");
  } else {
    document.getElementById("topbar").classList.add("hidden");
  }
};

const events = [
  {
    id: 1,
    title: "title1",
    description: "desc1",
    image: "./images/vedhiyalodu_vilayadu.jpg",
    from: "2-Aug-2020",
    to: "4-Aug-2020",
  },
  {
    id: 1,
    title: "title2",
    description: "desc2",
    image: "./images/vedhiyalodu_vilayadu.jpg",
    from: "3-Aug-2020",
    to: "13-Aug-2020",
  },
  {
    id: 1,
    title: "title3",
    description: "desc3",
    image: "./images/vedhiyalodu_vilayadu.jpg",
    from: "3-Aug-2020",
    to: "13-Aug-2020",
  },
  {
    id: 1,
    title: "title4",
    description: "desc4",
    image: "./images/vedhiyalodu_vilayadu.jpg",
    from: "3-Aug-2020",
    to: "13-Aug-2020",
  },
];

window.onload = () => {
  var list = document.getElementById("card-list");
  events.forEach((event) => {
    const card = generateCard(event);
    list.innerHTML += card;
  });
};

function generateCard({ title, description, image, from, to }) {
  const card = `<div class="card">
  <div class="image">
    <img src='${image}' />
  </div>
  <div class="card-header">
    <div class="title">
      ${title}
    </div>
    <div class="description">
      ${description}
    </div>
  </div>

  <div class="card-body">
    <span> ${new Date(from).toLocaleString("en-US", {
      dateStyle: "medium",
    })} </span>
    <span>
      to
    </span>
    <span> ${new Date(to).toLocaleString("en-US", {
      dateStyle: "medium",
    })} </span>
  </div>
  <button class="register-button">Register</button>
</div>`;
  return card;
}

function generateNode(type, classList, options, children) {
  var node = `<${type} class='${classList}' ${options[0]}='${options[1]}' ${
    children ? `>${children}</${type}` : "/>"
  }>`;
  return node;
}
