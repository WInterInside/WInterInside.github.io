"use strict"

document.addEventListener('DOMContentLoaded' function() {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let formData = new FormData(form);
    formData.append();
    let response = await fetch ('sendmail.php', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      let result = await response.json();
      alert(result.message);
      form.reset();
    } else {
      alert("Error");
    }
  }
});
