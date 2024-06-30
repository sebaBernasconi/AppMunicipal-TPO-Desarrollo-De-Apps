package ar.edu.uade.appmunicipal.swagger;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    OpenAPI customOpenAPI() {
        return new OpenAPI()
                //Info general
                .info(new Info()
                        .title("App Municipal | Desarrollo de Apps 1 | Grupo 5")
                        .version("1.0.0")
                        .description("Es una app desarrollada con un back-end en Java, con el framework" +
                                " Springboot y utilizando MySql para la persistencia." +
                                " Para el front-end se utilizo ReactNative con el cliente de Expo." +
                                " Finalmente se utilizo Swagger para la documentacion de la API ")
                        .contact(new Contact()
                                .name("Sebastian Bernasconi | Ivo Bandoni | Ramiro Landajo | Matias Marano")
                                .email("sebernasconi@uade.edu.ar")

                        )
                );
    }
}
