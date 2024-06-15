package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.Denuncia;
import ar.edu.uade.appmunicipal.model.Reclamo;
import ar.edu.uade.appmunicipal.service.DenunciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/denuncias")
public class DenunciaController {

    @Autowired
    DenunciaService denunciaService;

    @PostMapping(value = "/registrar",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Denuncia>guardarDenuncia(@RequestBody Denuncia denuncia){
        Denuncia denunciaConfirmada = denunciaService.guardarDenuncia(denuncia);
        return new ResponseEntity<>(denunciaConfirmada, HttpStatus.CREATED);
    }

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

    @GetMapping(value = "/listar",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Denuncia>>listarDenuncias(){
        try {
            List<Denuncia>listadoDeDenuncias = denunciaService.listarDenuncias();
            return new ResponseEntity<>(listadoDeDenuncias,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping(value = "buscarPorId/{id}",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Denuncia>buscarDenunciaPorId(@PathVariable("id")Integer idDenuncia){
        try {
            Denuncia denunciaEncontrada = denunciaService.buscarDenuncia(idDenuncia);
            return new ResponseEntity<>(denunciaEncontrada, HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
