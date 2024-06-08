package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.PersonalMunicipal;
import ar.edu.uade.appmunicipal.model.Reclamo;
import ar.edu.uade.appmunicipal.service.ReclamoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/reclamos")

public class ReclamoController {
    
    @Autowired
    ReclamoService reclamoService;

    public static ReclamoController instancia;

    //Constructor
    public ReclamoController() {
    }

    //getInstancia para singleton
    public static ReclamoController getInstancia(){
        if (instancia == null){
            return instancia = new ReclamoController();
        }else {
            return instancia;
        }
    }

    //Metodos del controller

    @PostMapping(value = "/registrar",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Reclamo>guardarReclamo(@RequestBody Reclamo reclamo){
        reclamoService.guardarReclamo(reclamo);
        return new ResponseEntity<>(reclamo, HttpStatus.CREATED);
    }

    @PutMapping(value = "/actualizarEstado/{id}/{estado}",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Reclamo>actualizarEstadoPorId(@PathVariable("id")Integer idReclamo,
                                                        @PathVariable("estado") String nuevoEstado){
        try {
            Reclamo reclamoActualizado = reclamoService.actualizarEstado(idReclamo,nuevoEstado);
            return new ResponseEntity<>(reclamoActualizado,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "/asignarPersonalMunicipal/{id}",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Reclamo>asignarPersonalMunicipal(@PathVariable("id")Integer idReclamo,
                                                           @RequestBody PersonalMunicipal personalMunicipal){
        try {
            Reclamo reclamo = reclamoService.asignarPersonalMunicipal(idReclamo,personalMunicipal);
            return new ResponseEntity<>(reclamo,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/listar", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Reclamo>>listarReclamos(){
        try {
            List<Reclamo>listadoDeReclamos = reclamoService.listarReclamos();
            return new ResponseEntity<>(listadoDeReclamos,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping(value = "/buscar/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Reclamo>buscarReclamoPorId(@PathVariable("id")Integer idReclamo){
        try {
            Reclamo reclamoBuscado = reclamoService.buscarReclamo(idReclamo);
            return new ResponseEntity<>(reclamoBuscado,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
