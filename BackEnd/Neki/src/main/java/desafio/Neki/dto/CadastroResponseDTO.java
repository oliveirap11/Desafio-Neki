package desafio.Neki.dto;

public class CadastroResponseDTO {
    
    private String message;
    private String token;
    private Long id;
    private String nome;
    private String email;
    
    public CadastroResponseDTO() {}
    
    public CadastroResponseDTO(String message, String token, Long id, String nome, String email) {
        this.message = message;
        this.token = token;
        this.id = id;
        this.nome = nome;
        this.email = email;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
}
