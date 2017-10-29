<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>First Steps Into PHP</title>

</head>
<body>
<form>
    N: <input type="text" name="num1" />
    M: <input type="text" name="num2" />
    <input type="submit" />
</form>
<ul><?php
        if (isset($_GET["num1"]) && isset($_GET["num2"])){
            $firstNum = intval($_GET["num1"]);
            $secondNum = intval($_GET["num2"]);

            for ($i = 1; $i <= $firstNum; $i++){
                echo " \n\t<li>List" . " " . $i;
                echo "\n\t\t<ul>";

                for ($Element = 1; $Element <= $secondNum; $Element++) {
                    echo "\n\t\t\t<li>";
                    echo "\n\t\t\t\tElement" . " " . "$i.$Element";
                    echo "\n\t\t\t</li>";
                }
                echo "\n\t\t</ul>";
                echo "\n\t</li>";
            }

        }
    ?>

</ul>
</body>
</html>