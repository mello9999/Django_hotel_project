function getSum() {
    var output = 0;
    $('.total_price').each(function () {
        output += parseInt(this.innerHTML); // "this" is the current element in the loop
    });
    return output;
}
$(document).ready(
    
   $('#total').val( getSum())

,
   
$('.delete_cart').click(function (e) {

    var clickedBookingID = $(this).data('bookingid');
    $.ajax({
        url: '/reserve/delete/' + String(clickedBookingID),
        type: 'post',
        dataType: 'json',
        success: function (data) {
            $(`#${clickedBookingID}`).remove()
            $('#total').val( getSum())
            console.log(data)
        }, error: function (xhr, status, error) {
            console.log(error)
        }
    });
    console.log(clickedBookingID)
})
)