package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.Barrio;
import ar.edu.uade.appmunicipal.repository.BarrioRepository;
import ar.edu.uade.appmunicipal.service.BarrioService;
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
public class BarrioController {

    @Autowired
    BarrioService barrioService;

    @GetMapping(value = "/listar", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Barrio>>listarBarrios(){
        try {
            List<Barrio>listadoDeBarrios = barrioService.listarBarrios();
            return new ResponseEntity<>(listadoDeBarrios, HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

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
