package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.Desperfecto;
import ar.edu.uade.appmunicipal.model.Rubro;
import ar.edu.uade.appmunicipal.service.RubroService;
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
@RequestMapping(value = "/rubro")
@Tag(name = "Gestion de Rubros",description = "Endpoints de los Rubros")
public class RubroController {

    @Autowired
    RubroService rubroService;

    @Operation(summary = "Guardar Rubro")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "Se guardo el Rubro en la base de datos",content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Rubro.class)
                    )
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = {@Content})
    })
    @PostMapping(value = "/agregar",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Rubro>guardarRubro(@RequestBody Rubro rubro){
        rubroService.guardarRubro(rubro);
        return new ResponseEntity<>(rubro, HttpStatus.CREATED);
    }

    @Operation(summary = "Devuelve un listado de Rubros")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Listado de Rubros recuperado",content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Rubro.class))
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = {@Content})
    })
    @GetMapping(value = "/listar",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Rubro>>listarRubros(){
        try {
            List<Rubro>listadoDeRubros = rubroService.listarRubros();
            return new ResponseEntity<>(listadoDeRubros,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @Operation(summary = "Buscar Rubro por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Devuelve el Rubro solicitado", content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Rubro.class))
            }),
            @ApiResponse(responseCode = "403", description = "Conflicto con el servidor", content = {@Content})
    })
    @GetMapping(value = "/buscar/{id}",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Rubro>buscarRubro(@PathVariable("id")Integer idRubro){
        try {
            Rubro rubroBuscado = rubroService.buscarRubro(idRubro);
            return new ResponseEntity<>(rubroBuscado,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
