package desafio.Neki.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import desafio.Neki.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
  Optional<Usuario> findByEmail(String email);

  boolean existsByEmail(String email);

}
