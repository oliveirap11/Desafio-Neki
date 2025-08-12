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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Autenticação", description = "Endpoints para login e cadastro de usuários")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Operation(summary = "Realizar login do usuário", description = "Autentica um usuário e retorna um token JWT")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login realizado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos"),
        @ApiResponse(responseCode = "401", description = "Email ou senha inválidos")
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        LoginResponseDTO response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Cadastrar novo usuário", description = "Cria uma nova conta de usuário no sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuário cadastrado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos"),
        @ApiResponse(responseCode = "409", description = "Email já cadastrado")
    })
    @PostMapping("/cadastro")
    public ResponseEntity<CadastroSimplesResponseDTO> register(@Valid @RequestBody CadastroRequestDTO cadastroRequest) {
        CadastroSimplesResponseDTO response = authService.cadastrar(cadastroRequest);
        return ResponseEntity.ok(response);
    }
    
}
