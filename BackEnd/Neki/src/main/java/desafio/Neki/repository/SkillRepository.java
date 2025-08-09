package desafio.Neki.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import desafio.Neki.entity.Skill;
import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {
  
  Optional<Skill> findByNome(String nome);
  
}
