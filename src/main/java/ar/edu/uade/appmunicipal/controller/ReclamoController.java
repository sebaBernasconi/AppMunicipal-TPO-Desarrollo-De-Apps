package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.DTOs.ReclamoDTO;
import ar.edu.uade.appmunicipal.model.PersonalMunicipal;
import ar.edu.uade.appmunicipal.model.Reclamo;
import ar.edu.uade.appmunicipal.service.ReclamoService;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value = "/reclamos")
@Tag(name = "Gestion de Reclamos",description = "Endpoints de los Reclamos")
public class ReclamoController {
    
    @Autowired
    ReclamoService reclamoService;

    @Operation(summary = "Guardar Reclamo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "Se guardo el Reclamo en la base de datos",content = {
                    @Content(mediaType = "MULTIPART_FORM_DATA_VALUE",
                    schema = @Schema(implementation = Reclamo.class))
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = {@Content})
    })
    @PostMapping(value = "/registrar", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?>guardarReclamo(@RequestPart ReclamoDTO reclamoDTO, @RequestParam MultipartFile archivo){
        try {
            return new ResponseEntity<>(reclamoService.guardarReclamo(reclamoDTO,archivo),HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @Operation(summary = "Actualizar estado del Reclamo por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Se actualizo el estado del Reclamo",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Reclamo.class))
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = {@Content})
    })
    @PutMapping(value = "/actualizarEstado/{id}/{estado}",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Reclamo>actualizarEstadoPorId(@PathVariable("id")Integer idReclamo,
                                                        @PathVariable("estado") String nuevoEstado){
        try {
            Reclamo reclamoActualizado = reclamoService.actualizarEstado(idReclamo,nuevoEstado);
            return new ResponseEntity<>(reclamoActualizado,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Asignar Personal Municipal al Reclamo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Personal Municipal asignado al Reclamo",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Reclamo.class))
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = {@Content})
    })
    @PutMapping(value = "/asignarPersonalMunicipal/{id}",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Reclamo>asignarPersonalMunicipal(@PathVariable("id")Integer idReclamo,
                                                           @RequestBody PersonalMunicipal personalMunicipal){
        try {
            Reclamo reclamo = reclamoService.asignarPersonalMunicipal(idReclamo,personalMunicipal);
            return new ResponseEntity<>(reclamo,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Devuelve un listado de todos los Reclamos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Listado de Reclamos recuperado",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Reclamo.class))
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = {@Content})
    })
    @GetMapping(value = "/listar", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Reclamo>>listarReclamos(){
        try {
            List<Reclamo>listadoDeReclamos = reclamoService.listarReclamos();
            return new ResponseEntity<>(listadoDeReclamos,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @Operation(summary = "Buscar Reclamo por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Devuelve el Reclamo solicitado",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Reclamo.class))
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = {@Content})
    })
    @GetMapping(value = "/buscar/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Reclamo>buscarReclamoPorId(@PathVariable("id")Integer idReclamo){
        try {
            Reclamo reclamoBuscado = reclamoService.buscarReclamo(idReclamo);
            return new ResponseEntity<>(reclamoBuscado,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
