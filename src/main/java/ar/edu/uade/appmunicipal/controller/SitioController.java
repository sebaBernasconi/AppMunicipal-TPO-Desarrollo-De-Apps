package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.Sitio;
import ar.edu.uade.appmunicipal.service.SitioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/sitio")
@Tag(name = "Gestion de Sitios",description = "Endpoints de los Sitios")
public class SitioController {

    @Autowired
    SitioService sitioService;

    @Operation(summary = "Guardar Sitio")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "Se guardo el Sitio en la base de datos",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Sitio.class))
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = @Content)
    })
    @PostMapping(value = "/agregar", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Sitio>guardarSitio(@RequestBody Sitio sitio){
        Sitio sitioGuardado = sitioService.guardarSitio(sitio);
        return new ResponseEntity<>(sitioGuardado, HttpStatus.CREATED);
    }

    @Operation(summary = "Listar Sitios")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Listado de Sitios recuperado",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Sitio.class))
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = @Content)
    })
    @GetMapping(value = "/listar",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Sitio>>listarSitios(){
        try {
            List<Sitio>listadoDeSitios = sitioService.listarSitios();
            return new ResponseEntity<>(listadoDeSitios,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @Operation(summary = "Buscar Sitio por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Devuelve el Sitio solicitado",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Sitio.class))
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = @Content)
    })
    @GetMapping(value = "/buscar/{id}",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Sitio>buscarSitio(@PathVariable("id")Integer idSitio){
        try {
            Sitio sitioBuscado = sitioService.buscarSitio(idSitio);
            return new ResponseEntity<>(sitioBuscado,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
