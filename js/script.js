$(document).ready(function () {

    $("#fileInputControl").on('change', fileInputContolChangeEventHandler);

});

function fileInputContolChangeEventHandler(event) {

    let fileInputContol = event.target;

    let files = fileInputContol.files;

    let firstFile = files[0];

    // Allowing file type
    var TextAllowedExtensions =
        /(\.txt)$/i;
    var ImageAllowedExtensions =
        /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    var AudioAllowedExtensions =
        /(\.mp3|\.ogg|\.wav)$/i;
    var VideoAllowedExtensions =
        /(\.mp4|\.webm|\.ogg)$/i;

    if (TextAllowedExtensions.exec(this.value)) {
        document.getElementById('previewText').style.display = '';

        document.getElementById('previewImg').style.display = 'none';
        document.getElementById('previewAudio').style.display = 'none';
        document.getElementById('previewVideo').style.display = 'none';
        TextFileReadingProcedure(event, firstFile);
    }
    else if (AudioAllowedExtensions.exec(this.value)) {
        document.getElementById('previewAudio').style.display = '';

        document.getElementById('previewText').style.display = 'none';
        document.getElementById('previewImg').style.display = 'none';
        document.getElementById('previewVideo').style.display = 'none';
        AudioFileReadingProcedure(event, firstFile);
    }
    else if (ImageAllowedExtensions.exec(this.value)) {
        document.getElementById('previewImg').style.display = '';

        document.getElementById('previewText').style.display = 'none';
        document.getElementById('previewAudio').style.display = 'none';
        document.getElementById('previewVideo').style.display = 'none';
        ImageFileReadingProcedure(event, firstFile);
    }
    else if (VideoAllowedExtensions.exec(this.value)) {
        document.getElementById('previewVideo').style.display = '';

        document.getElementById('previewImg').style.display = 'none';
        document.getElementById('previewText').style.display = 'none';
        document.getElementById('previewAudio').style.display = 'none';
        VideoFileReadingProcedure(event, firstFile);
    }
    else {

    }
}

var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
function Validate(oForm) {
    var arrInputs = oForm.getElementsByTagName("fileInputControl");
    for (var i = 0; i < arrInputs.length; i++) {
        var oInput = arrInputs[i];
        if (oInput.type == "file") {
            var sFileName = oInput.value;
            if (sFileName.length > 0) {
                var blnValid = false;
                for (var j = 0; j < _validFileExtensions.length; j++) {
                    var sCurExtension = _validFileExtensions[j];
                    if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                        blnValid = true;
                        break;
                    }
                }

                if (!blnValid) {
                    alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                    return false;
                }
            }
        }
    }

    return true;
}



function TextFileReadingProcedure(Event, File) {
    let fileReader = new FileReader();

    fileReader.onload = function (Event) {
        let fileContents = Event.target.result;
        $('#previewText').text(fileContents);
    }
    fileReader.readAsText(File);
}
function ImageFileReadingProcedure(Event, File) {
    let fileReader = new FileReader();

    fileReader.onload = function (Event) {
        let dataURL = Event.target.result;
        $('#previewImg').attr("src", `${dataURL}`);
        //
        // NOTE:
        //        For img in html is  .attr("src",`${dataURL}`);
        //        while usig div(only div there should no thing include else of its id) in html use  .css("backgroundImage",`url(${dataURl})`);

    }
    fileReader.readAsDataURL(File);
}
function AudioFileReadingProcedure(Event, File) {
    let fileReader = new FileReader();

    fileReader.onload = function (Event) {
        let dataURL = Event.target.result;
        $('#previewAudio').attr("src", `${dataURL}`);

    }
    fileReader.readAsDataURL(File);
}
function VideoFileReadingProcedure(Event, File) {
    let fileReader = new FileReader();

    fileReader.onload = function (Event) {
        let dataURL = Event.target.result;
        $('#previewVideo').attr("src", `${dataURL}`);

    }
    fileReader.readAsDataURL(File);
}
