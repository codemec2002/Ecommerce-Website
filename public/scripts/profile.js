const form = document.getElementById("user-info");
const form_btn = document.getElementById("form-btn");
var name_input = document.getElementById("name");
var email_input = document.getElementById("email");
// console.dir(form);
// console.log(formData);
var elements = form.elements;
for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].readOnly = true;
}
var name_val=name_input.value, email_val=email_input.value;
name_input.addEventListener('change', (event) => {
    name_val = event.target.value;
    name_input.value=name_val;
    console.log(name_val);
});

email_input.addEventListener('change', (event) => {
    email_val = event.target.value;
    email_input.value=email_val;
    console.log(email_val);
})

form_btn.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.innerHTML == "Edit") {
        var elements = form.elements;
        for (var i = 0, len = elements.length; i < len; ++i) {
            elements[i].readOnly = false;
        }
        event.target.innerHTML = "Submit";
    } else {
        // const formDataObject = {};
        // formData.forEach((value, key) => {
        //     formDataObject[key] = value;
        // });

        fetch("http://localhost:3000/update_profile", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name_val,
                "email": email_val
            }),
        });
        var elements = form.elements;
        for (var i = 0, len = elements.length; i < len; ++i) {
            elements[i].readOnly = true;
        }

        event.target.innerHTML = "Edit";

    }
})