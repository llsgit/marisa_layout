var editor; 
$(document).ready(function() {
    
    //ajax mocks
    $.mockjaxSettings.responseTime = 500; 
    
    $.mockjax({
        url: '/post',
        response: function(settings) {
            log(settings, this);
        }
    });

    $.mockjax({
        url: '/error',
        status: 400,
        statusText: 'Bad Request',
        response: function(settings) {
            this.responseText = 'Please input correct value'; 
            log(settings, this);
        }        
    });
    
    $.mockjax({
        url: '/status',
        status: 500,
        response: function(settings) {
            this.responseText = 'Internal Server Error';
            log(settings, this);
        }        
    });
  
    $.mockjax({
        url: '/groups',
        response: function(settings) {
            this.responseText = [ 
             {value: 0, text: 'Guest'},
             {value: 1, text: 'Service'},
             {value: 2, text: 'Customer'},
             {value: 3, text: 'Operator'},
             {value: 4, text: 'Support'},
             {value: 5, text: 'Admin'}
           ];
           log(settings, this);
        }        
    });
    
    
    
    // Datatables

    var table = $('#example').DataTable({
        "lengthChange": false,
        "ajax": 'assets/itens.txt',
        columnDefs: [
            {
                targets:6,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<input type="text" style="inline-size: 80px;" value="'+ encodeURIComponent(data) +'">';
                    }

                    return data;
                }
            }
        ]      
    });

});