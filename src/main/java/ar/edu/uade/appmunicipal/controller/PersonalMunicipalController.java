package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.PersonalMunicipal;
import ar.edu.uade.appmunicipal.service.PersonalMunicipalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "personalMunicipal")
@Tag(name = "Gestion de PersonalMunicipal", description = "Endpoints del PersonalMunicipal")
public class PersonalMunicipalController {

    @Autowired
    PersonalMunicipalService personalMunicipalService;

    @Operation(summary = "buscar peronal municipal")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Empleado con el legajo solicitado devuelto",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = PersonalMunicipal.class))
            }),
            @ApiResponse(responseCode = "404",description = "No hay un empleado municipal con ese legajo en la base de datos",
            content = @Content)
    })
    @GetMapping(value = "/buscarPorLegajo/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<PersonalMunicipal>buscarPorLegajo(@PathVariable("id") Integer legajo){
        try {
            PersonalMunicipal personalMunicipal = personalMunicipalService.buscarEmpleadoMunicipal(legajo);
            return new ResponseEntity<>(personalMunicipal, HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
