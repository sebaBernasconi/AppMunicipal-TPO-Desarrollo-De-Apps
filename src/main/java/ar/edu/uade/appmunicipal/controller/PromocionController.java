package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.Promocion;
import ar.edu.uade.appmunicipal.service.PromocionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/promociones")
public class PromocionController {

    @Autowired
    PromocionService promocionService;

    public static PromocionController instancia;

    //Constructor

    public PromocionController() {
    }

    //getInstancia para singleton

    public static PromocionController getInstancia(){
        if (instancia == null){
            return instancia = new PromocionController();
        }else {
            return instancia;
        }
    }

    //Metodos del controller

    @PostMapping(value = "/agregar",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Promocion>guardarPromocion(@RequestBody Promocion promocion){
        promocionService.guardarPromocion(promocion);
        return new ResponseEntity<>(promocion,HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/eliminar/{id}")
    public ResponseEntity<Void>eliminarPromocion(@PathVariable("id")Integer idPromocion){
        boolean promocionEliminada = promocionService.eliminarPromocion(idPromocion);

        if (promocionEliminada){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/listarPromociones",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Promocion>>listarPromociones(){
        try {
            List<Promocion>listadoDePromociones = promocionService.listarPromociones();
            return new ResponseEntity<>(listadoDePromociones, HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping(value = "/buscar/{id}",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Promocion>buscarPromocion(@PathVariable("id")Integer idPromocion){
        try {
            Promocion promocion = promocionService.buscarPromocion(idPromocion);
            return new ResponseEntity<>(promocion,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
