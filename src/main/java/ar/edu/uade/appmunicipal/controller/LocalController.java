package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.DTOs.LocalDTO;
import ar.edu.uade.appmunicipal.model.Local;
import ar.edu.uade.appmunicipal.service.LocalService;
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
public class LocalController {

    @Autowired
    LocalService localService;

    @PostMapping(value = "/agregar")
    public ResponseEntity<?>agregarLocal(@RequestPart LocalDTO localDTO, @RequestParam MultipartFile archivo){
        try {
            return new ResponseEntity<>(this.localService.guardarLocal(localDTO, archivo), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

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

    @PutMapping(value = "eliminarPromocion/{id}",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Local>eliminarPromocion(@PathVariable("id")Integer idLocal){
        try {
            Local localModificado = localService.eliminarPromocion(idLocal);
            return new ResponseEntity<>(localModificado,HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/listarLocales")
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
