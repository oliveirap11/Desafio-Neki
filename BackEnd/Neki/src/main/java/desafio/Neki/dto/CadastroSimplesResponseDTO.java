package desafio.Neki.dto;

public class CadastroSimplesResponseDTO {
    
    private String message;
    private Long id;
    private String nome;
    private String email;
    
    public CadastroSimplesResponseDTO() {}
    
    public CadastroSimplesResponseDTO(String message, Long id, String nome, String email) {
        this.message = message;
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
