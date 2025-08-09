package desafio.Neki.service;

import desafio.Neki.dto.UsuarioResponseDTO;
import desafio.Neki.entity.Usuario;
import desafio.Neki.exception.ApiException;
import desafio.Neki.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Buscar perfil do usuário logado
    public UsuarioResponseDTO buscarPerfil(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("Usuário não encontrado"));
        
        return new UsuarioResponseDTO(
            usuario.getId(),
            usuario.getNome(),
            usuario.getEmail(),
            usuario.getDataCadastro()
        );
    }

    // Buscar usuário por ID
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ApiException("Usuário não encontrado"));
    }
}
