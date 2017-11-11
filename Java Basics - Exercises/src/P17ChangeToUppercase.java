import java.util.*;

public class P17ChangeToUppercase {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        String text = scan.nextLine();

        while (text.contains("<upcase>")) {
            int indexStart = text.indexOf("<upcase>");
            int indexEnd = text.indexOf("</upcase>") + "</upcase>".length();
            String textToReplace = text.substring(indexStart, indexEnd);
            String textToUpper = textToReplace
                    .substring("<upcase>".length(), textToReplace.length() - "</upcase>".length())
                    .toUpperCase();

            text = text.replace(textToReplace, textToUpper);
        }
        System.out.println(text);
    }
}