package ar.edu.uade.appmunicipal.controller;

import ar.edu.uade.appmunicipal.model.Usuario;
import ar.edu.uade.appmunicipal.model.UsuarioCambioPasswordDTO;
import ar.edu.uade.appmunicipal.model.UsuarioDTO;
import ar.edu.uade.appmunicipal.service.UsuarioService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.Date;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/auth")
@Tag(name = "Gestion de Seguridad",description = "Endpoints de Login")
public class AuthController {

    private final int EXPIRATION_TIME_IN_MIN = 60;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private SecretKey secretKey; // Inyecta la clave secreta

    @Operation(summary = "Iniciar Sesion")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Sesion iniciada"),
            @ApiResponse(responseCode = "401",description = "Sin autorizacion")
    })
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UsuarioDTO credentials) {
        // Validar las credenciales aquí (puedes usar Spring Security u otros
        // mecanismos)
        Usuario usuario = this.usuarioService.findUsuario(credentials.getDni(), credentials.getPassword());
        if (usuario != null) {
            // Crear el token JWT
            String token = Jwts.builder()
                    .subject(credentials.getDni()).issuedAt(new Date())
                    .claim("rol", usuario.getTipoUsuario())
                    .claim("dni", usuario.getDni())
                    .issuedAt(new Date())
                    .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_IN_MIN * 60 * 1000))
                    .signWith(secretKey, SignatureAlgorithm.HS256).compact();
            return new ResponseEntity<>(token, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Credenciales inválidas.", HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(summary = "Cambiar contraseña")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Contraseña modificada con exito"),
            @ApiResponse(responseCode = "403",description = "Conflicto con el servidor")
    })
    @PatchMapping("/changePassword")
    public ResponseEntity<String> changePass(@RequestBody UsuarioCambioPasswordDTO userDTO) {
        Usuario usuario = this.usuarioService.findUsuario(userDTO.getDni(), userDTO.getOldPassword());
        log.info("Cambio contrasenia");
        log.info("Contrasenia vieja: " + userDTO.getOldPassword());
        log.info("Contrasenia nueva: " + userDTO.getNewPassword());

        if (usuario != null) {
            this.usuarioService.changePassword(usuario, userDTO.getNewPassword());
            return new ResponseEntity<>("Usuario actualizado con exito.", HttpStatus.OK);
        }
        return new ResponseEntity<>("Usuario o token incorrectos", HttpStatus.CONFLICT);
    }

}
