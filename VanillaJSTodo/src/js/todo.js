let tasks = [];

const render = (toDo) => {
  const list = document.querySelector('#toDo');
  list.insertAdjacentHTML('beforeend',
    `<li class="task check" id="task" data-key="${toDo.id}">
      <div class="title">${toDo.title}</div>
      <div class="desc">${toDo.desc}</div>
      <button class="remove" id="remove">X</button>
    </li>`);
};

const addToDo = (title, desc) => {
  const toDo = {
    title,
    desc,
    id: Date.now(),
  };
  tasks.push(toDo);
  render(toDo);
};

const remove = (key) => {
  tasks = tasks.filter((x) => x.id !== Number(key));
  const item = document.querySelector(`[data-key='${key}']`);
  item.remove();
};

const add = document.querySelector('#add');
add.addEventListener('click', (event) => {
  event.preventDefault();
  const titleInput = document.querySelector('#title');
  const title = titleInput.value.trim();
  const descInput = document.querySelector('#desc');
  const desc = descInput.value.trim();
  addToDo(title, desc);
  document.querySelector('#title').value = '';
  document.querySelector('#desc').value = '';
});

const doList = document.querySelector('#toDo');
doList.addEventListener('click', (event) => {
  if (event.target.classList.contains('check')) {
    event.target.classList.add('done');
    const completed = document.querySelector('#completed');
    completed.appendChild(event.target);
  }
});

const comList = document.querySelector('#completed');
comList.addEventListener('click', (event) => {
  if (event.target.classList.contains('check')) {
    event.target.classList.add('done');
    const toDo = document.querySelector('#toDo');
    event.target.classList.remove('done');
    toDo.appendChild(event.target);
  }
  if (event.target.classList.contains('remove')) {
    const toRemove = event.target.parentElement.dataset.key;
    remove(toRemove);
  }
});

window.onload = () => {
  const stored = JSON.parse(localStorage.getItem('tasks'));
  stored.forEach(element => {
  render(element)
  });
}

window.addEventListener("unload", () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });