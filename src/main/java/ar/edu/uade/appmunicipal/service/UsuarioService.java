package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.Usuario;
import ar.edu.uade.appmunicipal.repository.UsuarioRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;
    
    public Usuario findUsuario(String dni, String password){
        Optional<Usuario> userOp = usuarioRepository.findUsuarioByDni(dni);

        if(userOp.isPresent() && checkPassword(password, userOp.get().getPassword())) {
            return userOp.get();
        } else {
            return null;
        }
    }

    public Usuario getUsuario(String dni){
        Optional<Usuario> userOp = usuarioRepository.findUsuarioByDni(dni);
        return userOp.orElse(null);
    }

    private boolean checkPassword(String password, String passwordDB) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println("Password: " + password);
        System.out.println("passwordDB: " + passwordDB);
        boolean passwordMatches = passwordEncoder.matches(password, passwordDB);

        return passwordMatches;
    }

    public Usuario changePassword(Usuario usuario, String newPassword) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = bCryptPasswordEncoder.encode(newPassword);
        usuario.setPassword(encodedPassword);
        return this.usuarioRepository.save(usuario);
    }

    public byte[] subirImagenPerfil(String dni, byte[] imagenPerfil) throws Exception {
        Optional<Usuario> usuarioOp = this.usuarioRepository.findUsuarioByDni(dni);
        if (usuarioOp.isEmpty()) {
            throw new Exception("El usuario no se encuentra en la base de datos");
        }
        Usuario usuario = usuarioOp.get();
        usuario.setImagenPerfil(imagenPerfil);
        this.usuarioRepository.save(usuario);
        return usuario.getImagenPerfil();
    }

    public byte[] findImagenById(String dni) throws Exception {
        Optional<Usuario> usuarioOp = this.usuarioRepository.findUsuarioByDni(dni);
        if (usuarioOp.isEmpty()) {
            throw new Exception("El usuario no se encuentra en la base de datos");
        }
        Usuario usuario = usuarioOp.get();
        byte[] imagen = usuario.getImagenPerfil();
        if (imagen == null) {
            throw new Exception("El usuario no tiene imagen de perfil");
        }
        return imagen;
    }
}
