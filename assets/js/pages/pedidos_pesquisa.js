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
        var flg = false;
        if (document.form1.pedido.value=="" & 
          (document.form1.dt_coleta_ini.value=="" & 
            document.form1.dt_coleta_fim.value=="" &
            document.form1.dt_remessa_ini.value=="" &
            document.form1.dt_remessa_fim.value=="" )){ 
          $("#form1 div.error").show();
          return false;          
        }         
    });;
    /*
    var $validator = $("#form1").validate({
        errorLabelContainer: ,
        rules: {
            dt_remessa_ini: {
                required: function(element) {
                  var flg = false;
                  if (document.form1.pedido.value=="" & 
                    (document.form1.dt_coleta_ini.value=="" & 
                      document.form1.dt_coleta_fim.value=="" &
                      document.form1.dt_remessa_ini.value=="" &
                      document.form1.dt_remessa_fim.value=="" )){ flg = true;}
                  return flg;
                }
            },
            dt_remessa_fim: {
                required: function(element) {
                  var flg = false;
                  if (document.form1.pedido.value=="" & 
                    (document.form1.dt_coleta_ini.value=="" & 
                      document.form1.dt_coleta_fim.value=="" &
                      document.form1.dt_remessa_ini.value=="" &
                      document.form1.dt_remessa_fim.value=="" )){ flg = true;}
                  return flg;
                }
            },
            dt_coleta_ini: {
                required: function(element) {
                  var flg = false;
                  if (document.form1.pedido.value=="" & 
                    (document.form1.dt_coleta_ini.value=="" & 
                      document.form1.dt_coleta_fim.value=="" &
                      document.form1.dt_remessa_ini.value=="" &
                      document.form1.dt_remessa_fim.value=="" )){ flg = true;}
                  return flg;
                }
            },
            dt_coleta_fim: {
                required: function(element) {
                  var flg = false;
                  if (document.form1.pedido.value=="" & 
                    (document.form1.dt_coleta_ini.value=="" & 
                      document.form1.dt_coleta_fim.value=="" &
                      document.form1.dt_remessa_ini.value=="" &
                      document.form1.dt_remessa_fim.value=="" )){ flg = true;}
                  return flg;
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
    */
    $('.date-picker').datepicker({
        orientation: "top auto",
        autoclose: true
    });
});