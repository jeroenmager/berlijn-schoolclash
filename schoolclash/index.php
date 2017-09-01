<!doctype html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="style.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.4/sweetalert2.css">
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.4/sweetalert2.js"></script>
    <script src="https://cdn.rawgit.com/taromero/swal-forms/master/live-demo/sweet-alert.js"></script>
    <script src="https://cdn.rawgit.com/taromero/swal-forms/master/swal-forms.js"></script>
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
                            Answer 1: <p class='p1'>" . $question['answer1'] . "</p><br />
                            <input type=\"text\" class=\"add1\" value=\" random text\">
                            Answer 2: <p class='p2'>" . $question['answer2'] . "</p><br />
                            <input type=\"text\" class=\"add2\" value=" . $question['answer2'] . ">
                            Answer 3: <p class='p3'>" . $question['answer3'] . "</p><br />
                            <input type=\"text\" class=\"add3\" value=" . $question['answer3'] .">
                            Answer 4: <p class='p4'>" . $question['answer4'] . "</p><br />
                            <input type=\"text\" class=\"add4\" value=" . $question['answer4'] ."><br />
                            <a href='#' class='change'>Change</a>
                            <a href='#' class='close'>Close</a>
                        </div>
                    </div>
                ";
        }
        ?>
    </div>
    <a href="#" onclick="sweetalert2()" id="addQuestion">Add Question</a>
</section>

<script>
    $('.questionHeader').click(function(){
            $(this).parent().animate({height: '225'});
            jQuery(this).parent().children('.completeQuestion').show();
    });

    $('.close').click(function(){
        $(this).parent().parent().animate({height: '77'});
        jQuery(this).parent().hide();
        $(this).parent().children('.add').hide();
        $(this).text('close');
        $(this).parent().children('.change').text('Change');
        $(this).parent().children('.change').removeClass('addText');
    });

    $('.change').click(function() {
        var $this = $(this);
        $this.toggleClass('addText');
        if ($this.hasClass('addText')) {
            $this.text('Save');
            $this.parent().children('.close').text('cancel');
            $(this).parent().parent().animate({height: '300'});
        } else {
            $this.text('Change');
            $this.parent().children('.close').text('close');
            $(this).parent().parent().animate({height: '225'});
            $('.p1').text($('.add1').val());
            $('.p2').text($('.add2').val());
            $('.p3').text($('.add3').val());
            $('.p4').text($('.add4').val());

        }
        $this.parent().children('.add').toggle();

    });

    var sweetalert2 = function(){
        swal({
            type: 'error',
            title: 'Verbonden!',
            html: 'Ewa',
            allowOutsideClick: false,
            showCloseButton: false,
            confirmButtonText: '<a href="#" style="text-decoration: none; color: white;" onclick="window.location.reload()">OK</a>'
          })
    };
    


</script>

</body>
</html>