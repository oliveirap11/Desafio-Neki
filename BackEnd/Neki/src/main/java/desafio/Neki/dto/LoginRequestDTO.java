package desafio.Neki.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados necessários para realizar login")
public class LoginRequestDTO {
    
    @Schema(description = "Email do usuário", required = true, example = "usuario@email.com")
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ter formato válido")
    private String email;
    
    @Schema(description = "Senha do usuário", required = true, example = "senha123")
    @NotBlank(message = "Senha é obrigatória")
    private String senha;
    
    public LoginRequestDTO() {}
    
    public LoginRequestDTO(String email, String senha) {
        this.email = email;
        this.senha = senha;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getSenha() {
        return senha;
    }
    
    public void setSenha(String senha) {
        this.senha = senha;
    }
}
