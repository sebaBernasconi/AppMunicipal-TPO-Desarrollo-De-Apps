package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.Rubro;
import ar.edu.uade.appmunicipal.service.RubroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/rubro")
public class RubroController {

    @Autowired
    RubroService rubroService;

    @PostMapping(value = "/agregar",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Rubro>guardarRubro(@RequestBody Rubro rubro){
        rubroService.guardarRubro(rubro);
        return new ResponseEntity<>(rubro, HttpStatus.CREATED);
    }

    @GetMapping(value = "/listar",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Rubro>>listarRubros(){
        try {
            List<Rubro>listadoDeRubros = rubroService.listarRubros();
            return new ResponseEntity<>(listadoDeRubros,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

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
