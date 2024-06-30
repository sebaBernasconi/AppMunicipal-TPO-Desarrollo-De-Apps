package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.Barrio;
import ar.edu.uade.appmunicipal.model.Desperfecto;
import ar.edu.uade.appmunicipal.model.Rubro;
import ar.edu.uade.appmunicipal.repository.BarrioRepository;
import ar.edu.uade.appmunicipal.service.BarrioService;
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

import java.util.List;

@RestController
@RequestMapping(value = "/barrio")
@Tag(name = "Gestion de Barrios",description = "Endpoints de los Barrios")
public class BarrioController {

    @Autowired
    BarrioService barrioService;

    @Operation(summary = "Listar Barrios")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Devuelve un listado de Barrios",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Barrio.class))
            }),
            @ApiResponse(responseCode = "403", description = "Conflicto con el servidor", content = {@Content})

    })
    @GetMapping(value = "/listar", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Barrio>>listarBarrios(){
        try {
            List<Barrio>listadoDeBarrios = barrioService.listarBarrios();
            return new ResponseEntity<>(listadoDeBarrios, HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Buscar Barrio por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Devuelve el Barrio solicitado", content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Barrio.class))
            }),
            @ApiResponse(responseCode = "403", description = "Conflicto con el servidor", content = {@Content})
    })
    @GetMapping(value = "/buscarBarrio/{id}",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Barrio>buscarBarrio(@PathVariable("id")Integer idBarrio){
        try {
            Barrio barrio = barrioService.buscarBarrio(idBarrio);
            return new ResponseEntity<>(barrio,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
