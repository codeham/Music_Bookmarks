$(document).ready(function(){

	$.ajax({
		url: '/getAllTracks',
		contentType: 'application/json',
		success: function(response){
			console.log(response)

			const tableElement = $('tbody')

			for(const prop in response){
				const url_link = response[prop].url
				const entry_id = response[prop].id
				tableElement.append('\
					<tr id=" ' + entry_id + ' ">\
				      <th scope="row">' + response[prop].track + '</th>\
				      <td>' + response[prop].artist + '</td>\
				      <td>' + response[prop].genre + '</td>\
				      <td><a target="_blank" rel="noopener noreferrer" href=" ' 
				      + url_link + 
				      ' "><button type="button" class="btn btn-dark"><span class="fas fa-link"></span></button></a>\
				      <td><button type="submit" class="btn btn-default btn-sm delete"><span class="fas fa-trash-alt"></span></button></td>\
				    </tr>\
					')
			}
		}
	})

	$('table').on('click', '.delete', function() {
		var row_id = $(this).closest('tr').attr('id')
		var data = {}
		data.id = row_id
		var remove_id = $(this).parents('tr')
			$.ajax({
				type: 'DELETE',
				data: JSON.stringify(data),
		        contentType: 'application/json',
	            url: 'http://localhost:3001/deleteTrack',						
	            success: function(data) {
	                console.log('delete success');
	                console.log(data)
	                remove_id.remove()
	            }
	        });
		// $(this).parents('tr').remove()
		// ajax call to remove entry from database

	})

});