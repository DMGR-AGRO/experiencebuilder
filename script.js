const items = document.querySelectorAll('.item');
const dialog = document.getElementById('dialog');

items.forEach(item => {
  item.addEventListener('mouseover', () => {
    const content = item.getAttribute('data-content');
    showDialog(content, item);
  });

  item.addEventListener('mouseleave', () => {
    dialog.style.display = 'none';
  });
});

function showDialog(content, item) {
  dialog.innerText = content;
  dialog.style.display = 'block';
  dialog.style.top = `${item.offsetTop + item.offsetHeight}px`;
  dialog.style.left = `${item.offsetLeft}px`;
}
