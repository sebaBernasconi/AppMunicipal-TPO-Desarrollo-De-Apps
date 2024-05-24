package ar.edu.uade.appmunicipal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class SendMailService {

    @Autowired
    JavaMailSender mailSender;

    public void sendEmail(String mailDestino, String asunto, String cuerpo){
        SimpleMailMessage msj = new SimpleMailMessage();
        msj.setFrom("lacunish@gmail.com");
        msj.setTo(mailDestino);
        msj.setSubject(asunto);
        msj.setText(cuerpo);

        mailSender.send(msj);

        System.out.println("Mail enviado de forma exitosa...");
    }
}
