package desafio.Neki.controller;

import desafio.Neki.dto.UsuarioSkillRequestDTO;
import desafio.Neki.dto.UsuarioSkillResponseDTO;
import desafio.Neki.service.UsuarioService;
import desafio.Neki.service.UsuarioSkillService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/skills")
public class UsuarioSkillController {

    @Autowired
    private UsuarioSkillService usuarioSkillService;
    
    @Autowired
    private UsuarioService usuarioService;

    // Listar skills do usuário logado
    @GetMapping
    public ResponseEntity<List<UsuarioSkillResponseDTO>> listarMinhasSkills(Authentication authentication) {
        String email = authentication.getName();
        Long usuarioId = usuarioService.buscarPerfil(email).getId();
        
        List<UsuarioSkillResponseDTO> skills = usuarioSkillService.listarSkillsDoUsuario(usuarioId);
        return ResponseEntity.ok(skills);
    }

    // Adicionar skill ao usuário logado
    @PostMapping
    public ResponseEntity<UsuarioSkillResponseDTO> adicionarSkill(
            @Valid @RequestBody UsuarioSkillRequestDTO request,
            Authentication authentication) {
        
        String email = authentication.getName();
        Long usuarioId = usuarioService.buscarPerfil(email).getId();
        
        UsuarioSkillResponseDTO response = usuarioSkillService.adicionarSkill(usuarioId, request);
        return ResponseEntity.ok(response);
    }

    // Atualizar nível da skill
    @PutMapping("/{usuarioSkillId}")
    public ResponseEntity<UsuarioSkillResponseDTO> atualizarLevel(
            @PathVariable Long usuarioSkillId,
            @RequestBody UsuarioSkillRequestDTO request) {
        
        UsuarioSkillResponseDTO response = usuarioSkillService.atualizarLevel(usuarioSkillId, request.getLevel());
        return ResponseEntity.ok(response);
    }

    // Remover skill do usuário
    @DeleteMapping("/{usuarioSkillId}")
    public ResponseEntity<Void> removerSkill(@PathVariable Long usuarioSkillId) {
        usuarioSkillService.removerSkill(usuarioSkillId);
        return ResponseEntity.noContent().build();
    }
}
