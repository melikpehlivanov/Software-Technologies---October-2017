import java.util.Scanner;

public class P01VariableInHexFormat {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int intNumber = Integer.parseInt(scan.nextLine(), 16);
        System.out.println(intNumber);
    }
}
