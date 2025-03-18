const postForm = document.getElementById('postForm');
const blogPosts = document.getElementById('blogPosts');
const clearAllBtn = document.getElementById('clearAll');

window.addEventListener('load', () => {
  const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
  savedPosts.forEach(post => mostrarPost(post.name, post.title, post.content, post.date));
});

postForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('studentName').value;
  const title = document.getElementById('postTitle').value;
  const content = document.getElementById('postContent').value;
  const date = new Date().toLocaleString();

  mostrarPost(name, title, content, date);
  guardarPost(name, title, content, date);

  postForm.reset();
});

function mostrarPost(name, title, content, date) {
  const postDiv = document.createElement('div');
  postDiv.classList.add('post');

  const metaInfo = document.createElement('div');
  metaInfo.classList.add('meta');
  metaInfo.textContent = Publicado {name}  {date};

  const postTitle = document.createElement('h2');
  postTitle.textContent = title;

  const postContent = document.createElement('p');
  postContent.textContent = content;

  postDiv.appendChild(metaInfo);
  postDiv.appendChild(postTitle);
  postDiv.appendChild(postContent);

  blogPosts.prepend(postDiv);
}

function guardarPost(name, title, content, date) {
  const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
  savedPosts.push({ name, title, content, date });
  localStorage.setItem('posts', JSON.stringify(savedPosts));
}

clearAllBtn.addEventListener('click', () => {
  if (confirm('¿Seguro que deseas borrar todos los posts?')) {
    localStorage.removeItem('posts');
    blogPosts.innerHTML = '';
  }
});