$(document).ready(function() {
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('.controls form:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .html('<span class="glyphicon glyphicon-minus"></span>');
    }).on('click', '.btn-remove', function(e)
    {
		$(this).parents('.entry:first').remove();

		e.preventDefault();
		return false;
	}).on('click', '.btn-submit', function(e)
    {
         var controlForm = $('.controls form:first');
         var campos = controlForm.find('input');
         var pedido = "";
         for (var i = 0; i < campos.length; i++) {
            if (i>0) {
                pedido=pedido+';';
            }
            pedido = pedido + campos[i].value;
         }
         document.form1.pedido.value = pedido;
    });;

    var $validator = $("#form1").validate({
        rules: {
            dt_remessa_ini: {
                required: function(element) {
                  return eval(document.form1.pedido.value=="");
                }
            },
            dt_remessa_fim: {
                required: function(element) {
                  return eval(document.form1.pedido.value=="");
                }
            },
            dt_coleta_ini: {
                required: function(element) {
                  return eval(document.form1.pedido.value=="");
                }
            },
            dt_coleta_fim: {
                required: function(element) {
                  return eval(document.form1.pedido.value=="");
                }
            }                                                
        },
          messages: {
            dt_remessa_ini: {
              required: "Informar a Data inicial"
            },
            dt_remessa_fim: {
              required: "Informar a Data final"
            },     
            dt_coleta_ini: {
              required: "Informar a Data inicial"
            },
            dt_coleta_fim: {
              required: "Informar a Data final"
            }                        
          }
    });
    $('.date-picker').datepicker({
        orientation: "top auto",
        autoclose: true
    });
});