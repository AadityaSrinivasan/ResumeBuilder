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

// stuff for projects
const project_tech_Inputs = document.querySelectorAll('.infoText_projectTech');
project_tech_Inputs.forEach(input => {
    input.addEventListener('change', function() {
        const index = this.dataset.index;
        const updatedTech = this.value;
        sendDataToServerList('projTech', index, updatedTech ); // Send data to server
    });
});

const project_name_Inputs = document.querySelectorAll('.infoText_projectName');
project_name_Inputs.forEach(input => {
    input.addEventListener('change', function() {
        const index = this.dataset.index;
        const updatedName = this.value;
        sendDataToServerList('projName', index, updatedName ); // Send data to server
    });
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
//adding websites





document.addEventListener('DOMContentLoaded', function () {

    //DELETING EDUCATIONS


    var deleteEDUButtons = document.querySelectorAll('.deleteEducationButton');
    var addEducationButton = document.getElementById('addEducationButton');
    var educationContainer = document.getElementById('educationsContainer');
    

    addEducationButton.addEventListener('click', function () {
        var newIndex = educationContainer.children.length;
        newIndex += 1;
        // Create a new infoGroup div for the new website
        var newEduDiv = document.createElement('div');
        newEduDiv.className = 'infoGroup';
        newEduDiv.setAttribute('data-index', newIndex);
        newEduDiv.id = 'educationDiv';

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
        addEducationGPA(newIndex);
        
    });


   

    // Add click event listener to each delete button
    deleteEDUButtons.forEach(function (button) {
        
        button.addEventListener('click', function () {
            // Get the index from the data-index attribute
            var index = button.getAttribute('data-index');
            console.log('index for deleting education is' + index);
            // Find the corresponding education div and remove it
            //var educationDiv = document.querySelector('.infoText_educationName[data-index="' + index + '"]').closest('.infoGroup');
            var educationDiv = document.querySelector('#educationDiv[data-index="' + index + '"]');
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
        const eduInputs = document.querySelectorAll('.infoText_educationName');

        // Add change event listener to each website input field
        eduInputs.forEach(input => {
            input.addEventListener('change', function() {
                const index = this.dataset.index;
                const updatedEdu= this.value;
                console.log("index inside is: " + index)
                sendDataToServerList('eduName', index, updatedEdu ); // Send data to server
            });
        });
    }

    function addEducationGPA(index) {
        const eduInputs = document.querySelectorAll('.infoText_educationGPA');

        // Add change event listener to each website input field
        eduInputs.forEach(input => {
            input.addEventListener('change', function() {
                const index = this.dataset.index;
                const updatedEdu= this.value;
                sendDataToServerList('eduGPA', index, updatedEdu ); // Send data to server
            });
        });
    }


    function updateEducationIndices() {
        // Get all education divs
        var educationDivs = document.querySelectorAll('div[id^="educationDiv"]');
        console.log("Length of educationDivs:", educationDivs.length);
        // Update data-index attributes for each education div
        educationDivs.forEach(function (educationDiv, index) {
            educationDiv.querySelectorAll('[data-index]').forEach(function (element) {
                var currentDataIndex = element.getAttribute('data-index');
                console.log('current data index is: ', currentDataIndex)
                var newIndex= index + 1
                console.log('new data index is: ', newIndex)
                
                
                // Decrement the data-index attribute
                educationDiv.setAttribute('data-index', newIndex);

                var label = educationDiv.querySelector('label[for^="Education"]');
                if (label) {
                    console.log('changing name')
                    label.textContent = 'Education ' + (newIndex) + ':';
                    label.setAttribute('for', 'Education' + newIndex);
                    label.id = 'Education' + newIndex;
                    
                }

                var input = educationDiv.querySelector('.infoText_educationName');
                if (input) {
                    input.setAttribute('id', 'Education' + (newIndex));
                    input.setAttribute('data-index', newIndex);
                }

                var input = educationDiv.querySelector('.infoText_educationGPA');
                if (input) {
                    input.setAttribute('id', 'Education' + (newIndex));
                    input.setAttribute('data-index', newIndex);
                }

                var deleteButton = educationDiv.querySelector('.deleteEducationButton');
                if (deleteButton) {
                    deleteButton.setAttribute('data-index', newIndex);
                }
                
                // Log the updated data-index
                console.log('end of 1 div')
            });
        });
    }

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


    //project stuff
    var deleteProjectButtons = document.querySelectorAll('.deleteProjectButton');
    var addProjectButton = document.getElementById('addProjectButton');
    var projectContainer = document.getElementById('projectsContainer');
    

    addProjectButton.addEventListener('click', function () {
        var newIndex = projectContainer.children.length;
        newIndex += 1;
        // Create a new infoGroup div for the new website
        var newProjectDiv = document.createElement('div');
        newProjectDiv.className = 'infoGroup';
        newProjectDiv.setAttribute('data-index', newIndex);
        newProjectDiv.id = 'projectDiv';

        // Create label for the new website
        var newLabel = document.createElement('label');
        newLabel.setAttribute('for', 'Project' + newIndex);
        newLabel.className = 'custom-label';
        newLabel.id = 'Project' + newIndex;
        newLabel.textContent = 'Project ' + newIndex + ':';

        // Create input for the new website
        var newInput = document.createElement('input');
        newInput.className = 'infoText_projectName';
        newInput.id = 'Project' + newIndex;
        newInput.placeholder = 'Institution';
        newInput.setAttribute('data-index', newIndex);
        newInput.style.verticalAlign = 'middle';

        var newInputTech = document.createElement('input');
        newInputTech.className = 'infoText_projectTech';
        newInputTech.id = 'Project' + newIndex;
        newInputTech.placeholder = 'Languages/Frameworks';
        newInputTech.setAttribute('data-index', newIndex);
        newInputTech.style.verticalAlign = 'middle';

        var newInputInfo = document.createElement('input');
        newInputInfo.className = 'infoText_projectInfo';
        newInputInfo.id = 'Project' + newIndex;
        newInputInfo.placeholder = 'Description';
        newInputInfo.setAttribute('data-index', newIndex);
        newInputInfo.style.verticalAlign = 'middle';


        // Create delete button for the new website
        var newDeleteButton = document.createElement('button');
        newDeleteButton.className = 'deleteProjectButton';
        newDeleteButton.id = 'custom-button-edit'
        newDeleteButton.setAttribute('data-index', newIndex);
        newDeleteButton.textContent = 'Delete';

        // Append the label and input to the newWebsiteDiv
        newProjectDiv.appendChild(newLabel);
        newProjectDiv.appendChild(newInput);
        newProjectDiv.appendChild(newInputTech);
        newProjectDiv.appendChild(newDeleteButton);

        newDeleteButton.addEventListener('click', function() {
            // Get the index from the data-index attribute
            var index = newDeleteButton.getAttribute('data-index');
            // Find the corresponding education div and remove it
            var newProjectDiv = document.querySelector('.infoText_projectName[data-index="' + index + '"]').closest('.infoGroup');
            if (newProjectDiv) {
                console.log('Deleting project with index ' + index + ': ' + newProjectDiv.textContent);
                newProjectDiv.remove();
                console.log('gagbagoo' + index);
                // Update the data-index attributes for the remaining education entries
                updateProjectIndices();

                // Update the server-side list
                //updateServerSideList(index);
            }
        });
        // Append the newWebsiteDiv to the websitesContainer
        projectContainer.appendChild(newProjectDiv);

        addProjectName(newIndex);
        addProjectTech(newIndex);
        
    });


   

    // Add click event listener to each delete button
    deleteProjectButtons.forEach(function (button) {
        
        button.addEventListener('click', function () {
            // Get the index from the data-index attribute
            var index = button.getAttribute('data-index');
            console.log('index for deleting project is' + index);
            // Find the corresponding education div and remove it
            //var educationDiv = document.querySelector('.infoText_educationName[data-index="' + index + '"]').closest('.infoGroup');
            var projectDiv = document.querySelector('#projectDiv[data-index="' + index + '"]');
            if (projectDiv) {
                projectDiv.remove();
                // Update the data-index attributes for the remaining education entries
                updateProjectIndices();
                // Update the server-side list
                //updateServerSideList(index);
            }
        });
    });

    function addProjectName(index) {
        const projInputs = document.querySelectorAll('.infoText_projectName');

        // Add change event listener to each website input field
        projInputs.forEach(input => {
            input.addEventListener('change', function() {
                const index = this.dataset.index;
                const updatedProj= this.value;
                console.log("index inside is: " + index)
                sendDataToServerList('projName', index, updatedProj ); // Send data to server
            });
        });
    }

    function addProjectTech(index) {
        const projInputs = document.querySelectorAll('.infoText_projectTech');

        // Add change event listener to each website input field
        projInputs.forEach(input => {
            input.addEventListener('change', function() {
                const index = this.dataset.index;
                const updatedProj= this.value;
                console.log("index inside is: " + index)
                sendDataToServerList('projTech', index, updatedProj ); // Send data to server
            });
        });
    }


    function updateProjectIndices() {
        // Get all education divs
        var projectDivs = document.querySelectorAll('div[id^="projectDiv"]');
        console.log("Length of educationDivs:", projectDivs.length);
        // Update data-index attributes for each education div
        projectDivs.forEach(function (projectDiv, index) {
            projectDiv.querySelectorAll('[data-index]').forEach(function (element) {
                var currentDataIndex = element.getAttribute('data-index');
                console.log('current data index is: ', currentDataIndex)
                var newIndex= index + 1
                console.log('new data index is: ', newIndex)
                
                
                // Decrement the data-index attribute
                projectDiv.setAttribute('data-index', newIndex);

                var label = projectDiv.querySelector('label[for^="Project"]');
                if (label) {
                    console.log('changing name')
                    label.textContent = 'Project ' + (newIndex) + ':';
                    label.setAttribute('for', 'Project' + newIndex);
                    label.id = 'Project' + newIndex;
                    
                }

                var input = projectDiv.querySelector('.infoText_projectName');
                if (input) {
                    input.setAttribute('id', 'Project' + (newIndex));
                    input.setAttribute('data-index', newIndex);
                }

                var input = projectDiv.querySelector('.infoText_projectTech');
                if (input) {
                    input.setAttribute('id', 'Project' + (newIndex));
                    input.setAttribute('data-index', newIndex);
                }

                var deleteButton = projectDiv.querySelector('.deleteProjectButton');
                if (deleteButton) {
                    deleteButton.setAttribute('data-index', newIndex);
                }
                
                // Log the updated data-index
                console.log('end of 1 div')
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




















