/**
 * Module Dependencies
*/
$(function () {
    var $listUsersContainer = $("#app-container")
    var template ='<article class="app-show">' +
        '<div class="left img-container">' +
        '<img src=":avatar:">' +
        '</div>' +
        '<div class="right info">' +
        '<h1> :first_name:' +
        ' :last_name:</h1>' +
        '<h3> :email:</h3>' +
        '</div>' +
        '</article>';
    var page = 1;
    $.ajax({
        url: 'https://reqres.in/api/users?page=1&per_page=12',
        data: {page:page},
        success: function(users) {
            $listUsersContainer.find('.app-user').find('.loader').remove();
            console.log(users);
            var pag = users.page;
            var total = users.total;
            var xPag = 3;
            var nPag = Math.ceil(total / xPag);
            var offset = (pag - 1) * xPag;
            var end = pag * xPag;


            function showList(start,end){
                for(var i = start; i < end; i++){

                    var article = template
                        .replace(':first_name:', users.data[i].first_name)
                        .replace(':last_name:', users.data[i].last_name)
                        .replace(':email:', users.data[i].email)
                        .replace(':avatar:', users.data[i].avatar)
                    $listUsersContainer.find('.app-user').append($(article))
                }

            }

            function showButtons(b){
                var buttons = '';
                for(var i = 0; i < b; i++){
                    var button = '';
                    button = "<button type='button' "+
                        "class='btn btn-info'>"+(i+1)+
                        "</button>";
                    buttons += button;
                }
                $('#buttons').append(buttons);
            }

            function removeActive(){
                var buttons = $('#buttons button');
                for(var i = 0; i < buttons.length; i++){
                    $(buttons[i]).removeClass('active');
                }
            }
            function removeList(){
                $listUsersContainer.find('.app-show').remove()
            }
            showList(offset,end);
            showButtons(nPag);

            $( document ).ready(function(){
                $('#buttons button:first-child').addClass('active');

                var buttons = $('#buttons button');
                console.log(buttons)
                for(var i = 0; i < buttons.length; i++){
                    buttons[i].addEventListener('click',function(){
                        removeActive();
                        removeList();
                        var indice = parseInt(this.textContent);
                        var o = (indice -1) * xPag;
                        var h = indice * xPag;
                        showList(o,h);
                        $(this).addClass('active');
                    });
                }
            });


            },
        error: function() {
            console.log("Error de carga de datos");
        }
    });
})


