(function () {
  'use strict';

  const WHATSAPP_NUMBER = 'YOUR_WHATSAPP_NUMBER';

  function buildWhatsAppUrl(message) {
    const number = (WHATSAPP_NUMBER || '').toString().replace(/\D/g, '');
    if (!number) return '#';
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
  }

  const form = document.getElementById('bookingForm');
  const formStatus = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        service: document.getElementById('service'),
        budget: document.getElementById('budget'),
        message: document.getElementById('message')
      };

      let isValid = true;

      Object.entries(fields).forEach(([key, input]) => {
        if (!input) return;

        if (!input.value.trim()) {
          input.setAttribute('aria-invalid', 'true');
          isValid = false;
        } else {
          input.setAttribute('aria-invalid', 'false');
        }
      });

      if (!isValid) {
        if (formStatus) {
          formStatus.textContent = 'Please fill in all required fields before continuing.';
          formStatus.classList.add('is-visible', 'is-error');
          formStatus.classList.remove('is-success');
        }
        return;
      }

      const data = {
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        phone: fields.phone.value.trim(),
        service: fields.service.value.trim(),
        budget: fields.budget.value.trim(),
        message: fields.message.value.trim()
      };

      const successMessage = 'Thanks, ' + data.name + '! Your project request is ready. You can send it through WhatsApp or continue with a follow-up.';

      if (formStatus) {
        formStatus.textContent = successMessage;
        formStatus.classList.remove('is-error');
        formStatus.classList.add('is-visible');
      }

      const whatsAppButton = document.getElementById('whatsappSubmit');
      if (whatsAppButton) {
        const message = [
          'Hello CreativePro Design,',
          'I would like to discuss a project.',
          '',
          'Name: ' + data.name,
          'Email: ' + data.email,
          'Phone: ' + data.phone,
          'Service Needed: ' + data.service,
          'Budget: ' + data.budget,
          'Project Description: ' + data.message
        ].join('\n');

        whatsAppButton.setAttribute('href', buildWhatsAppUrl(message));
        whatsAppButton.setAttribute('target', '_blank');
        whatsAppButton.setAttribute('rel', 'noopener noreferrer');
      }

      form.reset();
    });
  }
})();
