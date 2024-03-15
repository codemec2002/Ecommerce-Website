const increase_btn = document.getElementById("increase-quantity");
const decrease_btn = document.getElementById("decrease-quantity");


increase_btn.addEventListener('click', (event) => {
    const id = event.target.getAttribute("product_id");
    fetch("http://localhost:3000/increment", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": id
        }),
    });
})
decrease_btn.addEventListener('click', (event) => {
    const id = event.target.getAttribute("product_id");
    fetch("http://localhost:3000/decrement", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": id
        }),
    });
})