package desafio.Neki.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import desafio.Neki.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
  
}
