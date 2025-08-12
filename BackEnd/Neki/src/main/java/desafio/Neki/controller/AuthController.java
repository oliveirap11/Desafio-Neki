package desafio.Neki.controller;

import desafio.Neki.dto.CadastroRequestDTO;
import desafio.Neki.dto.CadastroSimplesResponseDTO;
import desafio.Neki.dto.LoginRequestDTO;
import desafio.Neki.dto.LoginResponseDTO;
import desafio.Neki.service.AuthService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Login de usuário
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        LoginResponseDTO response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    // Cadastro de novo usuário
    @PostMapping("/cadastro")
    public ResponseEntity<CadastroSimplesResponseDTO> register(@Valid @RequestBody CadastroRequestDTO cadastroRequest) {
        CadastroSimplesResponseDTO response = authService.cadastrar(cadastroRequest);
        return ResponseEntity.ok(response);
    }
    
}
