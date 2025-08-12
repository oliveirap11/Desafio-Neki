package desafio.Neki.service;

import desafio.Neki.dto.CadastroRequestDTO;
import desafio.Neki.dto.CadastroSimplesResponseDTO;
import desafio.Neki.dto.LoginRequestDTO;
import desafio.Neki.dto.LoginResponseDTO;
import desafio.Neki.entity.Usuario;
import desafio.Neki.exception.ApiException;
import desafio.Neki.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import desafio.Neki.security.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    // Login do usuário
    public LoginResponseDTO login(LoginRequestDTO loginRequest) {
        // Busca usuário por email
        Usuario usuario = usuarioRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ApiException("Email ou senha inválidos"));
        
        // Verifica senha
        if (!passwordEncoder.matches(loginRequest.getSenha(), usuario.getSenha())) {
            throw new ApiException("Email ou senha inválidos");
        }
        
        // Gera token JWT
        String token = jwtUtil.generateToken(usuario.getEmail());
        
        // Retorna dados do login
        return new LoginResponseDTO(token, usuario.getId(), usuario.getNome(), usuario.getEmail());
    }

    // Cadastro de novo usuário
    public CadastroSimplesResponseDTO cadastrar(CadastroRequestDTO cadastroRequest) {
        // Verifica se as senhas conferem
        if (!cadastroRequest.getSenha().equals(cadastroRequest.getConfirmarSenha())) {
            throw new ApiException("Senhas não conferem");
        }
        
        // Verifica se email já existe
        if (usuarioRepository.existsByEmail(cadastroRequest.getEmail())) {
            throw new ApiException("Email já está em uso");
        }
        
        // Cria novo usuário
        Usuario usuario = new Usuario();
        usuario.setNome(cadastroRequest.getNome());
        usuario.setEmail(cadastroRequest.getEmail());
        usuario.setSenha(passwordEncoder.encode(cadastroRequest.getSenha()));
        
        // Salva no banco
        usuario = usuarioRepository.save(usuario);
        
        // Retorna apenas confirmação de cadastro (SEM TOKEN)
        return new CadastroSimplesResponseDTO(
            "Usuário cadastrado com sucesso! Faça login para acessar o sistema.", 
            usuario.getId(), 
            usuario.getNome(), 
            usuario.getEmail()
        );
    }
    
}
