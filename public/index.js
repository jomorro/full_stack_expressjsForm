const userCreateForm = document.getElementById("user-create-form")
const userCreateSubmitButton = userCreateForm.querySelector("button[type='submit']")
const submissionSuccessDisplayNode = document.getElementById("submission-status"); 

userCreateSubmitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const username = document.querySelector('input[name="username"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const zip_code = document.querySelector('input[name="zip-code"]').value;
    const fav_color = document.querySelector('input[name="fav-color"]').value;
    const User = {
        username,
        email,
        zip_code,
        fav_color
    };

    const jsonUser = JSON.stringify(User);

    fetch('/api/user/', {
        method: "POST",
        headers: {
            'Content-Type': "application/json; charset=utf-8"
        },
        body: jsonUser
    }).then(response => {
        // console.log(response);
        if (response.status == 201) {
            console.log("successfully added");
            const successText = document.createTextNode('Your account as been successfully submitted!');
            submissionSuccessDisplayNode.innerHTML = "";
            submissionSuccessDisplayNode.appendChild(successText);
        } else if (response.status == 409) {
            console.log('username already in use');
            const failureText = document.createTextNode('That user name already in use.');
            submissionSuccessDisplayNode.innerHTML = '';
            submissionSuccessDisplayNode.appendChild(failureText);
        }
        return response.json();
    })
    .then(responseObject => {
        console.log("response:\n", responseObject);
    });
});