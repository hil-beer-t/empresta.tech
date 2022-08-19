package tech.empresta.backend.utils;

/**
 * @author Hilbert Digenio ON 18/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */
import java.util.Calendar;

/*
 *   Generate "YEAR + MONTH + DAY + SECONDS + clientId" unique cod for one ongoing loan simulation
 *
 * */
public class GenerateLoanCod {

    public static String generate(Long userId) {
        Calendar c = Calendar.getInstance();
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH);
        int day = c.get((Calendar.DAY_OF_MONTH));
        int seconds = c.get((Calendar.SECOND));

        StringBuilder loanCod = new StringBuilder();
        loanCod.append(year).append("0").append(month+1).append(day).append(seconds).append(userId);

        return loanCod.toString();
    }
}
