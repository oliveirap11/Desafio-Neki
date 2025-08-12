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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@Tag(name = "Usuário Skills", description = "Endpoints para gerenciar skills do usuário logado")
@RestController
@RequestMapping("/api/users/skills")
public class UsuarioSkillController {

    @Autowired
    private UsuarioSkillService usuarioSkillService;
    
    @Autowired
    private UsuarioService usuarioService;

    @Operation(summary = "Listar skills do usuário", description = "Retorna todas as skills do usuário logado", 
               security = @SecurityRequirement(name = "Bearer Authentication"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Skills listadas com sucesso"),
        @ApiResponse(responseCode = "401", description = "Token inválido ou expirado")
    })
    @GetMapping
    public ResponseEntity<List<UsuarioSkillResponseDTO>> listarMinhasSkills(Authentication authentication) {
        String email = authentication.getName();
        Long usuarioId = usuarioService.buscarPerfil(email).getId();
        
        List<UsuarioSkillResponseDTO> skills = usuarioSkillService.listarSkillsDoUsuario(usuarioId);
        return ResponseEntity.ok(skills);
    }

    @Operation(summary = "Adicionar skill ao usuário", description = "Associa uma skill ao usuário logado com nível definido", 
               security = @SecurityRequirement(name = "Bearer Authentication"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Skill adicionada com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos"),
        @ApiResponse(responseCode = "401", description = "Token inválido ou expirado"),
        @ApiResponse(responseCode = "409", description = "Usuário já possui esta skill")
    })
    @PostMapping
    public ResponseEntity<UsuarioSkillResponseDTO> adicionarSkill(
            @Valid @RequestBody UsuarioSkillRequestDTO request,
            Authentication authentication) {
        
        String email = authentication.getName();
        Long usuarioId = usuarioService.buscarPerfil(email).getId();
        
        UsuarioSkillResponseDTO response = usuarioSkillService.adicionarSkill(usuarioId, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Atualizar nível da skill", description = "Atualiza o nível de proficiência de uma skill do usuário", 
               security = @SecurityRequirement(name = "Bearer Authentication"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Nível atualizado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos"),
        @ApiResponse(responseCode = "401", description = "Token inválido ou expirado"),
        @ApiResponse(responseCode = "404", description = "Skill não encontrada")
    })
    @PutMapping("/{usuarioSkillId}")
    public ResponseEntity<UsuarioSkillResponseDTO> atualizarLevel(
            @Parameter(description = "ID da associação usuário-skill", required = true) @PathVariable Long usuarioSkillId,
            @RequestBody UsuarioSkillRequestDTO request) {
        
        UsuarioSkillResponseDTO response = usuarioSkillService.atualizarLevel(usuarioSkillId, request.getLevel());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Remover skill do usuário", description = "Remove uma skill do usuário logado", 
               security = @SecurityRequirement(name = "Bearer Authentication"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Skill removida com sucesso"),
        @ApiResponse(responseCode = "401", description = "Token inválido ou expirado"),
        @ApiResponse(responseCode = "404", description = "Skill não encontrada")
    })
    @DeleteMapping("/{usuarioSkillId}")
    public ResponseEntity<Void> removerSkill(
            @Parameter(description = "ID da associação usuário-skill", required = true) @PathVariable Long usuarioSkillId) {
        usuarioSkillService.removerSkill(usuarioSkillId);
        return ResponseEntity.noContent().build();
    }
}
