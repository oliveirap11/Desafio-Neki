package desafio.Neki.service;

import desafio.Neki.dto.SkillRequestDTO;
import desafio.Neki.dto.SkillResponseDTO;
import desafio.Neki.entity.Skill;
import desafio.Neki.exception.ApiException;
import desafio.Neki.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    // Listar todas as skills disponíveis
    public List<SkillResponseDTO> listarTodas() {
        return skillRepository.findAll()
                .stream()
                .map(skill -> new SkillResponseDTO(
                    skill.getId(),
                    skill.getNome(),
                    skill.getImagemUrl(),
                    skill.getDescricao()
                ))
                .collect(Collectors.toList());
    }

    // Criar nova skill
    public SkillResponseDTO criarSkill(SkillRequestDTO request) {
        // Verifica se já existe skill com esse nome
        if (skillRepository.findByNome(request.getNome()).isPresent()) {
            throw new ApiException("Já existe uma skill com esse nome");
        }
        
        // Cria nova skill
        Skill skill = new Skill();
        skill.setNome(request.getNome());
        skill.setImagemUrl(request.getImagemUrl());
        skill.setDescricao(request.getDescricao());
        
        // Salva no banco
        skill = skillRepository.save(skill);
        
        // Retorna DTO
        return new SkillResponseDTO(
            skill.getId(),
            skill.getNome(),
            skill.getImagemUrl(),
            skill.getDescricao()
        );
    }

    // Buscar skill por ID
    public Skill buscarPorId(Long id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new ApiException("Skill não encontrada"));
    }
}
