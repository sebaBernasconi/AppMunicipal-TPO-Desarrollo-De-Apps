package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.DTOs.MovimientoReclamoDTO;
import ar.edu.uade.appmunicipal.model.MovimientoReclamo;
import ar.edu.uade.appmunicipal.service.MovimientoReclamoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.print.attribute.standard.Media;

@RestController
@RequestMapping(value = "/movimientos")
@Tag(name = "Gestion de Movimientos del Reclamo",description ="Endpoints del Movimeinto Reclamo")
public class MovimientoReclamoController {

    @Autowired
    MovimientoReclamoService movimientoReclamoService;


    @Operation(summary = "guardar Movmiento")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "MovmientoReclamo guardado en la base de datos", content = {
                    @Content(mediaType = "applicaton/json",
                    schema = @Schema(implementation = MovimientoReclamo.class))
            })
    })
    @PostMapping(value = "/agregar",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?>guardarReclamo(@RequestBody MovimientoReclamoDTO movimientoReclamoDTO){
        try {
            MovimientoReclamo movimientoGuardado = movimientoReclamoService.guardarMovmientoReclamo(movimientoReclamoDTO);
            return new ResponseEntity<>(movimientoGuardado, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

}
