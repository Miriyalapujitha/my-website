document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nameEl = document.getElementById("name");
    const phoneEl = document.getElementById("phone");
    const dateEl = document.getElementById("date");
    const messageEl = document.getElementById("message");

    // ===== VALIDATION =====
    if (!nameEl.value || !phoneEl.value || !dateEl.value) {
      alert("Please fill all required fields");
      return;
    }

    if (!/^[0-9]{10}$/.test(phoneEl.value)) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    const data = {
      name: nameEl.value,
      phone: phoneEl.value,
      date: dateEl.value,
      message: messageEl.value
    };

    try {
      // ✅ SAVE TO BACKEND (YOUR DOMAIN)
      const res = await fetch("https://krishnacateringservices.in/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      // ❗ Check if request successful
      if (!res.ok) {
        throw new Error("Failed to save order");
      }

      // ===== WHATSAPP MESSAGE =====
      const text = 
`Hello, I would like to book catering service.

Name: ${data.name}
Phone: ${data.phone}
Event Date: ${data.date}
Details: ${data.message}`;

      const url = "https://wa.me/919542743678?text=" + encodeURIComponent(text);

      form.reset();

      // ✅ Redirect to WhatsApp
      window.open(url, "_self");

    } catch (err) {
      alert("Error submitting form ❌");
      console.log(err);
    }

  });

});
