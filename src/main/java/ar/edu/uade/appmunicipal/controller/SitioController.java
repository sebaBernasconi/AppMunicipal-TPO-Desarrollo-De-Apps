package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.Sitio;
import ar.edu.uade.appmunicipal.service.SitioService;
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
public class SitioController {

    @Autowired
    SitioService sitioService;

    @PostMapping(value = "/agregar", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Sitio>guardarSitio(@RequestBody Sitio sitio){
        Sitio sitioGuardado = sitioService.guardarSitio(sitio);
        return new ResponseEntity<>(sitioGuardado, HttpStatus.CREATED);
    }

    @GetMapping(value = "/listar",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Sitio>>listarSitios(){
        try {
            List<Sitio>listadoDeSitios = sitioService.listarSitios();
            return new ResponseEntity<>(listadoDeSitios,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

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
