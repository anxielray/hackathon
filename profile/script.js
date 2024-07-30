document.addEventListener("DOMContentLoaded", function() {
    const profilePictureInput = document.getElementById("profile-picture");
    const profilePicturePreview = document.getElementById("profile-picture-preview");
    const uploadIcon = document.querySelector(".upload-icon");
    let cropper;

    uploadIcon.addEventListener("click", function() {
        profilePictureInput.click();
    });

    profilePictureInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePicturePreview.src = e.target.result;
                profilePicturePreview.style.display = "block";
                uploadIcon.style.display = "none";
            };
            reader.readAsDataURL(file);
        }
    });

    const stars = document.querySelectorAll(".rating .star");
    stars.forEach(star => {
        star.addEventListener("click", function() {
            this.classList.toggle("selected");
        });
    });
});
