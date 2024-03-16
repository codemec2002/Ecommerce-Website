const add_btn = document.getElementById("add_address");
console.dir(add_btn);
add_btn.addEventListener('click', (event) => {
    console.log("here");
    location.href='http://localhost:3000/add_address';
})