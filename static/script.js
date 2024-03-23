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
        
        
        sendDataToServerList('eduName', index, updatedEduName ); // Send data to server
    });
});


//delete educations













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
//adding websites




document.addEventListener('DOMContentLoaded', function () {

    //DELETING EDUCATIONS


    var deleteEDUButtons = document.querySelectorAll('.deleteEducationButton');
    var addEducationButton = document.getElementById('addEducationButton');
    var educationContainer = document.getElementById('educationsContainer');
    // Get the elements related to experiences
    var addExperienceButton = document.getElementById('addExperienceButton');
    var experiencesContainer = document.getElementById('experiencesContainer');
    var deleteExperienceButtons = document.querySelectorAll('.deleteExperienceButton');
    

    // Get the elements related to experiences
    var addExperienceButton = document.getElementById('addExperienceButton');
    var experiencesContainer = document.getElementById('experiencesContainer');
    var deleteExperienceButtons = document.querySelectorAll('.deleteExperienceButton');

    // Function to add a new experience entry
    addExperienceButton.addEventListener('click', function () {
        // Calculate the index for the new experience entry
        var newIndex = experiencesContainer.children.length + 1;

        // Create a new infoGroup div for the new experience
        var newExperienceDiv = document.createElement('div');
        newExperienceDiv.className = 'infoGroup';

        // Create label for the new experience
        var newLabel = document.createElement('label');
        newLabel.setAttribute('for', 'Experience' + newIndex);
        newLabel.className = 'custom-label';
        newLabel.id = 'Experience' + newIndex;
        newLabel.textContent = 'Experience ' + newIndex + ':';

        // Create input for the title of the new experience
        var newTitleInput = document.createElement('input');
        newTitleInput.className = 'infoText_experienceTitle';
        newTitleInput.id = 'Experience' + newIndex;
        newTitleInput.setAttribute('data-index', newIndex);
        newTitleInput.style.verticalAlign = 'middle';
        newTitleInput.placeholder = 'Title';

        // Create input for the company of the new experience
        var newCompanyInput = document.createElement('input');
        newCompanyInput.className = 'infoText_experienceCompany';
        newCompanyInput.id = 'Experience' + newIndex;
        newCompanyInput.setAttribute('data-index', newIndex);
        newCompanyInput.style.verticalAlign = 'middle';
        newCompanyInput.placeholder = 'Company';

        // Create textarea for the description of the new experience
        var newDescriptionTextarea = document.createElement('textarea');
        newDescriptionTextarea.className = 'infoText_experienceDescription';
        newDescriptionTextarea.id = 'Experience' + newIndex;
        newDescriptionTextarea.setAttribute('data-index', newIndex);
        newDescriptionTextarea.style.verticalAlign = 'middle';
        newDescriptionTextarea.placeholder = 'Description';

        // Create delete button for the new experience
        var newDeleteButton = document.createElement('button');
        newDeleteButton.className = 'deleteExperienceButton';
        newDeleteButton.id = 'custom-button-edit';
        newDeleteButton.setAttribute('data-index', newIndex);
        newDeleteButton.textContent = 'Delete';

        // Append elements to the newExperienceDiv
        newExperienceDiv.appendChild(newLabel);
        newExperienceDiv.appendChild(newTitleInput);
        newExperienceDiv.appendChild(newCompanyInput);
        newExperienceDiv.appendChild(newDescriptionTextarea);
        newExperienceDiv.appendChild(newDeleteButton);

        // Add event listener to the delete button
        newDeleteButton.addEventListener('click', function () {
            // Get the index of the experience to be deleted
            var index = newDeleteButton.getAttribute('data-index');
            // Remove the experience div from the container
            newExperienceDiv.remove();
            // Update the indices of the remaining experiences
            updateExperienceIndices();
            // Update the server-side data
            updateServerSideExperienceList(index);
        });

        // Append the newExperienceDiv to the experiencesContainer
        experiencesContainer.appendChild(newExperienceDiv);
    });

    // Function to update the indices of the experiences after deletion
    function updateExperienceIndices() {
        var experienceDivs = document.querySelectorAll('.infoGroup');
        experienceDivs.forEach(function (experienceDiv, index) {
            experienceDiv.querySelectorAll('[data-index]').forEach(function (element) {
                element.setAttribute('data-index', index + 1);
            });
        });
    }

    // Function to update the server-side data when deleting an experience
    function updateServerSideExperienceList(index) {
        // Send a POST request to update the server-side data
        fetch('/update_experiences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                index: index
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Experience deleted successfully');
            } else {
                console.error('Error deleting experience');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    addEducationButton.addEventListener('click', function () {
        var newIndex = educationContainer.children.length;
        newIndex += 1;
        // Create a new infoGroup div for the new website
        var newEduDiv = document.createElement('div');
        newEduDiv.className = 'infoGroup';

        // Create label for the new website
        var newLabel = document.createElement('label');
        newLabel.setAttribute('for', 'Education' + newIndex);
        newLabel.className = 'custom-label';
        newLabel.id = 'Education' + newIndex;
        newLabel.textContent = 'Education ' + newIndex + ':';

        // Create input for the new website
        var newInput = document.createElement('input');
        newInput.className = 'infoText_educationName';
        newInput.id = 'Education' + newIndex;
        newInput.placeholder = 'Institution';
        newInput.setAttribute('data-index', newIndex);
        newInput.style.verticalAlign = 'middle';

        var newInputGPA = document.createElement('input');
        newInputGPA.className = 'infoText_educationGPA';
        newInputGPA.id = 'Education' + newIndex;
        newInputGPA.placeholder = 'GPA';
        newInputGPA.setAttribute('data-index', newIndex);
        newInputGPA.style.verticalAlign = 'middle';


        // Create delete button for the new website
        var newDeleteButton = document.createElement('button');
        newDeleteButton.className = 'deleteEducationButton';
        newDeleteButton.id = 'custom-button-edit'
        newDeleteButton.setAttribute('data-index', newIndex);
        newDeleteButton.textContent = 'Delete';

        // Append the label and input to the newWebsiteDiv
        newEduDiv.appendChild(newLabel);
        newEduDiv.appendChild(newInput);
        newEduDiv.appendChild(newInputGPA);
        newEduDiv.appendChild(newDeleteButton);

        newDeleteButton.addEventListener('click', function() {
            // Get the index from the data-index attribute
            var index = newDeleteButton.getAttribute('data-index');
            // Find the corresponding education div and remove it
            var newEduDiv = document.querySelector('.infoText_educationName[data-index="' + index + '"]').closest('.infoGroup');
            if (newEduDiv) {
                console.log('Deleting education with index ' + index + ': ' + newEduDiv.textContent);
                newEduDiv.remove();
                console.log('gagbagoo' + index);
                // Update the data-index attributes for the remaining education entries
                updateEducationIndices();

                // Update the server-side list
                updateServerSideList(index);
            }
        });
        // Append the newWebsiteDiv to the websitesContainer
        educationContainer.appendChild(newEduDiv);

        addEducationName(newIndex);
        
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

    // Add click event listener to each delete button
    deleteEDUButtons.forEach(function (button) {
        
        button.addEventListener('click', function () {
            // Get the index from the data-index attribute
            var index = button.getAttribute('data-index');
            console.log('index for deleting education is' + index);
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

    function addEducationName(index) {
        const eduInputs = document.querySelectorAll('.infoText_EducationName');

        // Add change event listener to each website input field
        eduInputs.forEach(input => {
            input.addEventListener('change', function() {
                const index = this.dataset.index;
                const updatedEdu= this.value;
                sendDataToServerList('edu', index, updatedEdu ); // Send data to server
            });
        });
    }


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



    
    //WEBSITE STUFF
    var websitesContainer = document.getElementById('websitesContainer');
    var addWebsiteButton = document.getElementById('addWebsiteButton');
    var deleteButtons = document.querySelectorAll('.deleteWebsiteButton');

    addWebsiteButton.addEventListener('click', function () {
        var newIndex = websitesContainer.children.length;
        
        // Create a new infoGroup div for the new website
        var newWebsiteDiv = document.createElement('div');
        newWebsiteDiv.className = 'infoGroup';

        // Create label for the new website
        var newLabel = document.createElement('label');
        newLabel.setAttribute('for', 'Website' + newIndex);
        newLabel.className = 'custom-label';
        newLabel.id = 'websiteInfo' + newIndex;
        newLabel.textContent = 'Website ' + newIndex + ':';

        // Create input for the new website
        var newInput = document.createElement('input');
        newInput.className = 'infoText_websiteInput';
        newInput.id = 'Website' + newIndex;
        newInput.setAttribute('data-index', newIndex);
        newInput.style.verticalAlign = 'middle';

        // Create delete button for the new website
        var newDeleteButton = document.createElement('button');
        newDeleteButton.className = 'deleteWebsiteButton';
        newDeleteButton.id = 'custom-button-edit'
        newDeleteButton.setAttribute('data-index', newIndex);
        newDeleteButton.textContent = 'Delete';

        // Append the label and input to the newWebsiteDiv
        newWebsiteDiv.appendChild(newLabel);
        newWebsiteDiv.appendChild(newInput);
        newWebsiteDiv.appendChild(newDeleteButton);

        newDeleteButton.addEventListener('click', function() {
            // Get the index from the data-index attribute
            var index = newDeleteButton.getAttribute('data-index');
            console.log(index);
            // Find the corresponding education div and remove it
            var websiteDiv = document.querySelector('.infoText_websiteInput[data-index="' + index + '"]').closest('.infoGroup');
            if (websiteDiv) {
                websiteDiv.remove();

                // Update the data-index attributes for the remaining education entries
                updateWebsiteIndices();

                // Update the server-side list
                updateWebsites(index);
            }
        });
        // Append the newWebsiteDiv to the websitesContainer
        websitesContainer.appendChild(newWebsiteDiv);

        addWebsite(newIndex)
        
    });


    function updateWebsites(index) {
        fetch('/update_website', {
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


    //delete shit
    // Add click event listener to each delete button
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Get the index from the data-index attribute
            var index = button.getAttribute('data-index');
            console.log('deleting website index: ' + index);
            // Find the corresponding education div and remove it
            var websiteDiv = document.querySelector('.infoText_websiteInput[data-index="' + index + '"]').closest('.infoGroup');
            if (websiteDiv) {
                websiteDiv.remove();

                // Update the data-index attributes for the remaining education entries
                updateWebsiteIndices();

                // Update the server-side list
                updateWebsites(index);
            }
        });
    });

    function addWebsite(index) {
        const websiteInputs = document.querySelectorAll('.infoText_websiteInput');

        // Add change event listener to each website input field
        websiteInputs.forEach(input => {
            input.addEventListener('change', function() {
                const index = this.dataset.index;
                const updatedWebsite = this.value;
                sendDataToServerList('website', index, updatedWebsite ); // Send data to server
            });
        });
    }
    
    function updateWebsiteIndices() {
        // Get all education divs
        var websiteDivs = document.querySelectorAll('.infoGroup');

        // Update data-index attributes for each education div
        websiteDivs.forEach(function (websiteDiv, index) {
            websiteDiv.querySelectorAll('[data-index]').forEach(function (element) {
                var currentDataIndex = element.getAttribute('data-index');
                
                
                // Decrement the data-index attribute
                element.setAttribute('data-index', index - 3);

                var label = websiteDiv.querySelector('label[for^="Website"]');
                if (label) {
                    label.textContent = 'Website ' + (index - 3) + ':';
                }

                var input = websiteDiv.querySelector('.infoText_websiteInput');
                if (input) {
                    input.setAttribute('id', 'Website' + (index - 3));
                }
                
                // Log the updated data-index
                console.log('Updated data-index:', element.getAttribute('data-index'));
            });
        });
    }




    

    // Get all delete buttons
    


    
});



//delete the websites




















