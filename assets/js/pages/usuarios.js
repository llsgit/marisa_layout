$(document).ready(function() {
	$('.edit').hide();
	// Datatables
   /* 	"paging": false,
    var table = $('#table_data').DataTable({
	    buttons: {
	        buttons: [
	            'new',
	            {
	            	text: 'Novo',
	            	className: 'btn btn-primary',
	            	action: function ( dt ) {
	                    console.log( 'My custom button!' );
	                }
	            }
	        ]
	    }
    }); */
    $(document).on('click', '.btn-primary', function(e){
		alert('ok');
		$('.list').hide();
		$('.edit').show();
    });
});
