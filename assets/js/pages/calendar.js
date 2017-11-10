$(document).ready(function() {
    
    
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    
    $('#calendar').fullCalendar({       
			header: {
				left: 'prev',
				center: 'title',
				right: 'next'
			},
			lang: 'pt',

			dayClick: function(date1, jsEvent, view) {
		        var newEvent = new Object();
		        newEvent.id= '999';
		        newEvent.start= date1;
				newEvent.color= 'green';
				newEvent.textColor= 'black';
				newEvent.allDay = true;
				$('#calendar').fullCalendar('removeEvents','999');
				$('#calendar').fullCalendar('renderEvent', newEvent, true);
				$('#agendamento').text("Data agendada para coleta de cabides: "+date1.date()+"/"+date1.month()+"/"+date1.year());    
		    },    
			events: [
				{
					start: new Date(year, month, day-8),
					color: 'yellow',
					textColor: 'black',
					allDay: true
				},
				{
					start: new Date(year, month, day-7),
					color: 'yellow',
					textColor: 'black',
					allDay: true
				},		
				{
					start: new Date(year, month, day-6),
					color: 'yellow',
					textColor: 'black',
					allDay: true
				},						
				{
					start: new Date(year, month, day-8),
					color: 'blue',
					textColor: 'black',
					allDay: true
				}
			],
			eventColor: '#378006'
		});
    
});