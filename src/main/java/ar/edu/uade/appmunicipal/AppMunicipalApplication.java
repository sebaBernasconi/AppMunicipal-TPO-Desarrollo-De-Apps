package ar.edu.uade.appmunicipal;

import ar.edu.uade.appmunicipal.service.SendMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class AppMunicipalApplication {

    @Autowired
    SendMailService sendMailService;


    public static void main(String[] args) {
        SpringApplication.run(AppMunicipalApplication.class, args);

    }
    @EventListener(ApplicationReadyEvent.class)
    public void sendMail(){
        sendMailService.sendEmail("bernaseba1@gmail.com","Prueba java mail"
                ,"la rompi");
    }

}
