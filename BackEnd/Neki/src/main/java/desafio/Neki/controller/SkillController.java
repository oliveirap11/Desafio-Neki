package desafio.Neki.controller;

import desafio.Neki.dto.SkillRequestDTO;
import desafio.Neki.dto.SkillResponseDTO;
import desafio.Neki.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@Tag(name = "Skills", description = "Endpoints para gerenciar skills disponíveis no sistema")
@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @Operation(summary = "Listar todas as skills", description = "Retorna todas as skills disponíveis no sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de skills retornada com sucesso"),
        @ApiResponse(responseCode = "401", description = "Token inválido ou expirado")
    })
    @GetMapping
    public ResponseEntity<List<SkillResponseDTO>> listarTodas() {
        List<SkillResponseDTO> skills = skillService.listarTodas();
        return ResponseEntity.ok(skills);
    }
    
    @Operation(summary = "Criar nova skill", description = "Adiciona uma nova skill ao sistema", 
               security = @SecurityRequirement(name = "Bearer Authentication"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Skill criada com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos"),
        @ApiResponse(responseCode = "401", description = "Token inválido ou expirado"),
        @ApiResponse(responseCode = "409", description = "Skill com esse nome já existe")
    })
    @PostMapping
    public ResponseEntity<SkillResponseDTO> criarSkill(@Valid @RequestBody SkillRequestDTO request) {
        SkillResponseDTO response = skillService.criarSkill(request);
        return ResponseEntity.ok(response);
    }
}
