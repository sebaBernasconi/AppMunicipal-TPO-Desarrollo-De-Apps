package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.DTOs.DenunciaDTO;
import ar.edu.uade.appmunicipal.model.Denuncia;
import ar.edu.uade.appmunicipal.model.Reclamo;
import ar.edu.uade.appmunicipal.service.DenunciaService;
import io.jsonwebtoken.security.PublicJwk;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value = "/denuncias")
@Tag(name = "Gestion de Denuncias",description = "Endpoints de las denuncias")
public class DenunciaController {

    @Autowired
    DenunciaService denunciaService;

    @Operation(summary = "Guardar Denuncia")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "Se guardo la Denuncia en la base de datos",content = {
                    @Content(mediaType = "MULTIPART_FORM_DATA_VALUE",
                            schema = @Schema(implementation = Denuncia.class))
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = {@Content})
    })
    @PostMapping(value = "/agregar",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Denuncia>guardarDenuncia(@RequestPart DenunciaDTO denunciaDTO, @RequestParam MultipartFile archivo){
        try {
            return new ResponseEntity<>(denunciaService.guardarDenuncia(denunciaDTO,archivo),HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @Operation(summary = "Actualizar estado de la Denuncia por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Se actualizo el estado de la Denuncia",content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Denuncia.class))
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = {@Content})
    })
    @PutMapping(value = "/actualizarEstado/{id}/{estado}",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Denuncia>actualizarEstado(@PathVariable("id")Integer idDenuncia,
                                                    @PathVariable("estado")String nuevoEstado){
        try {
            Denuncia denunciaParaActualizar = denunciaService.actualizarEstado(idDenuncia,nuevoEstado);
            return new ResponseEntity<>(denunciaParaActualizar,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @Operation(summary = "Devuelve un listado de todas las Denuncias")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Listado de Denuncias recuperado",content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Denuncia.class))
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = {@Content})
    })
    @GetMapping(value = "/listar",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Denuncia>>listarDenuncias(){
        try {
            List<Denuncia>listadoDeDenuncias = denunciaService.listarDenuncias();
            return new ResponseEntity<>(listadoDeDenuncias,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @Operation(summary = "Buscar Denuncia por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Devuelve la Denuncia solicitada",content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Denuncia.class))
            }),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor",content = {@Content})
    })
    @GetMapping(value = "/buscarPorId/{id}",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Denuncia>buscarDenunciaPorId(@PathVariable("id")Integer idDenuncia){
        try {
            Denuncia denunciaEncontrada = denunciaService.buscarDenuncia(idDenuncia);
            return new ResponseEntity<>(denunciaEncontrada, HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Obtener las Denuncias de un Vecino")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Listado de las Denuncias del Vecino recuperado",content = {
                    @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Denuncia.class))
            }),
            @ApiResponse(responseCode = "204", description = "No contenet. El vecino no realizo ninguna denuncia")
    })
    @GetMapping(value = "/listarPorVecino/{dni}",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Denuncia>>listarPorVecino(@PathVariable("dni")Integer dni){
        try {
            List<Denuncia>denunciasDelVecino = denunciaService.obtenerDenunciasDeUnVecino(dni);
            return new ResponseEntity<>(denunciasDelVecino,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
