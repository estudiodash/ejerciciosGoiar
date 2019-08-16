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

    $.ajax({
        url: 'https://reqres.in/api/users?page=1&per_page=12',
        success: function(users) {

            let filterUserArray = [];
            var totalUser = users.total;
            $listUsersContainer.find('.app-user').find('.loader').remove();

             $.each(users.data, function(index, user) {
                var firstName = user.first_name;
                var lastName = user.last_name;
                var completName = firstName + lastName;
                var charCount = completName.trim().length;

                 if (charCount > 12) {
                     filterUserArray.push(firstName)
                     filterUserCount = filterUserArray.length
                 }
                 var article = template
                    .replace(':first_name:', firstName)
                    .replace(':last_name:', lastName)
                    .replace(':email:', user.email)
                    .replace(':avatar:', user.avatar)

              $listUsersContainer.find('.app-user').append($(article))
        });

            function userPercentage(a, b) {
                return a * 100 / b;
            }
            var calculo = userPercentage(filterUserCount, totalUser).toFixed(2);
            $listUsersContainer.find('.user-percentage').append(calculo + '%')

        },
        error: function() {
            console.log("Error de carga de datos");
        }
    });
})


