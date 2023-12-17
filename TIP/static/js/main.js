$(document).ready(function() {
    $('#uploadForm').submit(function(event) {
        event.preventDefault();

        // get the form data
        var formData = new FormData(this);

        $.ajax({
            url: '/',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.success) {
                    $('#overview_graph').html(data.overview_graph);
                    
                    // hide the upload section
                    $('#uploadSection').addClass('d-none');

                    // show the analysis section
                    $('#analysisSection').removeClass('d-none');
                    $('#analysisSection').addClass('container-fluid');
                } else {
                    alert(data.error);
                    $('#analysisSection').html(data.error);
                }
                
            }, error: function(data) {
                alert(data.error);
                $('#analysisSection').html(data.error);
            }
        });
    });
});