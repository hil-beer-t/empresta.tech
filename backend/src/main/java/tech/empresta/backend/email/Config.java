package tech.empresta.backend.email;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

/**
 * @author Hilbert Digenio ON 26/09/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

@Configuration
public class Config {

    @Bean
    public JavaMailSender javaMailSender() {
        return new JavaMailSenderImpl();
    }

}