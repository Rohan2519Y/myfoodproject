$(document).ready(function () {
    $.getJSON("/food/fetch_all_food_category", function (response) {
        $('#categoryid').append($('<option>').text('-Select Category-'))
        response.data.map((item) => {
            $('#categoryid').append($('<option>').text(item.categoryname).val(item.categoryid))
        })
    })
    $('#categoryid').change(function () {
        $.getJSON("/food/fetch_all_food_subcategory", { categoryid: $('#categoryid').val() }, function (response) {
            $('#subcategoryid').empty()
            $('#subcategoryid').append($('<option>').text('Sub Category'))
            response.data.map((item) => {
                $('#subcategoryid').append($('<option>').text(item.subcategoryname).val(item.subcategoryid))
            })
        })
    })
})
function changefood() {
    if (flexSwitchCheckDefault.checked) {
        foodtype.innerHTML = 'Non-Vegeterian'
        flexSwitchCheckDefault.value='Non-Vegeterian'
    }
    else {
        foodtype.innerHTML = 'Vegeterian'
        flexSwitchCheckDefault.value='Vegeterian'
    }
}
function foodimg(event) {
        var pic = URL.createObjectURL(event.target.files[0]);
        foodimage.src = pic;
    
}