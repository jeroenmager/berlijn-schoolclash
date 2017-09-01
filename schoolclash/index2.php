<!doctype html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link href="style.css" rel="stylesheet" />

    <script src="https://cdn.jsdelivr.net/sweetalert/1.1.3/sweetalert.min.js"></script>
    <link src="https://cdn.jsdelivr.net/sweetalert/1.1.3/sweetalert.css"></link>

    <script src="https://cdn.rawgit.com/taromero/swal-forms/master/live-demo/sweet-alert.js"></script>
    <script src="https://cdn.rawgit.com/taromero/swal-forms/master/swal-forms.js"></script>
    <script src="https://cdn.rawgit.com/taromero/swal-forms/master/live-demo/live-demo.js"></script>

    <title>SchoolClash</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
</head>
<body>


<section>
    <H1 class="title"> Schoolclash </H1>
    <div id="questionContainer">
        <?php

        $file1 = "questions.json";
        $file2 = "markers.json";
        $json = json_decode(file_get_contents($file1), true);
        $markers = json_decode(file_get_contents($file2), true);

        foreach($json as $question) {
            echo "  <div class='question'>
                        <div class='questionHeader'>
                            <h1>" . $question['name'] . "</h1>
                            <h2>" . $question['question'] . "</h2>
                        </div>
                        <div class='completeQuestion'>
                            <p>Answer 1: " . $question['answer1'] . "</p><br />
                            <input type=\"text\" class=\"add\" value=\"Player 1\">
                            <p>Answer 2: " . $question['answer2'] . "</p><br />
                            <input type=\"text\" class=\"add\" value=\"Player 1\">
                            <p>Answer 3: " . $question['answer3'] . "</p><br />
                            <input type=\"text\" class=\"add\" value=\"Player 1\">
                            <p>Answer 4: " . $question['answer4'] . "</p><br /><br />
                            <input type=\"text\" class=\"add\" value=\"Player 1\">
                            <a href='#' class='change'>Change</a>
                            <a href='#' class='close'>Close</a>
                        </div>
                    </div>
                ";
        }
        ?>
    </div>
    <button id="sample1">sample1</button>
</section>

<script>
    $('.questionHeader').click(function(){
            $(this).parent().animate({height: '225'});
            jQuery(this).parent().children('.completeQuestion').show();
    });

    $('.close').click(function(){
        $(this).parent().parent().animate({height: '77'});
        jQuery(this).parent().hide();
    });

    $('.change').click(function() {
        var $this = $(this);
        $this.toggleClass('addName1b');
        if ($this.hasClass('addName1b')) {
            $this.text('Add name');
        } else {
            $this.text('Change name');
        }
        $('.addName1').toggle();
        $('.p1').text($('.addName1').val());
    });


    window.onload = function () {
        document.querySelector('#sample1').addEventListener('click', sample1)
    };

    function sample1 () {
      swal.withFormAsync({
        title: 'Cool Swal-Forms example',
        text: 'Any text that you consider useful for the form',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Get form data!',
        closeOnConfirm: true,
        formFields: [
          { id: 'name', placeholder: 'Name Field', required: true },
          { id: 'nickname', placeholder: 'Add a cool nickname' }
        ]
      }, function (isConfirm) {
        // do whatever you want with the form data
        console.log(this.swalForm) // { name: 'user name', nickname: 'what the user sends' }
      })
    };
    


</script>
</body>
</html>