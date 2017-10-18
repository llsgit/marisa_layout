var table;
$(document).ready(function() {

    table = $('#table_data').DataTable({
        "bPaginate": false,
        "ajax": 'assets/fornecedor.txt',
        "columns": [
            {
                "class":          "details-control",
                "orderable":      false,
                "data":           null,
                "defaultContent": ""
            },        
            { "data": "nome" },
            { "data": "email" },
            { "data": "dt_ultimo" },
            { "data": "perfil" }                        
        ],
        columnDefs: [
            {
                targets:1,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a href="javascript:onClickFornecedor('+ row.nome + ');">'+ row.nome + '</a>';
                    }

                    return data;
                }
            }          
        ],
        "order": [[2, 'asc']]        
    });

	$('.edit').hide();
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();
        var controlForm  = $('.controls:first'),
            currentEntry = $('.entry:first'),
            newForm = $(controlForm.clone()).appendTo(currentEntry);
        currentEntry.find('.btn-remove')
            .removeClass('btn-remove').addClass('btn-add')
            .html('<span class="glyphicon glyphicon-plus"></span>');          
        newForm.find('input').val('');
        currentEntry.find('.controls:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .html('<span class="glyphicon glyphicon-minus"></span>');
    }).on('click', '.btn-remove', function(e)
    {
		$(this).parents('.controls:first').remove();

		e.preventDefault();
		return false;
	}).on('click', '.btn-primary', function(e){
		$('.list').hide();
		$('.edit').show();
    });

	$( ".perfil" ).change(function() {
		if ('FORNECEDOR' != this.value) {
			$('.fornecedores').hide();
		}
		else{
			$('.fornecedores').show();	
		}
	});
});
