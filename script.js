const items = document.querySelectorAll('.item');
const dialog = document.getElementById('dialog');
const rectangle = document.getElementById('rectangle');

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
  dialog.innerText = content; // No need to replace \n, as white-space: pre- wrap; will handle it
  dialog.style.display = 'block';
  dialog.style.fontSize = ''; // Reset font size
  dialog.classList.remove('small'); // Remove small class if present

  // Temporarily display the dialog off-screen to measure its size
  dialog.style.top = '-9999px';
  dialog.style.left = '-9999px';

  // Measure the dialog width and height
  const dialogWidth = dialog.offsetWidth;
  const dialogHeight = dialog.offsetHeight;

  // Calculate the position
  let top = item.offsetTop + item.offsetHeight;
  let left = item.offsetLeft + item.offsetWidth / 2 - dialogWidth / 2;

  // Adjust if out of bounds
  if (left < 0) left = 10; // Add some padding
  if (left + dialogWidth > rectangle.offsetWidth) left = rectangle.offsetWidth - dialogWidth - 10;
  if (top + dialogHeight > rectangle.offsetHeight) top = item.offsetTop - dialogHeight;

  // Check if the dialog exceeds the rectangle's boundaries
  if (left < 10 || top < 0 || left + dialogWidth > rectangle.offsetWidth - 10 || top + dialogHeight > rectangle.offsetHeight) {
    dialog.classList.add('small');
    dialog.style.fontSize = '12px'; // Adjust font size if needed

    // Recalculate sizes with the smaller font
    dialog.style.top = '-9999px';
    dialog.style.left = '-9999px';
    const newDialogWidth = dialog.offsetWidth;
    const newDialogHeight = dialog.offsetHeight;

    // Recalculate positions with new sizes
    top = item.offsetTop + item.offsetHeight;
    left = item.offsetLeft + item.offsetWidth / 2 - newDialogWidth / 2;

    if (left < 0) left = 10; // Add some padding
    if (left + newDialogWidth > rectangle.offsetWidth) left =  rectangle.offsetWidth - newDialogWidth - 10;
    if (top + newDialogHeight > rectangle.offsetHeight) top = item.offsetTop - newDialogHeight;
  }

  // Update the dialog position
  dialog.style.top = `${top}px`;
  dialog.style.left = `${left}px`;

  // Check for any overflows again to ensure the dialog is fully visible
  if (dialog.offsetLeft < 0 || dialog.offsetTop < 0 || dialog.offsetLeft + dialog.offsetWidth > rectangle.offsetWidth || dialog.offsetTop + dialog.offsetHeight > rectangle.offsetHeight) {
    dialog.style.top = '10px'; // Position at the top with padding
    dialog.style.left = '10px'; // Position at the left with padding
  }
}
