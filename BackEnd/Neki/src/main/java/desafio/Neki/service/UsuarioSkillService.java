package desafio.Neki.service;

import desafio.Neki.dto.UsuarioSkillRequestDTO;
import desafio.Neki.dto.UsuarioSkillResponseDTO;
import desafio.Neki.entity.Skill;
import desafio.Neki.entity.Usuario;
import desafio.Neki.entity.UsuarioSkill;
import desafio.Neki.exception.ApiException;
import desafio.Neki.repository.UsuarioSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioSkillService {

    @Autowired
    private UsuarioSkillRepository usuarioSkillRepository;
    
    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private SkillService skillService;

    // Listar skills do usuário
    public List<UsuarioSkillResponseDTO> listarSkillsDoUsuario(Long usuarioId) {
        return usuarioSkillRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(usuarioSkill -> new UsuarioSkillResponseDTO(
                    usuarioSkill.getId(),
                    usuarioSkill.getSkill().getId(),
                    usuarioSkill.getSkill().getNome(),
                    usuarioSkill.getSkill().getImagemUrl(),
                    usuarioSkill.getSkill().getDescricao(),
                    usuarioSkill.getLevel()
                ))
                .collect(Collectors.toList());
    }

    // Adicionar skill ao usuário
    public UsuarioSkillResponseDTO adicionarSkill(Long usuarioId, UsuarioSkillRequestDTO request) {
        // Verifica se usuário já tem essa skill
        if (usuarioSkillRepository.existsByUsuarioIdAndSkillId(usuarioId, request.getSkillId())) {
            throw new ApiException("Usuário já possui esta skill");
        }
        
        // Busca usuário e skill
        Usuario usuario = usuarioService.buscarPorId(usuarioId);
        Skill skill = skillService.buscarPorId(request.getSkillId());
        
        // Cria associação
        UsuarioSkill usuarioSkill = new UsuarioSkill();
        usuarioSkill.setUsuario(usuario);
        usuarioSkill.setSkill(skill);
        usuarioSkill.setLevel(request.getLevel());
        
        // Salva no banco
        usuarioSkill = usuarioSkillRepository.save(usuarioSkill);
        
        // Retorna DTO
        return new UsuarioSkillResponseDTO(
            usuarioSkill.getId(),
            skill.getId(),
            skill.getNome(),
            skill.getImagemUrl(),
            skill.getDescricao(),
            usuarioSkill.getLevel()
        );
    }

    // Atualizar nível da skill
    public UsuarioSkillResponseDTO atualizarLevel(Long usuarioSkillId, Integer novoLevel) {
        UsuarioSkill usuarioSkill = usuarioSkillRepository.findById(usuarioSkillId)
                .orElseThrow(() -> new ApiException("Associação usuário-skill não encontrada"));
        
        usuarioSkill.setLevel(novoLevel);
        usuarioSkill = usuarioSkillRepository.save(usuarioSkill);
        
        return new UsuarioSkillResponseDTO(
            usuarioSkill.getId(),
            usuarioSkill.getSkill().getId(),
            usuarioSkill.getSkill().getNome(),
            usuarioSkill.getSkill().getImagemUrl(),
            usuarioSkill.getSkill().getDescricao(),
            usuarioSkill.getLevel()
        );
    }

    // Remover skill do usuário
    public void removerSkill(Long usuarioSkillId) {
        if (!usuarioSkillRepository.existsById(usuarioSkillId)) {
            throw new ApiException("Associação usuário-skill não encontrada");
        }
        usuarioSkillRepository.deleteById(usuarioSkillId);
    }
}
