$(document).ready(
    $('.delete_cart').click(function(e) {
        console.log('aaaaaaa')
        var clickedBookingID = $(this).data('bookingid');
    
        console.log(clickedBookingID)
    })
)