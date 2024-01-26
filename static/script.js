// Get the input elements
const nameInput = document.getElementById('Name');
const numberInput = document.getElementById("Number")
const emailInput = document.getElementById("Email")


// Add change event listener
nameInput.addEventListener('change', function() {
    const updatedName = this.value;
    sendDataToServer('name', updatedName); // Call function to send data to server
});

numberInput.addEventListener('change', function() {
    const updatedNumber = this.value;
    sendDataToServer('number', updatedNumber); // Call function to send data to server
});

emailInput.addEventListener('change', function() {
    const updatedEmail = this.value;
    sendDataToServer('email', updatedEmail); // Call function to send data to server
});

const skillsInput = document.getElementById("skills")

skillsInput.addEventListener('change', function() {
    const updatedSkils = this.value;
    sendDataToServer('skills', updatedSkils); // Call function to send data to server
});

const websiteInputs = document.querySelectorAll('.infoText_websiteInput');

// Add change event listener to each website input field
websiteInputs.forEach(input => {
    input.addEventListener('change', function() {
        const index = this.dataset.index;
        const updatedWebsite = this.value;
        sendDataToServerList('website', index, updatedWebsite ); // Send data to server
    });
});



const education_GPA_Inputs = document.querySelectorAll('.infoText_educationGPA');
education_GPA_Inputs.forEach(input => {
    input.addEventListener('change', function() {
        const index = this.dataset.index;
        const updatedGPA = this.value;
        sendDataToServerList('eduGPA', index, updatedGPA ); // Send data to server
    });
});

const education_name_Inputs = document.querySelectorAll('.infoText_educationName');

education_name_Inputs.forEach(input => {
    input.addEventListener('change', function() {
        const index = this.dataset.index;
        const updatedEduName = this.value;
        console.log(updatedEduName);
        console.log(index)
        sendDataToServerList('eduName', index, updatedEduName ); // Send data to server
    });
});


//delete educations

document.addEventListener('DOMContentLoaded', function () {
    function updateEducationIndices() {
        // Get all education divs
        var educationDivs = document.querySelectorAll('.infoGroup');

        // Update data-index attributes for each education div
        educationDivs.forEach(function (educationDiv, index) {
            educationDiv.querySelectorAll('[data-index]').forEach(function (element) {
                var currentDataIndex = element.getAttribute('data-index');
                console.log('Current data-index:', currentDataIndex);
                
                // Decrement the data-index attribute
                element.setAttribute('data-index', index - 3);

                var label = educationDiv.querySelector('label[for^="Education"]');
                if (label) {
                    label.textContent = 'Education ' + (index - 3) + ':';
                }

                var input = educationDiv.querySelector('.infoText_educationName');
                if (input) {
                    input.setAttribute('id', 'Education' + (index - 3));
                }
                
                // Log the updated data-index
                console.log('Updated data-index:', element.getAttribute('data-index'));
            });
        });
    }

    // Get all delete buttons
    var deleteButtons = document.querySelectorAll('.deleteEducationButton');

    // Add click event listener to each delete button
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Get the index from the data-index attribute
            var index = button.getAttribute('data-index');

            // Find the corresponding education div and remove it
            var educationDiv = document.querySelector('.infoText_educationName[data-index="' + index + '"]').closest('.infoGroup');
            if (educationDiv) {
                educationDiv.remove();

                // Update the data-index attributes for the remaining education entries
                updateEducationIndices();

                // Update the server-side list
                updateServerSideList(index);
            }
        });
    });

    function updateServerSideList(index) {
        fetch('/update_educations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                index: index,
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Data sent successfully');
            } else {
                console.error('Error sending data');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});











function sendDataToServerList(fieldName, index, value ) {
    fetch('/update_dataList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            field: fieldName,
            value: value,
            index: index,
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Data sent successfully');
        } else {
            console.error('Error sending data');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to send data to server using Fetch API
function sendDataToServer(fieldName, value) {
    fetch('/update_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            field: fieldName,
            value: value
        })
    })
    .then(response => {
        if (response.ok) {
            // Update analysis_results locally if needed
            console.log('Data sent successfully');
        } else {
            console.error('Error sending data');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



//now its stuff for the website add and delete

document.addEventListener('DOMContentLoaded', function () {
    var websitesContainer = document.getElementById('websitesContainer');
    var addWebsiteButton = document.getElementById('addWebsiteButton');

    addWebsiteButton.addEventListener('click', function () {
        var newIndex = websitesContainer.children.length;
        console.log(newIndex);
        // Create a new infoGroup div for the new website
        var newWebsiteDiv = document.createElement('div');
        newWebsiteDiv.className = 'infoGroup';

        // Create label for the new website
        var newLabel = document.createElement('label');
        newLabel.setAttribute('for', 'Website' + newIndex);
        newLabel.className = 'custom-label';
        newLabel.textContent = 'Website ' + newIndex + ':';

        // Create input for the new website
        var newInput = document.createElement('input');
        newInput.className = 'infoText_websiteInput';
        newInput.id = 'Website' + newIndex;
        newInput.setAttribute('data-index', newIndex);
        newInput.style.verticalAlign = 'middle';

        // Append the label and input to the newWebsiteDiv
        newWebsiteDiv.appendChild(newLabel);
        newWebsiteDiv.appendChild(newInput);

        // Append the newWebsiteDiv to the websitesContainer
        websitesContainer.appendChild(newWebsiteDiv);
    });
});