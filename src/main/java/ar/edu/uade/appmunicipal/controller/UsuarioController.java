package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.Usuario;
import ar.edu.uade.appmunicipal.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
@RequestMapping("/usuarios")
@Tag(name = "Gestion de Usuarios",description = "Endpoints de los Usuarios")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @Operation(summary = "Actualizar foto de perfil del Usuario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Imagen del Usuario actualizada"),
            @ApiResponse(responseCode = "500",description = "Error interno del servidor")

    })
    @PostMapping("/subirImagenPerfil/{dni}")
    public ResponseEntity<?> subirImagenPerfil(@PathVariable String dni, @RequestParam MultipartFile archivo) {
        try {
            byte[] imagen = archivo.getBytes();
            this.usuarioService.subirImagenPerfil(dni, imagen);
            return new ResponseEntity<>("Imagen subida correctamente", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen.");
        }
    }

    @Operation(summary = "Obtiene la imagen del Usuario por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Imagen recuperada con exito"),
            @ApiResponse(responseCode = "404",description = "Not Found")

    })
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

    @Operation(summary = "Buscar Usuario por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Devuelve el Usuario solicitado"),
            @ApiResponse(responseCode = "404",description = "Not Found")
    })
    @GetMapping("/get/{dni}")
    public ResponseEntity<?> getUsuario(@PathVariable String dni) {
        Usuario user = this.usuarioService.getUsuario(dni);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>("Usuario con dni: " + dni + " no se encuentra en la BD",
                HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Actualizar cambios en reclamo del usuario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Actualiza el cambio en el reclamo del usuario"),
            @ApiResponse(responseCode = "404",description = "Not Found")
    })
    @PostMapping("/actualizarCambioReclamo")
    public ResponseEntity<?> actualizarCambioReclamo(@RequestBody String dni) {
        Usuario usuario = this.usuarioService.getUsuario(dni);
        if (usuario != null) {
            this.usuarioService.actualizarCambiosEnReclamoUsuario(usuario);
            return new ResponseEntity<>("Usuario actualizado correctamente", HttpStatus.OK);
        }
        return new ResponseEntity<>("El usuario no se encuentra en la BD", HttpStatus.NOT_FOUND);
    }
}
