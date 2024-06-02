package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.Desperfecto;
import ar.edu.uade.appmunicipal.service.DesperfectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/desperfecto")
public class DesperfectoController {

    @Autowired
    DesperfectoService desperfectoService;

    public static DesperfectoController instancia;

    //Constructor
    public DesperfectoController() {
    }

    //getInstancia() para singleton
    public static DesperfectoController getInstancia(){
        if (instancia == null) {
            return instancia = new DesperfectoController();
        }else {
            return instancia;
        }
    }

    //Metodos del controller

    @PostMapping(value = "/agregar",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Desperfecto>guardarDesperfecto(@RequestBody Desperfecto desperfecto){
        Desperfecto desperfectoGuardado = desperfectoService.guardarDesperfecto(desperfecto);
        return new ResponseEntity<>(desperfectoGuardado, HttpStatus.CREATED);
    }

    @GetMapping(value = "/listar",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Desperfecto>>listarDesperfectos(){
        try {
            List<Desperfecto> listadoDeDesperfectos = desperfectoService.listarDesperfectos();
            return new ResponseEntity<>(listadoDeDesperfectos,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

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
