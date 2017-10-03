$(document).ready(function() {
	$('edit').hide();
	// Datatables
    var table = $('#table_data').DataTable({
    	"paging": false,
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
    });
});
function onClickFornecedor(id, nome, email, fornecedor, perfil) {
	$('list').hide();
	$('edit').show();
}
