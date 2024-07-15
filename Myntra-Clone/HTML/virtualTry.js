document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const imageInput = document.getElementById('image-input');
    const uploadedImage = document.getElementById('uploaded-image');
    const tryonImage = document.getElementById('tryon-image');
    const tryon3DModel = document.getElementById('tryon-3dmodel');

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';
            
            // Simulate fetching the try-on image and 3D model
            tryonImage.src = '/Model/Blue/tryout_blue.jpg'; // Replace with actual path to try-on image
            tryonImage.style.display = 'block';
            tryon3DModel.src = '/Model/Blue/model_blue.glb'; // Replace with actual path to 3D model
            tryon3DModel.style.display = 'block';
        }

        reader.readAsDataURL(imageInput.files[0]);
    }
});

