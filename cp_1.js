const form = document.getElementById('feedback-form');
const feedbackDisplay = document.getElementById('feedback-display');
const charCount = document.getElementById('char-count');

// Event delegation: listen on form for inputs
form.addEventListener('input', (e) => {
  if (e.target.id === 'comments') {
    charCount.textContent = `${e.target.value.length} characters`;
  }
});

// Tooltip handling (mouseover / mouseout)
form.addEventListener('mouseover', (e) => {
  const tooltip = e.target.parentElement.querySelector('.tooltip');
  if (tooltip) tooltip.style.display = 'block';
});

form.addEventListener('mouseout', (e) => {
  const tooltip = e.target.parentElement.querySelector('.tooltip');
  if (tooltip) tooltip.style.display = 'none';
});

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const comments = document.getElementById('comments');

  let valid = true;

  [name, email, comments].forEach((field) => {
    if (field.value.trim() === '') {
      field.classList.add('error');
      valid = false;
    } else {
      field.classList.remove('error');
    }
  });

  if (!valid) {
    alert('Please fill in all fields!');
    return;
  }

  // Create new feedback entry
  const feedbackEntry = document.createElement('div');
  feedbackEntry.classList.add('feedback-entry');
  feedbackEntry.innerHTML = `
    <p><strong>${name.value}</strong> (${email.value})</p>
    <p>${comments.value}</p>
    <hr>
  `;

  feedbackDisplay.appendChild(feedbackEntry);

  // Reset form
  form.reset();
  charCount.textContent = '0 characters';
});

// Prevent background clicks from triggering form events
document.body.addEventListener('click', (e) => {
  e.stopPropagation();
});
