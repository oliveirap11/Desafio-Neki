package desafio.Neki.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import desafio.Neki.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
  
}
