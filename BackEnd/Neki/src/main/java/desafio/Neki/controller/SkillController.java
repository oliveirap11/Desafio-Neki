package desafio.Neki.controller;

import desafio.Neki.dto.SkillRequestDTO;
import desafio.Neki.dto.SkillResponseDTO;
import desafio.Neki.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    // Listar todas as skills disponíveis
    @GetMapping
    public ResponseEntity<List<SkillResponseDTO>> listarTodas() {
        List<SkillResponseDTO> skills = skillService.listarTodas();
        return ResponseEntity.ok(skills);
    }
    
    @PostMapping
    public ResponseEntity<SkillResponseDTO> criarSkill(@Valid @RequestBody SkillRequestDTO request) {
        SkillResponseDTO response = skillService.criarSkill(request);
        return ResponseEntity.ok(response);
    }
}
