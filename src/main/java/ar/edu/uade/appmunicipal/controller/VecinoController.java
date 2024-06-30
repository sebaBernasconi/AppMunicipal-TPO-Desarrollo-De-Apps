package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.Vecino;
import ar.edu.uade.appmunicipal.service.VecinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/vecinos")
public class VecinoController {
    @Autowired
    VecinoService vecinoService;

    @GetMapping("/get/{dni}")
    public ResponseEntity<?> getUsuario(@PathVariable int dni) {
        Vecino user = this.vecinoService.buscarVecino(dni);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>("Vecino con dni: " + dni + " no se encuentra en la BD",
                HttpStatus.NOT_FOUND);
    }
}
