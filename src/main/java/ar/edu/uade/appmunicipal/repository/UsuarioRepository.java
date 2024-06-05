package ar.edu.uade.appmunicipal.repository;

import ar.edu.uade.appmunicipal.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findUserByDni(String dni);
}
