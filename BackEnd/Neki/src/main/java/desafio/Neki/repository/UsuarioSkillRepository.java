package desafio.Neki.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import desafio.Neki.entity.UsuarioSkill;
import java.util.List;

public interface UsuarioSkillRepository extends JpaRepository<UsuarioSkill, Long> {
  
  List<UsuarioSkill> findByUsuarioId(Long usuarioId);  
  boolean existsByUsuarioIdAndSkillId(Long usuarioId, Long skillId);
  
}
