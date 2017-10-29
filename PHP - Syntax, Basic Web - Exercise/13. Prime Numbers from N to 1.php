<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>First Steps Into PHP</title>

</head>
<body>
<form>
    N: <input type="text" name="num"/>
    <input type="submit"/>
</form>
<?php
    if (isset($_GET["num"])) {
    $number = intval($_GET["num"]);

    function prime($number)
    {

        for ($i = $number; $i >= 1; $i--) {  //numbers to be checked as prime

            $counter = 0;
            for ($j = $i; $j >= 1; $j--) { //all divisible factors


                if ($i % $j == 0) {

                    $counter++;
                }
            }

            //prime requires 2 rules ( divisible by 1 and divisible by itself)
            if ($counter == 2) {

                print $i . " ";
            }
        }
    }
        prime($number);
}

?>
</body>
</html>