const btn = document.querySelector("#myBtn");
const spoiler = document.querySelector("#spoiler");

let isActive = false;

btn.addEventListener("click", function() {
    if (isActive) {
        spoiler.classList.add('closed');
        isActive = false;
    } else {
        spoiler.classList.remove('closed');
        isActive = true;
    }
});

document.onkeydown = function(event) {
    let isEscape = false;
    
    if ('key' in event) {
        isEscape = (event.key === 'Escape' || event.key == 'Esc');
    }

    if (isEscape && isActive) {
        spoiler.classList.add('closed');
        isActive = false;
    }
}