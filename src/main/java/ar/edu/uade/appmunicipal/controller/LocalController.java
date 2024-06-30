package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.DTOs.LocalDTO;
import ar.edu.uade.appmunicipal.model.Local;
import ar.edu.uade.appmunicipal.service.LocalService;
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
@RequestMapping(value = "/servicios")
@Tag(name = "Gestion de Locales/Servicios",description = "Endpoints Locales/Servicios")
public class LocalController {

    @Autowired
    LocalService localService;

    @Operation(summary = "Agregar un Local/Servicio")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "Se guardo un Local/Servicio en la base de datos",
            content = {@Content(mediaType = "MultipartFile",
            schema = @Schema(implementation = Local.class))}),
            @ApiResponse(responseCode = "403",description = "No posee el JWT correcto",content = @Content)
    })
    @PostMapping(value = "/agregar")
    public ResponseEntity<?>agregarLocal(@RequestPart LocalDTO localDTO, @RequestParam MultipartFile archivo){
        try {
            return new ResponseEntity<>(this.localService.guardarLocal(localDTO, archivo), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @Operation(summary = "Agregar una promocion al Local/Servicio")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Promocion agregada al Local/Servicio",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Local.class))
            }),
            @ApiResponse(responseCode = "403",description = "No posee el JWT correcto",content = @Content)
    })
    @PutMapping(value = "/agregarPromocion/{id}/{promo}",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Local>agregarPromocion(@PathVariable("id")Integer idLocal,
                                                  @PathVariable("promo") String promocion){
        try {
            Local localModificado = localService.agregarPromocion(idLocal,promocion);
            return new ResponseEntity<>(localModificado,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Eliminar Promocion de un Local/Servicio")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "La promocion se elimino",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Local.class))
            }),
            @ApiResponse(responseCode = "403",description = "No posee el JWT correcto",content = @Content)
    })
    @PutMapping(value = "eliminarPromocion/{id}",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Local>eliminarPromocion(@PathVariable("id")Integer idLocal){
        try {
            Local localModificado = localService.eliminarPromocion(idLocal);
            return new ResponseEntity<>(localModificado,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Devuelve una lista de todos los Locales/Servicios")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Listado de todos los Locales",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Local.class))
            }),
            @ApiResponse(responseCode = "403",description = "No posee el JWT correcto",content = @Content)
    })
    @GetMapping(value = "/listarLocales")
    public ResponseEntity<List<Local>>listarLocales(){
        try {
            List<Local>listadoDeLocales = localService.listarLocales();
            return new ResponseEntity<>(listadoDeLocales,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Devuelve un Local/Servicio")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Local recuperado",content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Local.class))
            }),
            @ApiResponse(responseCode = "403",description = "No posee el JWT correcto",content = @Content)
    })
    @GetMapping(value = "/buscarLocal/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Local>buscarLocal(@PathVariable("id")Integer idLocal){
        try {
            Local local = localService.buscarLocal(idLocal);
            return new ResponseEntity<>(local,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
