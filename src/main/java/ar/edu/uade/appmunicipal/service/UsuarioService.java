package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.Usuario;
import ar.edu.uade.appmunicipal.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public Usuario createUsuario(Usuario newUsuario) throws Exception {
        Optional<Usuario> usuarioOp = this.usuarioRepository.findUserByDni(newUsuario.getDni());
        if (usuarioOp.isPresent()) {
            throw new Exception("El usuario que esta intentando crear ya se encuentra en la base de datos");
        }
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = bCryptPasswordEncoder.encode(newUsuario.getPassword());
        newUsuario.setPassword(encodedPassword);
        return this.usuarioRepository.save(newUsuario);
    }
    
    public Usuario findUsuario(String dni, String password){
        Optional<Usuario> userOp = usuarioRepository.findUserByDni(dni);

        if(userOp.isPresent() && checkPassword(password, userOp.get().getPassword())) {
            return userOp.get();
        } else {
            return null;
        }
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

}
