package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;

    @PostMapping("/subirImagenPerfil")
    public ResponseEntity<?> subirImagenPerfil(@RequestParam String dni, @RequestParam MultipartFile archivo) {
        try {
            byte[] imagen = archivo.getBytes();
            this.usuarioService.subirImagenPerfil(dni, imagen);
            return new ResponseEntity<>("Imagen subida correctamente", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen.");
        }
    }

    @GetMapping("/imagenPerfil/{dni}")
    public ResponseEntity<?> download(@PathVariable String dni) {
        try {
            byte[] imagen = this.usuarioService.findImagenById(dni);
            if (imagen != null) {
                return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imagen);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }
}
