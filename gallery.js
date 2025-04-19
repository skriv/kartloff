console.log("Gallery");

document.addEventListener('DOMContentLoaded', () => {
    const elementsWithDataComment = document.querySelectorAll('[data-comment]');
    const submitButton = document.querySelector('#submitComments');
    // const sbNameElement = document.querySelector('[data-sb-name]');
    
    // Modify comment name attributes once at load time
    modifyCommentsNameAttribute(elementsWithDataComment);
    
    // Add click event listener to submit button
    if (submitButton) {
        console.log("submitButton found");
        submitButton.addEventListener('click', submitComments);
    } else {
        console.error('#submitComments element not found');
    }
});

function modifyCommentsNameAttribute(elements) {
    if (!elements || !elements.length) {
        elements = document.querySelectorAll('[data-comment]');
    }
    
    elements.forEach((element, index) => {
        element.setAttribute('name', index + 1);
    });

    console.log(`Modified ${elements.length} elements with data-comment attribute`);
}


function submitComments() {
    collectComments();
    
    // Delete all elements with data-comment attribute
    const elementsWithDataComment = document.querySelectorAll('[data-comment]');
    elementsWithDataComment.forEach(element => {
        element.remove();
    });
    
    console.log(`Deleted ${elementsWithDataComment.length} elements with data-comment attribute`);
}

function collectComments() {
    const elementsWithDataComment = document.querySelectorAll('[data-comment]');
    const sbNameElement = document.querySelector('[data-sb-name]');
    const templateElement = document.querySelector('[data-copy]');
    
    // Store filled comments data
    const filledComments = [];
    let commentsText = '';
    
    // Process storyboard name element
    if (sbNameElement) {
        const sbNameValue = sbNameElement.getAttribute('data-sb-name');
        sbNameElement.setAttribute('value', sbNameValue);
        commentsText = `Storyboard: ${sbNameValue}&#10;&#10;`;
        console.log(`Found element with data-sb-name: ${sbNameValue}`);
    } else {
        console.error('Element with data-sb-name attribute not found');
    }
    
    // Collect comments
    elementsWithDataComment.forEach(element => {
        const name = element.getAttribute('name');
        const value = element.value.trim();
        
        if (value !== '') {
            commentsText += `${name}: ${value}&#10;`;
            filledComments.push({ name, value });
        }
    });
    
    console.log(`Found ${filledComments.length} filled comments`);
    
    // Process template element
    if (templateElement && filledComments.length > 0) {
        const parent = templateElement.parentNode;
        
        // Remove previous duplicates
        document.querySelectorAll('.duplicated-element').forEach(el => el.remove());
        
        // Create document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        // Create duplicates
        filledComments.forEach(comment => {
            const duplicate = templateElement.cloneNode(true);
            duplicate.classList.add('duplicated-element');
            
            // Set attributes
            duplicate.setAttribute('data-name', "Image: " + comment.name);
            duplicate.setAttribute('name', "Image: " + comment.name);
            duplicate.setAttribute('id', "Image: " + comment.name);
            duplicate.setAttribute('value', comment.value);
            
            fragment.appendChild(duplicate);
        });
        
        // Insert all duplicates at once
        parent.appendChild(fragment);

        
        // Remove template
        templateElement.remove();
        
        console.log(`Duplicated element ${filledComments.length} times with comment data`);
    } else if (!templateElement) {
        console.error('Element with data-copy attribute not found');
    }
    
    return commentsText;
}

