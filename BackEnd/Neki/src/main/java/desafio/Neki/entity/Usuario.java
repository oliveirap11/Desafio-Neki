package desafio.Neki.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class Usuario {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String nome;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  private String senha;

  @Column(name = "data_cadastro", nullable = false)
  private LocalDateTime dataCadastro;

  @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  private List<UsuarioSkill> skills;

  public Usuario() {}

  public Usuario(String nome, String email, String senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.dataCadastro = LocalDateTime.now();
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

  public String getSenha() {
    return senha;
  }

  public void setSenha(String senha) {
    this.senha = senha;
  }

  public LocalDateTime getDataCadastro() {
    return dataCadastro;
  }

  public void setDataCadastro(LocalDateTime dataCadastro) {
    this.dataCadastro = dataCadastro;
  }

  public List<UsuarioSkill> getSkills() {
    return skills;
  }

  public void setSkills(List<UsuarioSkill> skills) {
    this.skills = skills;
  }

}
