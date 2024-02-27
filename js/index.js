import data from '../data.json' assert { type: 'json'};
const addMemberFormEL = document.querySelector('#memberForm');

//Members Array
var membersArr = data

// Table Eleement
const myTableEl = document.getElementById('myTable')

addMemberFormEL.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(addMemberFormEL);
    if(formData.get('date') === ''){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        formData.append('date', today)
    }
    const dataJson = Object.fromEntries(formData);

    membersArr.push(dataJson);

  fetch('http://localhost:5000/api/members', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(membersArr)
    })
    
    refreshTable()
})

function deleteMember(id){

    console.log('in frontend')
    membersArr.splice(id, 1);

    fetch('http://localhost:5000/api/members', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(membersArr)
    })
    
    alert("Member removed from Database...")
    refreshTable()
}

// Send Email Function
function sendEmail(){
    let message = document.getElementById("message").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let name = document.getElementById("name").value;

    window.open(`mailto:dkpettit@gmail.com?subject=New Contact Form Submission&body=From: ${name} || Email: ${email} || Phone: ${phone} || Message: ${message}`);
}

function refreshTable(){
    // Iterate through array and build table
    membersArr.forEach((element, idx) => {
        myTableEl.innerHTML += `                
                    <tr>
                        <td>${element.callsign}</td>
                        <td>${element.name}</td>
                        <td>${element.address}</td>
                        <td>${element.country}</td>
                        <td>${element.date}</td>
                        <td><button class="btn-outlined-secondary text-secondary text-hover-primary font-sm" id="btn-delete" name="${idx}"><img src="./img/delete.png" alt="Delete Button" width="20" height="20" id="deleteBtn"></button></td>
                    </tr>
    `
    })
}

document.body.addEventListener( 'click', function ( event ) {
    console.log(event.target.name)
    if( event.target.id == 'btn-delete' ) {
      deleteMember(event.target.name);
    };
  } );

refreshTable()




