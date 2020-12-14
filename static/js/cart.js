$(document).ready(
    $('.delete_cart').click(function(e) {
        
        var clickedBookingID = $(this).data('bookingid');
        $.ajax({
            url: '/reserve/delete/' + String(clickedBookingID),
            type: 'post',
            dataType: 'json',
            success: function (data) {
                $(`#${clickedBookingID}`).remove()
                console.log(data)
            }, error: function (xhr, status, error) {
              console.log(error)
            }
          });
        console.log(clickedBookingID)
    })
)