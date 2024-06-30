package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.Vecino;
import ar.edu.uade.appmunicipal.service.VecinoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/vecinos")
@Tag(name = "Gestion de Vecinos",description = "Endpoints de los Vecinos")
public class VecinoController {
    @Autowired
    VecinoService vecinoService;

    @Operation(summary = "Buscar Vecino por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Devuelve el Vecino solicitado",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Vecino.class))
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = @Content)
    })
    @GetMapping("/get/{dni}")
    public ResponseEntity<?> getUsuario(@PathVariable int dni) {
        Vecino user = this.vecinoService.buscarVecino(dni);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>("Vecino con dni: " + dni + " no se encuentra en la BD",
                HttpStatus.NOT_FOUND);
    }
}
