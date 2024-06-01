package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.Local;
import ar.edu.uade.appmunicipal.model.Promocion;
import ar.edu.uade.appmunicipal.service.LocalService;
import ar.edu.uade.appmunicipal.service.PromocionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/servicios")
public class LocalController {

    @Autowired
    LocalService localService;

    @Autowired
    PromocionService promocionService;

    public static LocalController instancia;

    //Constructor
    public LocalController() {
    }

    //getInstancia para que sea Singleton
    public static LocalController getInstancia(){
        if (instancia == null) {
            return instancia = new  LocalController();
        }else {
            return instancia;
        }
    }

    //Metodos del controller
    @PostMapping(value = "/agregar",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Local>agregarLocal(@RequestBody Local local){
        localService.guardarLocal(local);
        return new ResponseEntity<>(local, HttpStatus.CREATED);
    }

    @PutMapping(value = "/agregarPromocion/{id}",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Local>agregarPromocion(@PathVariable("id")Integer idLocal,
                                                 @RequestBody Promocion promocion){
        try {
            promocionService.guardarPromocion(promocion);

            Local localModificado = localService.agregarPromocion(idLocal,promocion);
            return new ResponseEntity<>(localModificado,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/listarLocales",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Local>>listarLocales(){
        try {
            List<Local>listadoDeLocales = localService.listarLocales();
            return new ResponseEntity<>(listadoDeLocales,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

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
