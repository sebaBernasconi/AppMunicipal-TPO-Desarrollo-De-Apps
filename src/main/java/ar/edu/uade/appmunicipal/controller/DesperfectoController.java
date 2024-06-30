package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.DTOs.DesperfectoDTO;
import ar.edu.uade.appmunicipal.model.Desperfecto;
import ar.edu.uade.appmunicipal.service.DesperfectoService;
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
@RequestMapping(value = "/desperfecto")
@Tag(name = "Gestion de Desperfectos", description = "Endpoints de los Desperfectos")
public class DesperfectoController {

    @Autowired
    DesperfectoService desperfectoService;

    @Operation(summary = "Guardar Desperfecto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "Se guardo el Desperfecto en la base de datos",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Desperfecto.class)
                    )
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = {@Content})
    })
    @PostMapping(value = "/agregar",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Desperfecto>guardarDesperfecto(@RequestBody DesperfectoDTO desperfectoDTO){
        Desperfecto desperfectoGuardado = desperfectoService.guardarDesperfecto(desperfectoDTO);
        return new ResponseEntity<>(desperfectoGuardado, HttpStatus.CREATED);
    }

    @Operation(summary = "Devuelve un listado de Desperfectos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Listado de Desperfectos recuperado",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Desperfecto.class))
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = {@Content})
    })
    @GetMapping(value = "/listar",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Desperfecto>>listarDesperfectos(){
        try {
            List<Desperfecto> listadoDeDesperfectos = desperfectoService.listarDesperfectos();
            return new ResponseEntity<>(listadoDeDesperfectos,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @Operation(summary = "Buscar Desperfecto por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Devuelve el Desperfecto solicitado", content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Desperfecto.class))
            }),
            @ApiResponse(responseCode = "403", description = "Conflicto con el servidor", content = {@Content})
    })
    @GetMapping(value = "/buscar/{id}",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Desperfecto>buscarDesperfecto(@PathVariable("id")Integer idDesperfecto){
        try {
            Desperfecto desperfectoBuscado = desperfectoService.buscarDesperfecto(idDesperfecto);
            return new ResponseEntity<>(desperfectoBuscado,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
