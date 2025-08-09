package desafio.Neki.controller;

import desafio.Neki.dto.UsuarioResponseDTO;
import desafio.Neki.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Buscar perfil do usuário logado
    @GetMapping("/profile")
    public ResponseEntity<UsuarioResponseDTO> buscarPerfil(Authentication authentication) {
        String email = authentication.getName(); // Email do usuário logado
        UsuarioResponseDTO response = usuarioService.buscarPerfil(email);
        return ResponseEntity.ok(response);
    }
}
