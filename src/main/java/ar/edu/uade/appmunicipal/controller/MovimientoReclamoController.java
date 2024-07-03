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
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            MovimientoReclamo movimientoGuardado = movimientoReclamoService.guardarMovimientoReclamo(movimientoReclamoDTO);
            return new ResponseEntity<>(movimientoGuardado, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @Operation(summary = "Listar Movimientos de un Reclamo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Devuelve el listado de los Movmientos del Reclamo solicitado",
            content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = MovimientoReclamo.class))
            }),
            @ApiResponse(responseCode = "204",description = "No hay ningun Movimiento registrado para ese Reclamo")
    })
    @GetMapping(value = "/listarMovimientos/{id}",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<MovimientoReclamo>>listarMovimientosDeUnReclamo(@PathVariable("id") Integer idReclamo){
        try {
            List<MovimientoReclamo>movimientosDelReclamo =
                    movimientoReclamoService.listarMovimientosDeUnReclamo(idReclamo);
            return new ResponseEntity<>(movimientosDelReclamo,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

}
