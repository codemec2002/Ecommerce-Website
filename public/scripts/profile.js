const form = document.getElementById("user-info");
const form_btn = document.getElementById("form-btn");
// console.dir(form);


const formData = new FormData(form);
console.log(formData);
const formDataObject = {};
formData.forEach((value, key) => {
    formDataObject[key] = value;
});
console.log(formDataObject);


// console.log(formData);
var elements = form.elements;
for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].readOnly = true;
}
form_btn.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.innerHTML == "Edit") {
        var elements = form.elements;
        for (var i = 0, len = elements.length; i < len; ++i) {
            elements[i].readOnly = false;
        }
        event.target.innerHTML = "Submit";
    } else {
        fetch("http://localhost:3000/update_profile", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "msg": 200,
            })
        });
        var elements = form.elements;
        for (var i = 0, len = elements.length; i < len; ++i) {
            elements[i].readOnly = true;
        }

        event.target.innerHTML = "Edit";

    }
})